import fetch from 'cross-fetch'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const updateAdyenOrderInfo = async (access_token, orderNo, paymenInstrumentId, adyenInfo) => {
    let updateResult, error
    const result = await fetch(
        `${getAppOrigin()}/mobify/proxy/api/checkout/orders/v1/organizations/f_ecom_bgfs_001/orders/${orderNo}/payment-instruments/${paymenInstrumentId}/transaction?siteId=RefArch`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                c_Adyen_log: adyenInfo
            })
        }
    )

    // if (result.ok) {
    //     updateResult = await result.json()
    // } else {
    //     error = await result.json()
    // }

    return result
}

export default updateAdyenOrderInfo
