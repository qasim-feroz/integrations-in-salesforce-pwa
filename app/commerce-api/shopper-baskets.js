/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import OcapiShopperBaskets from './ocapi-shopper-baskets'
import * as sdk from 'commerce-sdk-isomorphic'

// This class is an extension to OcapiShopperBaskets class to include basket functions implemented in SCAPI.
// Current implementation has ShopperBaskets interactiing with OCAPI which misses new functions implemented in newer SCAPI releases.
class ShopperBaskets extends OcapiShopperBaskets {
    constructor(config) {
        super(config)
        this.shopperBasketsClient = new sdk.ShopperBaskets(config)
        this.shopperOrders = new sdk.ShopperOrders(config)
    }

    mergeBasket(args) {
        return this.shopperBasketsClient.mergeBasket(args)
    }
    createBasket(args) {
        return this.shopperBasketsClient.createBasket(args)
    }

    addTaxesForBasket(args) {
        return this.shopperBasketsClient.addTaxesForBasket(args)
    }
    createOrder(args) {
        return this.shopperOrders.createOrder(args)
    }
}
export default ShopperBaskets
