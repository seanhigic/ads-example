import { Product } from "../../../../shared/models/Product";
import { SponsoredProductEventType, TrackingEvent } from "../../../../shared/models/TrackingEvent";
import { localStorageController } from "./localStorageController";
import { SponsoredAd } from "../../../../shared/models/SponsoredAd";
import { Config } from "../../../../shared/models/Config";

const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export function ShoppableAdsTrackingController(config :Config | undefined) {
    
    function buildTrackingEvent(objectTrackingId: string, userId: string, product: Product): TrackingEvent {
        const tev: TrackingEvent = {
            objectTrackingId: objectTrackingId, // tracked from initial ads response
            userId: userId, // tracked via login/user creation
            productId: product.id,
            productName: product.name,
            price: product.price,
            type: undefined
        }
        return tev;
    }

    function getEventTrackingKey(tev: TrackingEvent) {
        return tev.objectTrackingId + tev.userId + tev.type?.toString();
    }
    
    function storeSessionTrackingEvent(tev: TrackingEvent) {
        const key = getEventTrackingKey(tev);
        console.debug("storing key: " + key);
        
        if(config && config.storageController == "local") {
            console.log("using local storage with expiry");
            localStorageController.setItem(key, tev.productId.toString());
        } else {
            console.log("using session storage");
            sessionStorage.setItem(key, tev.productId.toString());
        }
    }
    
    function sessionTrackingEventExists(tev: TrackingEvent) : boolean {
        const key = getEventTrackingKey(tev);
        console.debug("checking key: " + key);
    
        if(config && config.storageController == "local") {
            return (localStorageController.getItem(key) !== null);
        } else {
            return (sessionStorage.getItem(key) !== null);
        }
    }

    function postTrackingEvent(tev: TrackingEvent, singleSessionEvent: boolean = true) {
        const sessionEventExists = sessionTrackingEventExists(tev);
        if (!sessionEventExists || !singleSessionEvent) {
            console.log("submitting event");
            console.log(tev);

            fetch('/api/ads/track', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(tev)
            });
            if(singleSessionEvent){
                storeSessionTrackingEvent(tev);
            }
        } else {
            console.log("already submitted for this session");
        }
    }

    async function log1pxEvent(tev: TrackingEvent) {
        console.log("1px View tracking event");
        tev.type = SponsoredProductEventType.onepx_in_viewport;
        postTrackingEvent(tev);
    }
  
    async function logBTREvent(tev: TrackingEvent) {
        console.log("BTR tracking event");
        tev.type = SponsoredProductEventType.begin_to_render_viewport;
        postTrackingEvent(tev);
    }

    async function logViewableEvent (tev: TrackingEvent) {
        console.log("Item Viewable tracking event");
        tev.type = SponsoredProductEventType.viewable_in_viewport;
        postTrackingEvent(tev);
    }

    async function logClickedEvent (tev: TrackingEvent) {
        console.log("Product Clicked tracking event");
        tev.type = SponsoredProductEventType.clicked;
        postTrackingEvent(tev, false);
    }

    async function logAddedToCartEvent (tev: TrackingEvent) {
        console.log("Product Added to Cart tracking event");
        tev.type = SponsoredProductEventType.added_to_cart;
        postTrackingEvent(tev, false);
    }

    async function loadSponsoredAds() :Promise<SponsoredAd[]>{
        const response = await fetch("/api/ads/sponsoredads");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const ads: SponsoredAd[] = await response.json() as SponsoredAd[];
        return ads;
    }

    return {
        buildTrackingEvent,
        log1pxEvent,
        logBTREvent,
        logViewableEvent,
        logClickedEvent,
        logAddedToCartEvent,
        loadSponsoredAds
    }
  }