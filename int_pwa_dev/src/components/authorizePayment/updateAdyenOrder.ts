import fetch from "cross-fetch"

const updateAdyenOrderInfo = async (origin:any, access_token:any, orderNo:any, paymenInstrumentId:any, adyenInfo:any) => {
    const result = await fetch(`${origin}/mobify/proxy/api/checkout/orders/v1/organizations/f_ecom_bgfs_001/orders/${orderNo}/payment-instruments/${paymenInstrumentId}/transaction?siteId=RefArch`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "c_Adyen_log": adyenInfo
        })
    })

    // if (result.ok) {
    //     updateResult = await result.json()
    // } else {
    //     error = await result.json()
    // }

    return result
}

export default updateAdyenOrderInfo
