import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import {useEffect} from 'react'
import fetch from 'cross-fetch'

const yotpoMainWidget = async (productID) => {
    var formdata = new FormData()
    formdata.append(
        `methods`,
        ` [{"method": "main_widget","params": {"pid": "${productID}","link": null,"skip_average_score": true,"widget_product_id": "${productID}"}}]`
    )

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    }

    const response = await fetch(
        `${getAppOrigin()}/mobify/proxy/yotporest/batch/app_key/hTeALoqMneusC7qe9SVHGX0PeQ7i7MPqj4PkfBdK/widget/main_widget`,
        requestOptions
    )
    const responseObject = await response.json()
    return responseObject
}

const yotpoBottomLine = async (productID) => {
    var formdata = new FormData()
    formdata.append('methods', `[{"method": "bottomline","params": {"pid": "${productID}"}}]`)

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    }

    const response = await fetch(
        // 'https://staticw2.yotpo.com/batch/app_key/hTeALoqMneusC7qe9SVHGX0PeQ7i7MPqj4PkfBdK/widget/bottomline',
        `${getAppOrigin()}/mobify/proxy/yotporest/batch/app_key/hTeALoqMneusC7qe9SVHGX0PeQ7i7MPqj4PkfBdK/widget/bottomline`,
        requestOptions
    )

    const responseObject = await response.json()
    return responseObject
}

const yotpoBottomLineBatchCall = async (arrayofIDs) => {
    var formdata = new FormData()
    var payLoad = []

    for (let i = 0; i < arrayofIDs.length; i++) {
        payLoad.push(`{"method": "bottomline","params": {"pid": "${arrayofIDs[i]}"}}`)
    }

    var formData = `[${payLoad}]`
    formdata.append('methods', formData)

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    }

    const response = await fetch(
        `${getAppOrigin()}/mobify/proxy/yotporest/batch/app_key/hTeALoqMneusC7qe9SVHGX0PeQ7i7MPqj4PkfBdK/widget/bottomline`,
        requestOptions
    )

    const responseObject = await response.json()
    let responseArray = responseObject.map((widgetData) => widgetData.result)

    return responseArray
}

function useMyYotpoReviews(appKey) {
    const yotpoScript = document.querySelector('[data-script="yotpo-reviews"]')
    if (yotpoScript) {
        yotpoScript.remove()
    }
    const script = injectScript(appKey)
    return () => {
        script.remove()
    }
}

function useMyyYotpoReviews(appKey) {
    useEffect(() => {
        const yotpoScript = document.querySelector('[data-script="yotpo-reviews"]')
        if (yotpoScript) {
            yotpoScript.remove()
        }
        const script = injectScript(appKey)
        return () => {
            script.remove()
        }
    }, [appKey])
}

function injectScript(appKey) {
    /* source: https://support.yotpo.com/en/article/generic-other-platforms-installing-yotpo */
    const script = document.createElement('script')
    script.async = true
    script.src = '//staticw2.yotpo.com/' + appKey + '/widget.js'
    script.dataset.script = 'yotpo-reviews'
    document.head.append(script)
    return script
}

let api = null
const useMyYotpoReviewsRefresh = () => {
    if (typeof window !== 'undefined') {
        console.log(`window: ${window}`)
        // browser code
        /* details: https://support.yotpo.com/en/article/loading-yotpo-with-ajax */
        const Yotpo = window.Yotpo
        const yotpo = window.yotpo
        if (Yotpo && yotpo) {
            api = api || new Yotpo.API(yotpo)
            api.refreshWidgets()
        }
    }
}

export {
    yotpoMainWidget,
    yotpoBottomLine,
    useMyYotpoReviews,
    useMyyYotpoReviews,
    yotpoBottomLineBatchCall,
    useMyYotpoReviewsRefresh
}
