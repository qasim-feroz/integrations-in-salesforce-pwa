import React from 'react'
import PropTypes from 'prop-types'
import Parser from 'html-react-parser'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const ReviewsWidget = ({
    data_product_id,
    data_name,
    data_description,
    yotpoMainWidgetStateData
}) => {
    return (
        <div
            className="yotpo yotpo-main-widget"
            data-product-id={data_product_id}
            data-name={data_name}
            data-url={`${getAppOrigin()}/product/${data_product_id}`}
            data-image-url="[[ URL TO THE IMAGE OF THE PRODUCT ]]"
            data-description={data_description}
        >
            {Parser(yotpoMainWidgetStateData.toString())}
        </div>
    )
}

const StarRating = ({data_product_id, responseData}) => {
    return (
        <div className="yotpo-main-widget">
            <div className="yotpo bottomline" data-product-id={data_product_id}>
                {responseData !== undefined ? Parser(responseData.toString()) : null}
            </div>
        </div>
    )
}

ReviewsWidget.propTypes = {
    data_product_id: PropTypes.string,
    data_name: PropTypes.string,
    data_description: PropTypes.string
}

StarRating.propTypes = {
    data_product_id: PropTypes.string
}

export {ReviewsWidget, StarRating}
