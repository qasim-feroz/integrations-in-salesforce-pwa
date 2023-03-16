import TagManager from 'react-gtm-module'

const gtmInit = () => {
    const tagManagerArgs = {
        gtmId: 'GTM-MW4F7V7'
    }
    if (typeof window !== 'undefined') {
        TagManager.initialize(tagManagerArgs)
    }
}
const gtmDataLayer = (dataLayer) => {
    gtmInit()
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(dataLayer)
    }
}

const gtmPageView = (pathName) => {
    const tagManagerArgs = {
        dataLayer: {
            event: 'page_view',
            pageType: pathName
        }
    }
    gtmDataLayer(tagManagerArgs)
}

const gtmPDP = (product) => {
    if (product) {
        const tagManagerArgs = {
            dataLayer: {
                ecommerce: {
                    detail: {
                        products: [
                            {
                                name: product.name,
                                id: product.id,
                                price: product.price,
                                category: product.primaryCategoryId
                            }
                        ]
                    }
                }
            }
        }
        gtmDataLayer(tagManagerArgs)
    }
}

const gtmAddToCart = (variant, quantity) => {
    const AddToCartArgs = {
        dataLayer: {
            event: 'addToCart',
            ecommerce: {
                currencyCode: 'US',
                add: {
                    // 'add' actionFieldObject measures.
                    products: [
                        {
                            price: variant.price,
                            variant: variant.productId,
                            quantity: quantity
                        }
                    ]
                }
            }
        }
    }
    gtmDataLayer(AddToCartArgs)
}
const gtmCheckout = (basket) => {
    const tagManagerArgs = {
        dataLayer: {
            event: 'checkout',
            ecommerce: {
                checkout: {
                    products: basket.productItems.map((product) => {
                        return {
                            name: product.productName,
                            id: product.id,
                            price: product.basePrice,
                            quantity: product.quantity
                        }
                    })
                }
            }
        }
    }
    gtmDataLayer(tagManagerArgs)
}
const gtmConfirmPurchase = (order) => {
    const tagManagerArgs = {
        dataLayer: {
            ecommerce: {
                purchase: {
                    actionField: {
                        id: order.orderNo,
                        affiliation: 'Online Store',
                        revenue: order.orderTotal,
                        shipping: order.shippingTotal
                    },
                    products: order.productItems.map((product) => {
                        return {
                            name: product.productName, // Name or ID is required.
                            id: product.productId,
                            price: product.price,
                            quantity: product.quantity
                        }
                    })
                }
            }
        }
    }
    gtmDataLayer(tagManagerArgs)
}

export {gtmInit, gtmPageView, gtmPDP, gtmAddToCart, gtmCheckout, gtmConfirmPurchase}
