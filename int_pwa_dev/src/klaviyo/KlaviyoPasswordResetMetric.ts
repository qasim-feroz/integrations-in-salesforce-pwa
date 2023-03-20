import makeKlaviyoRequest from "./makeKlaviyoRequest"

function KlaviyoPasswordResetMetric(email:any, origin:any) {
    let payload:any = {
        data: {
            attributes: {
                profile: {},
                metric: {},
                properties: {}
            }
        }
    }

    payload.data.type = 'event'
    payload.data.attributes.profile.$email = email
    payload.data.attributes.metric.name = 'Reset Password'
    payload.data.attributes.properties.PasswordResetLink = 'http://localhost:3000/'
    payload.data.attributes.time = new Date().toISOString()
    payload.data.attributes.unique_id = new Date().toISOString() + 'yess'

    makeKlaviyoRequest(payload, origin)
}

export default KlaviyoPasswordResetMetric
