const sites = require('./sites.js')
module.exports = {
    app: {
        // Customize how your 'site' and 'locale' are displayed in the url.
        url: {
            // Determine where the siteRef is located. Valid values include 'path|query_param|none'. Defaults to: 'none'
            // site: 'none',
            // Determine where the localeRef is located. Valid values include 'path|query_param|none'. Defaults to: 'none'
            locale: 'none'
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
        commerceAPI: {
            proxyPath: `/mobify/proxy/api`,
            parameters: {
                clientId: '871e8709-2c67-44ff-b7a9-031d3ef0c78e',
                organizationId: 'f_ecom_bgfs_001',
                shortCode: 'lehipx41',
                siteId: 'RefArch'
            },
            ocapiHostname: 'https://bgfs-001.dx.commercecloud.salesforce.com',
            scapiHostname: 'https://lehipx41.api.commercecloud.salesforce.com'
        },
        // Einstein api config
        einsteinAPI: {
            host: 'https://api.cquotient.com',
            einsteinId: '1ea06c6e-c936-4324-bcf0-fada93f83bb1',
            siteId: 'aaij-MobileFirst',
            // Flag Einstein activities as coming from a production environment.
            // By setting this to true, the Einstein activities generated by the environment will appear
            // in production environment reports
            isProduction: false
        },
        // google Recaptcha credentials
        googleRecaptcha: {
            siteKey: '6LeVQxglAAAAALm5-jbgPw5OCn-ws7UKytkV8fAn',
            secretKey: '6LeVQxglAAAAAMwpUAhoJar-g_TTOxEwjYeNoLnF',
            verifySiteUrl: 'https://www.google.com/recaptcha/api/siteverify'
        },

        GoogleTagManagerId: 'GTM-MW4F7V7',
        // *****  Core: ContentStack - Start  *****
        contentStack: {
            api_host: 'api.contentstack.io',
            app_host: 'app.contentstack.com',
            environment: 'development',
            region: 'us',
            live_preview: true,
            edit_tags: false
        }
        // *****  Core: ContentStack - End  *****
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
        ssrFunctionNodeVersion: '16.x',
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
                host: 'checkout-test.adyen.com',
                path: 'adyen'
            },
            {
                host: 'account.demandware.com',
                path: 'sftoken'
            }
        ]
    }
}
