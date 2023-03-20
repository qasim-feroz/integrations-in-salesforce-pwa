function getCredentials() {
    const ADYEN_CLIENT_KEY = process.env.ADYEN_CLIENT_KEY
    const ADYEN_API_KEY = process.env.ADYEN_API_KEY

    const ADMIN_API_AUTH = process.env.ADMIN_API_AUTH

    const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY
    const KLAVIYO_REVISION_DATE = process.env.KLAVIYO_REVISION_DATE

    return {
        ADYEN_CLIENT_KEY,
        ADYEN_API_KEY,
        ADMIN_API_AUTH,
        KLAVIYO_API_KEY,
        KLAVIYO_REVISION_DATE
    }
}

export default getCredentials
