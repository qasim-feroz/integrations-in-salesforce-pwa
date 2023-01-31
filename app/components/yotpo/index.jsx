import {Box} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import {useYotpoReviewsRefresh} from '@frontend-sdk/yotpo'

const ReviewsWidget = ({product_id, product_price, product_name, product_url}) => {
    return (
        <Box
            className="yotpo yotpo-main-widget"
            data-product-id={product_id}
            data-price={product_price}
            data-currency="curr"
            data-name={product_name}
            data-url={product_url}
            data-image-url="<The product image URL>"
        ></Box>
    )
}

const StarRating = ({pid, loadingState}) => {
    if (loadingState) {
        useYotpoReviewsRefresh()
    }

    return <div className="yotpo bottomLine" data-yotpo-product-id={pid}></div>
}

let api = null
const useMyYotpoReviewsRefresh = () => {
    /* details: https://support.yotpo.com/en/article/loading-yotpo-with-ajax */
    const Yotpo = window.Yotpo
    const yotpo = window.yotpo
    if (Yotpo && yotpo) {
        api = api || new Yotpo.API(yotpo)
        api.refreshWidgets()
    }
}

ReviewsWidget.propTypes = {
    product_id: PropTypes.string,
    product_price: PropTypes.number,
    product_name: PropTypes.string,
    product_url: PropTypes.string
}

StarRating.propTypes = {
    pid: PropTypes.string,
    loadingState: PropTypes.bool
}

export {ReviewsWidget, StarRating, useMyYotpoReviewsRefresh}
