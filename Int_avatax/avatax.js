import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import fetch from 'cross-fetch'
import {app} from '../config/default'

const getAdminToken = async () => {
    var details = {
        grant_type: 'client_credentials',
        scope: 'SALESFORCE_COMMERCE_API:bgfs_001 sfcc.shopper-baskets-orders.rw'
    }
    var formBody = []
    for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    const response = await fetch(
        `${getAppOrigin()}${app.adminAPI.proxyPath}/dwsso/oauth2/access_token`,
        {
            body: formBody,
            headers: {
                Authorization: `Basic ${app.adminAPI.authorization}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        }
    )
    const AdminTokenResponseObject = await response.json()
    return AdminTokenResponseObject.access_token
}
const updateBasketTax = async (token, taxCalculated, basketId) => {
    var updateTaxPayload = {taxes: {}}
    taxCalculated.lines.forEach((lineItem) => {
        const lineItemTaxDetails = {taxItems: []}
        lineItem.details.forEach((item) => {
            lineItemTaxDetails.taxItems.push({id: item.id.toString(), rate: item.rate})
        })
        updateTaxPayload.taxes[lineItem.lineNumber] = lineItemTaxDetails
    })
    var requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTaxPayload),
        redirect: 'follow'
    }

    const response = await fetch(
        `${getAppOrigin()}${app.commerceAPI.proxyPath}/checkout/shopper-baskets/v1/organizations/${
            app.commerceAPI.parameters.organizationId
        }/baskets/${basketId}/taxes?siteId=${app.commerceAPI.parameters.siteId}`,
        requestOptions
    )
    // const updateTaxResponse = await response.json()
    return await response
}

const calculateTax = async (basket, addressData = null) => {
    var addressToCalculateTax
    if (basket?.shipments[0]?.shippingAddress?.address1) {
        addressToCalculateTax = basket.shipments[0].shippingAddress
    } else if (addressData != null) {
        addressToCalculateTax = addressData
    } else {
        return false
    }
    const lines = basket.productItems.map((item) => {
        return {
            number: item.itemId,
            quantity: item.quantity,
            amount: item.price,
            taxCode: item.productId,
            itemCode: item.productId,
            description: item._type
        }
    })
    const shippingLineItems = basket.shippingItems.map((shippingItem) => {
        return {
            number: shippingItem.itemId,
            quantity: 1,
            amount: 0,
            taxCode: '',
            shippingItemCode: 'shippingItem',
            description: 'shipping item'
        }
    })
    const allItems = [...lines, ...shippingLineItems]
    const method = 'POST'
    const body = {
        lines: allItems,
        type: 'SalesInvoice',
        companyCode: 'DEFAULT',
        date: basket.creationDate,
        customerCode: 'ABC',
        purchaseOrderNo: '2023-01-01-001',
        addresses: {
            singleLocation: {
                line1: addressToCalculateTax.address1,
                city: addressToCalculateTax.city,
                region: addressToCalculateTax.stateCode,
                country: addressToCalculateTax.countryCode,
                postalCode: addressToCalculateTax.postalCode
            }
        },
        commit: true,
        currencyCode: basket.currency,
        description: 'order details'
    }
    const headers = {
        Authorization: `Basic ${app.avataxAPI.authorization}`
    }
    const response = await fetch(
        `${getAppOrigin()}${app.avataxAPI.proxyPath}/api/v2/transactions/create`,
        {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        }
    )
    return await response.json()
}
export {calculateTax, getAdminToken, updateBasketTax}
