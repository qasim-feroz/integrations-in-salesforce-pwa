import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import fetch from 'cross-fetch'
import {app} from '../config/default'

const createShipmentForBasket = async (counter, basketId) => {
    var raw = JSON.stringify({
        shipmentId: `me${counter}`,
        shippingMethod: {
            id: '001'
        }
    })

    var requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    }

    const response = await fetch(
        `${getAppOrigin()}${app.commerceAPI.proxyPath}/checkout/shopper-baskets/v1/organizations/${
            app.commerceAPI.parameters.organizationId
        }/baskets/${basketId}/shipments?siteId=${app.commerceAPI.parameters.siteId}`,
        requestOptions
    )
    return await response.json()
}

const removeShipmentFromBasket = async (basketId, shipmentId) => {
    var requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    }

    const response = await fetch(
        `${getAppOrigin()}${app.commerceAPI.proxyPath}/checkout/shopper-baskets/v1/organizations/${
            app.commerceAPI.parameters.organizationId
        }/baskets/${basketId}/shipments/${shipmentId}?siteId=${app.commerceAPI.parameters.siteId}`,
        requestOptions
    )
    return await response.json()
}

export {createShipmentForBasket, removeShipmentFromBasket}
