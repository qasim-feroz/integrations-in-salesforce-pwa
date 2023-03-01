import fetch from 'cross-fetch'
import {melissaId} from '../../config/default'

const melissaAddressSuggestion = async (address, city, stateCode, countryCode) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    const response = await fetch(
        `http://expressentry.melissadata.net/web/GlobalExpressFreeForm?format=JSON&id=${melissaId}&ff=${address} ${city} ${stateCode}&country=${countryCode}`,
        requestOptions
    )

    const responseObject = await response.json()
    return responseObject
}

export {melissaAddressSuggestion}
