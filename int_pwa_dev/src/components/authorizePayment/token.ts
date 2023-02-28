import fetch from "cross-fetch"

const Access = async (origin:any) => {
    const result = await fetch(`${origin}/mobify/proxy/sftoken/dwsso/oauth2/access_token`, {
        method: 'POST',
        headers: {
            "Authorization": 'Basic NzcwYjI2YTktN2VmMS00M2UzLWFkOGUtMmZhZDgyYjU5YzQxOk00cmtpckAjIQ==',
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
