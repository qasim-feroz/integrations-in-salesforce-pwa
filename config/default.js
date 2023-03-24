const sites = require('./sites.js')
module.exports = {
    melissaId: 'bs5Z4L5R2tlALFqTnPSBp_**',
    yotpoAppKey: 'hTeALoqMneusC7qe9SVHGX0PeQ7i7MPqj4PkfBdK',
    app: {
        // Customize how your 'site' and 'locale' are displayed in the url.
        url: {
            // Determine where the siteRef is located. Valid values include 'path|query_param|none'. Defaults to: 'none'
            // site: 'none',
            // Determine where the localeRef is located. Valid values include 'path|query_param|none'. Defaults to: 'none'
            locale: 'none',
            // This boolean value dictates whether or not default site or locale values are shown in the url. Defaults to: false
            // showDefaults: true
        },
        // The default site for your app. This value will be used when a siteRef could not be determined from the url
        defaultSite: 'RefArch',
        // Provide aliases for your sites. These will be used in place of your site id when generating paths throughout the application.
        // siteAliases: {
        //     RefArch: 'us'
        // },
        // The sites for your app, which is imported from sites.js
        sites,
        // Commerce api config
        // 770b26a9-7ef1-43e3-ad8e-2fad82b59c41:M4rkir@#!
        commerceAPI: {
            proxyPath: `/mobify/proxy/api`,
            parameters: {
                clientId: '871e8709-2c67-44ff-b7a9-031d3ef0c78e',
                organizationId: 'f_ecom_bgfs_001',
                shortCode: 'lehipx41',
                siteId: 'RefArch'
            }
        },
        adminAPI: {
            proxyPath: `/mobify/proxy/demandware`,
            authorization: 'NzcwYjI2YTktN2VmMS00M2UzLWFkOGUtMmZhZDgyYjU5YzQxOk00cmtpckAjIQ==',
            parameters: {
                organizationId: 'f_ecom_bgfs_001',
                shortCode: 'lehipx41',
                siteId: 'RefArch'
            }
        },
        avataxAPI: {
            proxyPath: `/mobify/proxy/avatax`,
            authorization: 'c3llZGhhaWRlcjc0MzFAZ21haWwuY29tOk5lc3Rvc2g3NDMx'
        },
        // Einstein api config
        einsteinAPI: {
            proxyPath: `/mobify/proxy/einstein`,
            einsteinId: 'undefined',
            siteId: 'RefArch'
        },
        googleRecaptcha: {
            siteKey: '6LeVQxglAAAAALm5-jbgPw5OCn-ws7UKytkV8fAn',
            secretKey: '6LeVQxglAAAAAMwpUAhoJar-g_TTOxEwjYeNoLnF',
            verifySiteUrl: 'https://www.google.com/recaptcha/api/siteverify'
        }
    },
    // This list contains server-side only libraries that you don't want to be compiled by webpack
    externals: [],
    // Page not found url for your app
    pageNotFoundURL: '/page-not-found',
    // Enables or disables building the files necessary for server-side rendering.
    ssrEnabled: true,
    // This list determines which files are available exclusively to the server-side rendering system
    // and are not available through the /mobify/bundle/ path.
    ssrOnly: ['ssr.js', 'ssr.js.map', 'node_modules/**/*.*'],
    // This list determines which files are available to the server-side rendering system
    // and available through the /mobify/bundle/ path.
    ssrShared: [
        'static/ico/favicon.ico',
        'static/robots.txt',
        '**/*.js',
        '**/*.js.map',
        '**/*.json'
    ],
    // Additional parameters that configure Express app behavior.
    ssrParameters: {
        ssrFunctionNodeVersion: '14.x',
        proxyConfigs: [
            {
                host: 'lehipx41.api.commercecloud.salesforce.com',
                path: 'api'
            },
            {
                host: 'bgfs-001.dx.commercecloud.salesforce.com',
                path: 'ocapi'
            },
            {
                host: 'api.cquotient.com',
                path: 'einstein'
            },
            {
                host: 'staticw2.yotpo.com',
                path: 'yotporest',
                protocol: 'https'
            },
            {
                host: 'sandbox-rest.avatax.com',
                path: 'avatax',
                protocol: 'https'
            },
            {
                host: 'account.demandware.com',
                path: 'demandware'
            },
            {
                protocol: 'https',
                host: 'checkout-test.adyen.com',
                path: 'adyen'
            }
        ]
    }
}
