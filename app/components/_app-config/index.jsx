/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {ChakraProvider} from '@chakra-ui/react'

// Removes focus for non-keyboard interactions for the whole application
import 'focus-visible/dist/focus-visible'

import theme from '../../theme'
import CommerceAPI from '../../commerce-api'
import {
    BasketProvider,
    CommerceAPIProvider,
    CustomerProductListsProvider,
    CustomerProvider
} from '../../commerce-api/contexts'
import {MultiSiteProvider} from '../../contexts'
import {resolveSiteFromUrl} from '../../utils/site-utils'
import {resolveLocaleFromUrl} from '../../utils/utils'
import {getConfig} from 'pwa-kit-runtime/utils/ssr-config'
import {createUrlTemplate} from '../../utils/url'

//custom-core-change
import {coreAppConfig} from 'pwa-custom-core/src'
import {googleTagManager} from 'pwa-custom-core/src'
import {CoreContextProvider} from 'pwa-custom-core/src'
//custom-core-change

/**
 * Use the AppConfig component to inject extra arguments into the getProps
 * methods for all Route Components in the app – typically you'd want to do this
 * to inject a connector instance that can be used in all Pages.
 *
 * You can also use the AppConfig to configure a state-management library such
 * as Redux, or Mobx, if you like.
 */
const AppConfig = ({children, locals = {}}) => {
    const [basket, setBasket] = useState(null)
    const [customer, setCustomer] = useState(null)

    //custom-core-change
    //coreAppConfig start
    coreAppConfig.init(locals.config)
    //coreAppConfig end

    // gtm intilization start
    useEffect(() => {
        googleTagManager.gtmInit()
    }, [])
    // gtm intilization end
    //custom-core-change

    return (
        <MultiSiteProvider site={locals.site} locale={locals.locale} buildUrl={locals.buildUrl}>
            <CommerceAPIProvider value={locals.api}>
                <CustomerProvider value={{customer, setCustomer}}>
                    <BasketProvider value={{basket, setBasket}}>
                        {/*custom-core context provider start*/}
                        <CoreContextProvider>
                            <CustomerProductListsProvider>
                                <ChakraProvider theme={theme}>{children}</ChakraProvider>
                            </CustomerProductListsProvider>
                        </CoreContextProvider>
                        {/*custom-core context provider end*/}
                    </BasketProvider>
                </CustomerProvider>
            </CommerceAPIProvider>
        </MultiSiteProvider>
    )
}

AppConfig.restore = (locals = {}) => {
    const path =
        typeof window === 'undefined'
            ? locals.originalUrl
            : `${window.location.pathname}${window.location.search}`
    const site = resolveSiteFromUrl(path)
    const locale = resolveLocaleFromUrl(path)
    const currency = locale.preferredCurrency

    //custom-core-change
    const config = getConfig()
    const {app: appConfig} = config
    //custom-core-change

    const apiConfig = {
        ...appConfig.commerceAPI,
        einsteinConfig: appConfig.einsteinAPI
    }

    apiConfig.parameters.siteId = site.id

    locals.api = new CommerceAPI({...apiConfig, locale: locale.id, currency})
    locals.buildUrl = createUrlTemplate(appConfig, site.alias || site.id, locale.id)
    locals.site = site
    locals.locale = locale

    //custom-core-change
    locals.config = config
    //custom-core-change
}

AppConfig.freeze = () => undefined

AppConfig.extraGetPropsArgs = (locals = {}) => {
    return {
        api: locals.api,
        buildUrl: locals.buildUrl,
        site: locals.site,
        locale: locals.locale
    }
}

AppConfig.propTypes = {
    children: PropTypes.node,
    locals: PropTypes.object
}

export default AppConfig
