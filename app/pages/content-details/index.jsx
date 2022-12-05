import React from 'react'
import fetch from 'cross-fetch'

import { getAppOrigin } from 'pwa-kit-react-sdk/utils/url'

//import {HTTPError} from 'pwa-kit-react-sdk/ssr/universal/errors'

const ContentDetails = ({contentResult, error}) => {
    if (error) {
        return <div>{error.fault.message}</div>
    }

    if (!contentResult) {
        return <div>Loading...</div>
    }

    return <div dangerouslySetInnerHTML={{__html: contentResult.c_body}} />
 }

ContentDetails.getProps = async ({params, res}) => {
    let contentResult, error
    const result = await fetch(
        `${getAppOrigin()}/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v20_2/content/${params.id}?client_id=871e8709-2c67-44ff-b7a9-031d3ef0c78e`
    )

    if (result.ok) {
        contentResult = await result.json()
    } else {
        error = await result.json()
        if (res) {
            res.status(result.status)
        }
    }

   return {contentResult, error}
}

ContentDetails.getTemplateName = () => 'content-details'

export default ContentDetails
