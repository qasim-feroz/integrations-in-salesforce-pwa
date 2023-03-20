import fetch from "cross-fetch";
import getCredentials from "../credentials/getCredentials";

const makeKlaviyoRequest = async (payload:any, origin:any) => {
    let eventResult:any, error:any
    console.log(JSON.stringify(payload))
    const credentials = getCredentials()
    const result = await fetch(`${origin}/mobify/proxy/klaviyo/api/events/`, {
        method: 'POST',
        headers: {
            'Authorization': `Klaviyo-API-Key ${credentials.KLAVIYO_API_KEY}`,
            'Revision': `${credentials.KLAVIYO_REVISION_DATE}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (result.ok) {
        eventResult = await result.json()
    } else {
        error = await result.json()
    }

    return { eventResult, error }
}

export default makeKlaviyoRequest
