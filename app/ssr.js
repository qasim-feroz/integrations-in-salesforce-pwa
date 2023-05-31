/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
'use strict'

const path = require('path')
const {getRuntime} = require('pwa-kit-runtime/ssr/server/express')
const {isRemote} = require('pwa-kit-runtime/utils/ssr-server')
const {getConfig} = require('pwa-kit-runtime/utils/ssr-config')
const helmet = require('helmet')
// const apiMiddleware = require('pwa-custom-core/src/base/middleware/ApiMiddleware')
const express = require('express')

//loads environemnt variables from the file
require('dotenv').config({path: `.env.${process.env.NODE_INSTANCE}`})

const options = {
    // The build directory (an absolute path)
    buildDir: path.resolve(process.cwd(), 'build'),

    // The cache time for SSR'd pages (defaults to 600 seconds)
    defaultCacheTimeSeconds: 600,

    // This is the value of the 'mobify' object from package.json
    mobify: getConfig(),

    // The port that the local dev server listens on
    port: 3000,

    // The protocol on which the development Express app listens.
    // Note that http://localhost is treated as a secure context for development.
    protocol: 'http'
}

const runtime = getRuntime()

const {handler} = runtime.createHandler(options, (app) => {
    // Set HTTP security headers
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'img-src': [
                        "'self'",
                        '*.commercecloud.salesforce.com',
                        'data:',
                        'www.gstatic.com',
                        'checkoutshopper-test.adyen.com',
                        'checkoutshopper-live.adyen.com',
                        'checkout-test.adyen.com',
                        'account.demandware.com',
                        'www.google.com',
                        'www.googletagmanager.com',
                        'api.cquotient.com'
                    ],
                    'script-src': [
                        "'self'",
                        "'unsafe-inline'",
                        "'unsafe-eval'",
                        'storage.googleapis.com',
                        'checkoutshopper-test.adyen.com',
                        'pay.google.com',
                        'www.gstatic.com',
                        'checkoutshopper-live.adyen.com',
                        'checkout-test.adyen.com',
                        'account.demandware.com',
                        'www.google.com',
                        'www.googletagmanager.com',
                        'api.cquotient.com'
                    ],

                    // Do not upgrade insecure requests for local development
                    'upgrade-insecure-requests': isRemote() ? [] : null,
                    'connect-src': [
                        "'self'",
                        "'unsafe-inline'",
                        "'unsafe-eval'",
                        'storage.googleapis.com',
                        'checkoutshopper-test.adyen.com',
                        'pay.google.com',
                        'www.gstatic.com',
                        'checkoutshopper-live.adyen.com',
                        'checkout-test.adyen.com',
                        'account.demandware.com',
                        'www.google.com',
                        'www.googletagmanager.com',
                        'api.cquotient.com'
                    ],
                    'default-src': [
                        "'self'",
                        "'unsafe-eval'",
                        'storage.googleapis.com',
                        'checkoutshopper-test.adyen.com',
                        'pay.google.com',
                        'www.gstatic.com',
                        'checkoutshopper-live.adyen.com',
                        'checkout-test.adyen.com',
                        'account.demandware.com',
                        'www.google.com',
                        'www.googletagmanager.com',
                        'api.cquotient.com'
                    ]
                }
            },
            hsts: isRemote()
        })
    )

    app.use(express.json())

    // Handle the redirect from SLAS as to avoid error
    app.get('/callback?*', (req, res) => {
        // This endpoint does nothing and is not expected to change
        // Thus we cache it for a year to maximize performance
        res.set('Cache-Control', `max-age=31536000`)
        res.send()
    })

    // TODO: uncomment this section after the apiMiddleware added into Develop -> pwa-custom-core
    // app.post('/api', async (req, res) => {
    //     var response = await apiMiddleware(req, res);
    //     res.send(response);
    // });

    app.get('/robots.txt', runtime.serveStaticFile('static/robots.txt'))
    app.get('/favicon.ico', runtime.serveStaticFile('static/ico/favicon.ico'))

    app.get('/worker.js(.map)?', runtime.serveServiceWorker)
    app.get('*', runtime.render)
})
// SSR requires that we export a single handler function called 'get', that
// supports AWS use of the server that we created above.
exports.get = handler
