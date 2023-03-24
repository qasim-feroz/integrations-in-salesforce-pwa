import {app} from '../../config/default'
const verifyReCaptcha = (token) => {
    if (!token) {
        return false
    }
    const url = app.googleRecaptcha.verifySiteUrl
    const secretKey = app.googleRecaptcha.secretKey
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `secret=${secretKey}&response=${token}`
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                return true
            } else {
                return false
            }
        })
}
export default verifyReCaptcha
