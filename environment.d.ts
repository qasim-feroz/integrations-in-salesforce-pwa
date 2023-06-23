declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ADYEN_CLIENT_KEY: string
            ADYEN_API_KEY: string

            ADMIN_API_AUTH: string

            KLAVIYO_API_KEY: string
            KLAVIYO_REVISION_DATE: string

            MELISSA_ID: string

            YOTPO_KEY: string

            AlGOLIA_SEARCH_APP_ID: string
            AlGOLIA_SEARCH_API_KEY: string
            AlGOLIA_INDEX_NAME: string
        }
    }
}
export {}
