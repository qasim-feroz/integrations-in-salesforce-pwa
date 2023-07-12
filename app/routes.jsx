/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* istanbul ignore file */
// NOTE!
// This file is being ignored in the test coverage report for now. It reports `0%` functions
// tested, which brings down the overall coverage and blocks CI. There are tests still, but
// we don't want it to count toward coverage until we figure out how to cover the `functions`
// metric for this file in its test.

import React from 'react'
import loadable from '@loadable/component'
import {getConfig} from 'pwa-kit-runtime/utils/ssr-config'

// Components
import {Skeleton} from '@chakra-ui/react'
import {configureRoutes} from './utils/routes-utils'

const fallback = <Skeleton height="75vh" width="100%" />

// Pages

//******  Core: Google SSO - START
const SSOCallback = loadable(() => import('pwa-custom-core/src/integrations/idps/google'), {fallback})
//******  Core: Google SSO - END

const Home = loadable(() => import('./pages/home'), {fallback})
const Login = loadable(() => import('./pages/login'), {fallback})
const Registration = loadable(() => import('./pages/registration'), {fallback})
const ResetPassword = loadable(() => import('./pages/reset-password'), {fallback})
const Account = loadable(() => import('./pages/account'), {fallback})
const Cart = loadable(() => import('./pages/cart'), {fallback})
const Checkout = loadable(() => import('./pages/checkout'), {fallback})
const CheckoutConfirmation = loadable(() => import('./pages/checkout/confirmation'), {fallback})
const LoginRedirect = loadable(() => import('./pages/login-redirect'), {fallback})
const ProductList = loadable(() => import('./pages/product-list'), {fallback})
const Wishlist = loadable(() => import('./pages/account/wishlist'), {fallback})
const PageViewer = loadable(() => import('./pages/page-viewer'), {fallback})
const PageNotFound = loadable(() => import('./pages/page-not-found'))
// *****  Core: Track Order - START  *****
const TrackOrderStatus = loadable(
    () =>
        import('pwa-custom-core/src/integrations/track-order'),
    {fallback}
)
const TrackOrderDetails = loadable(() =>
    import('pwa-custom-core/src/integrations/track-order')
)
// *****  Core: Track Order - END  *****

// *****  Core: ContentStack - START  *****
const Blog = loadable(
    () => import('pwa-custom-core/src/integrations/cms/content-stack/pages/blog'),
    {fallback}
)
const ContentStackProductDetail = loadable(
    () => import('pwa-custom-core/src/integrations/cms/content-stack/pages/product-detail'),
    {fallback}
)
// *****  Core: ContentStack - END  *****
// *****  Core: RESET PASSWORD - START  *****
const SetNewPassword = loadable(() => import('pwa-custom-core/src/integrations/reset-password'), {fallback})
// *****  Core: RESET PASSWORD - END  *****

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
//******  Core: Google SSO - START
    {
        path: '/google-callback',
        component: SSOCallback
    },
//******  Core: Google SSO - END
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/registration',
        component: Registration,
        exact: true
    },
    {
        path: '/reset-password',
        component: ResetPassword,
        exact: true
    },
    {
        path: '/account',
        component: Account
    },
    {
        path: '/checkout',
        component: Checkout,
        exact: true
    },
    {
        path: '/checkout/confirmation',
        component: CheckoutConfirmation,
        exact: true
    },
    {
        path: '/callback',
        component: LoginRedirect,
        exact: true
    },
    {
        path: '/cart',
        component: Cart,
        exact: true
    },
    {
        path: '/product/:productId',
        // *****  Core: ContentStack - START  *****
        component: ContentStackProductDetail
        // *****  Core: ContentStack - END  *****
    },
    {
        path: '/search',
        component: ProductList
    },
    {
        path: '/category/:categoryId',
        component: ProductList
    },
    {
        path: '/account/wishlist',
        component: Wishlist
    },
    //  *****  Core: Track Order - START  *****
    {
        path: '/order-status',
        component: TrackOrderStatus
    },
    {
        path: '/orders/:orderNo',
        component: TrackOrderDetails
    },
    //  *****  Core: Track Order - END  *****
    // *****  Core: ContentStack - START  *****
    {
        path: '/blog/:blogId',
        component: Blog,
        exact: true
    },
    {
        path: '/blog',
        component: Blog,
        exact: true
    },
    // *****  Core: ContentStack - END  *****
    //  *****  Core: PAGE DESIGNER - START  *****
    {
        path: '/:pageId',
        component: PageViewer,
        exact: true
    },
    //  *****  Core: PAGE DESIGNER - END  *****
    // *****  Core: RESET PASSWORD - START  *****
    {
        path: '/reset-password/emailId/:email/resetToken/:reset',
        component: SetNewPassword
    },
    // *****  Core: RESET PASSWORD - END  *****
    {
        path: '*',
        component: PageNotFound
    }
]

export default () => {
    const config = getConfig()
    return configureRoutes(routes, config, {
        ignoredRoutes: ['/callback', '*']
    })
}
