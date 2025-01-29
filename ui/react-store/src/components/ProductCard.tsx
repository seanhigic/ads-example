import { Product } from "../../../../shared/models/Product";
import "./ProductCard.css"
import { InView } from "react-intersection-observer";
import { ShoppableAdsTrackingController } from "../controllers/ShoppableAdsTrackingController";
import { SponsoredAd } from "../../../../shared/models/SponsoredAd";
import { TrackingEvent } from "../../../../shared/models/TrackingEvent";
import { useState } from "react";
import useRunOnce from "../shared/runOnceHook";
import { User } from "../../../../shared/models/User";
import { Config } from "../../../../shared/models/Config";

interface ProductCardProps {
    config: Config | undefined,
    currentUser: User | undefined,
    product: Product;
    sponsoredAd: SponsoredAd | undefined,
    isAdded: boolean;
}

function ProductCard({ config, currentUser, product, sponsoredAd, isAdded }: ProductCardProps) {
    const [firedBTR, setfiredBTR] = useState(false);
    const [firedViewable, setfiredViewable] = useState(false);
    const [fired1px, setfired1px] = useState(false);
    
    const shoppableAdsTrackingController = ShoppableAdsTrackingController(config);

    async function buildTrackingEvent(product: Product): Promise<TrackingEvent | undefined> {
        if (sponsoredAd && currentUser) {
            const tev = shoppableAdsTrackingController.buildTrackingEvent(sponsoredAd.objectTrackingId,
                currentUser.userId,
                product);
            return tev;
        } else {
            return undefined;
        }
    }

    useRunOnce({
        fn: () => {
            if (sponsoredAd && !firedBTR) {
                buildTrackingEvent(product).then((tev) => {
                    if (tev) {
                        shoppableAdsTrackingController.logBTREvent(tev);
                        setfiredBTR(true);
                    }    
                });
            }
        }
    });

    function handleAddToCart(product: Product) {
        buildTrackingEvent(product).then((tev) => {
        if (tev) {
            shoppableAdsTrackingController.logAddedToCartEvent(tev);
        }
        });
    }

    function handleProductClick(product: Product) {
        buildTrackingEvent(product).then((tev) => {
            if (tev) {
                shoppableAdsTrackingController.logClickedEvent(tev);
            }
        });
    }

    function viewStatus(inView: boolean, product: Product, entry: IntersectionObserverEntry) {

        buildTrackingEvent(product).then((tev) => {
        if (tev) {
            if (inView) {
                if (entry.intersectionRatio >= .01
                    && !fired1px) {
                    shoppableAdsTrackingController.log1pxEvent(tev);
                    setfired1px(true);
                } else if (entry.intersectionRatio >= .5
                    && !firedViewable
                ) {
                    shoppableAdsTrackingController.logViewableEvent(tev);
                    setfiredViewable(true);
                }
            }
        }
    });
    }

    function isAd(): boolean {
        return sponsoredAd !== undefined;
    }

    return (
        <>
            <div className="product">
                {isAd() ? (
                    <>
                        <div className="sponsored-ad-tag-wrapper">
                            <span className="sponsored-ad-tag">Sponsored</span>
                        </div>
                        <div className="product-image">
                            <InView root={document.getElementsByClassName('products')[0] } threshold={[.01, .5]} as="div" onChange={(inView, entry) => viewStatus(inView, product, entry)}>
                                <img src={product.image} alt={product.name} onClick={() => { handleProductClick(product) }} />
                            </InView>
                        </div>
                    </>
                ) : (
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                )}
                <h4 className="product-name" title={product.name}>{product.name}</h4>
                <p className="product-price">{product.price}</p>
                <div className="product-action">
                    <button
                        className={!isAdded ? "" : "added"}
                        type="button"
                        onClick={isAd() ? () => { handleAddToCart(product) } : undefined}
                    >
                        {!isAdded ? "Add to Cart" : "✔ Added"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductCard;






