import fetch from 'cross-fetch'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const Access = async () => {
    let tokenResult, error
    const result = await fetch(
        `${getAppOrigin()}/mobify/proxy/demandware/dwsso/oauth2/access_token`,
        {
            method: 'POST',
            headers: {
                Authorization:
                    'Basic NzcwYjI2YTktN2VmMS00M2UzLWFkOGUtMmZhZDgyYjU5YzQxOk00cmtpckAjIQ==',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                scope: 'SALESFORCE_COMMERCE_API:bgfs_001 sfcc.orders.rw'
            })
        }
    )

    return result
}

export default Access
