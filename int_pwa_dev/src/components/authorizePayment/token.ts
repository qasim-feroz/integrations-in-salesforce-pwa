import fetch from "cross-fetch"
import getCredentials from '../../credentials/getCredentials';

declare var process : {
    env: {
        ACCESS_KEY_TOKEN: {
            NODE_ENV: string
        }
    }
}

const Access = async (origin:any) => {
    const credentials = getCredentials()
    const result = await fetch(`${origin}/mobify/proxy/sftoken/dwsso/oauth2/access_token`, {
        method: 'POST',
        headers: {
            "Authorization": `Basic ${credentials.ADMIN_API_AUTH}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'scope': 'SALESFORCE_COMMERCE_API:bgfs_001 sfcc.orders.rw'
        })
    })

    return result
}

export default Access
