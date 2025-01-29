export const enum SponsoredProductEventType {
    viewable_in_viewport = "ian.sponsored_product.viewable_in_viewport",
    begin_to_render_viewport = "ian.sponsored_product.begin_to_render_viewport",
    onepx_in_viewport = "ian.sponsored_product.1px_in_viewport",
    clicked = "ian.sponsored_product.clicked",
    added_to_cart = "ian.sponsored_product.added_to_cart"
}

export const enum DisplayBannerEventType {
    viewable_in_viewport = "ian.sponsored_product.viewable_in_viewport",
    begin_to_render_viewport = "ian.sponsored_product.begin_to_render_viewport",
    onepx_in_viewport = "ian.sponsored_product.1px_in_viewport",
    clicked = "ian.sponsored_product.clicked",
    added_to_cart = "ian.sponsored_product.added_to_cart"
}

export const enum ShoppableDisplayEventType {
    viewable_in_viewport = "ian.sponsored_product.viewable_in_viewport",
    begin_to_render_viewport = "ian.sponsored_product.begin_to_render_viewport",
    onepx_in_viewport = "ian.sponsored_product.1px_in_viewport",
    clicked = "ian.sponsored_product.clicked",
    added_to_cart = "ian.sponsored_product.added_to_cart"
}

export const enum ShoppableDisplayItemEventType {
    viewable_in_viewport = "ian.sponsored_product.viewable_in_viewport",
    begin_to_render_viewport = "ian.sponsored_product.begin_to_render_viewport",
    onepx_in_viewport = "ian.sponsored_product.1px_in_viewport",
    clicked = "ian.sponsored_product.clicked",
    added_to_cart = "ian.sponsored_product.added_to_cart"
}

interface TrackingEvent {
    objectTrackingId: string
    productId: number
    productName: string,
    price: number
    userId: string
    type: undefined | SponsoredProductEventType | DisplayBannerEventType | ShoppableDisplayEventType | ShoppableDisplayItemEventType
}

export type {
    TrackingEvent
}

