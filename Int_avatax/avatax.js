import {useContext} from 'react'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import fetch from 'cross-fetch'
import {useCommerceAPI, BasketContext} from '../app/commerce-api/contexts'
// import {app as appConfig} from '../config/default'

const updateExternalTax = async (avataxResponse) => {
    const {basket, setBasket: _setBasket} = useContext(BasketContext)
    const body = `"taxes": {
        "3d4e28425ce0b3a65b0ac4e163": {
          "taxItems": [
            {
              "id": "DE_7",
              "rate": 0.07,
              "value": 13.99
            },
            {
              "id": "DE_19",
              "rate": 0.19
            }
          ]
        },
        "ff9452ed11fcf5c80f9143a8f1": {
          "taxItems": [
            {
              "id": "US_1",
              "rate": 0.01
            },
            {
              "id": "US_5",
              "rate": 0.05
            }
          ]
        }
      }
    }`
    await basket.addTaxesForBasketItem(body)
}
const calculateTax = async () => {
    const {basket, setBasket: _setBasket} = useContext(BasketContext)
    console.log(basket)
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Basic c3llZGhhaWRlcjc0MzFAZ21haWwuY29tOk5lc3Rvc2g3NDMx'
    }
    var lineNumber = 1
    const lines = basket.productItems.map((item) => {
        return {
            number: lineNumber++,
            quantity: item.quantity,
            amount: item.price,
            taxCode: item.productId,
            itemCode: item.productId,
            description: item._type
        }
    })
    const method = 'POST'
    const body = {
        lines: lines,
        type: 'SalesInvoice',
        companyCode: 'DEFAULT',
        date: basket.creationDate,
        customerCode: 'ABC',
        purchaseOrderNo: '2023-01-01-001',
        addresses: {
            singleLocation: {
                line1: basket.shipments[0].shippingAddress.address1,
                city: basket.shipments[0].shippingAddress.city,
                region: basket.shipments[0].shippingAddress.stateCode,
                country: basket.shipments[0].shippingAddress.countryCode,
                postalCode: basket.shipments[0].shippingAddress.postalCode
            }
        },
        commit: true,
        currencyCode: basket.currency,
        description: 'yarn'
    }
    const response = await fetch(
        `${getAppOrigin()}/mobify/proxy/avatax/api/v2/transactions/create`,
        {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        }
    )
    await updateExternalTax(response)
}
export default calculateTax
