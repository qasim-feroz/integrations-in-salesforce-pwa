
import { OrderResult } from "../interface/OrderResult";
import makeKlaviyoRequest from "./makeKlaviyoRequest";

function KlaviyoOrderConfirmationMetric(orderResult: OrderResult, origin:any) {
    let payload:any = {
        data: {
            attributes: {
                profile: {},
                metric: {},
                properties: {
                    Items: {},
                    BillingAddress: {},
                    ShippingAddress: {}
                }
            }
        }
    }

    payload.data.type = "event"
    payload.data.attributes.profile.$email = orderResult.customerInfo.email
    payload.data.attributes.profile.$first_name = orderResult.billingAddress.firstName
    payload.data.attributes.profile.$last_name = orderResult.billingAddress.lastName
    payload.data.attributes.profile.$phone_number = orderResult.billingAddress.phone
    payload.data.attributes.profile.$address1 = orderResult.billingAddress.address1
    payload.data.attributes.profile.$city = orderResult.billingAddress.city
    payload.data.attributes.profile.$zip = orderResult.billingAddress.postalCode
    payload.data.attributes.profile.$region = orderResult.billingAddress.stateCode
    payload.data.attributes.profile.$country = orderResult.billingAddress.countryCode

    payload.data.attributes.metric.name = "Placed Order"

    payload.data.attributes.properties.Items = orderResult.productItems.map((item) => {
        return {ProductID: item.productId, ProductName: item.productName, Quantity: item.quantity, ItemPrice: item.price,}
    })

    payload.data.attributes.properties.OrderId = orderResult.orderNo

    payload.data.attributes.properties.BillingAddress.FirstName = orderResult.billingAddress.firstName
    payload.data.attributes.properties.BillingAddress.LastName = orderResult.billingAddress.lastName
    payload.data.attributes.properties.BillingAddress.Address1 = orderResult.billingAddress.address1
    payload.data.attributes.properties.BillingAddress.City = orderResult.billingAddress.city
    payload.data.attributes.properties.BillingAddress.RegionCode = orderResult.billingAddress.stateCode
    payload.data.attributes.properties.BillingAddress.CountryCode = orderResult.billingAddress.countryCode
    payload.data.attributes.properties.BillingAddress.Zip = orderResult.billingAddress.postalCode
    payload.data.attributes.properties.BillingAddress.Phone = orderResult.billingAddress.phone
    payload.data.attributes.properties.ShippingAddress.FirstName = orderResult.shipments[0].shippingAddress.firstName
    payload.data.attributes.properties.ShippingAddress.LastName = orderResult.shipments[0].shippingAddress.lastName
    payload.data.attributes.properties.ShippingAddress.Address1 = orderResult.shipments[0].shippingAddress.address1
    payload.data.attributes.properties.ShippingAddress.City = orderResult.shipments[0].shippingAddress.city
    payload.data.attributes.properties.ShippingAddress.RegionCode = orderResult.shipments[0].shippingAddress.stateCode
    payload.data.attributes.properties.ShippingAddress.CountryCode = orderResult.shipments[0].shippingAddress.countryCode
    payload.data.attributes.properties.ShippingAddress.Zip = orderResult.shipments[0].shippingAddress.postalCode
    payload.data.attributes.properties.ShippingAddress.Phone = orderResult.shipments[0].shippingAddress.phone

    payload.data.time = new Date().toISOString()
    payload.data.value = orderResult.orderTotal
    payload.data.unique_id = orderResult.orderNo

    makeKlaviyoRequest(payload, origin)

}

export default KlaviyoOrderConfirmationMetric
