import React from 'react'
import {Box} from '@chakra-ui/react'
import {Page, pageType} from '../../page-designer'
import {HTTPError, HTTPNotFound} from 'pwa-kit-react-sdk/ssr/universal/errors'
// *****  Core: import - start  *****
import {PAGE_DESIGNER_COMPONENT} from 'Core/src/integrations/page-designer'
// *****  Core: import - end  *****

/**
Component for rendering a page using the Page Designer.
This component takes a page object and renders it using the specified components from the PAGE_DESIGNER_COMPONENT mapping.
@component
@param {Object} page - The page object to be rendered.
*/

const PageViewer = ({page}) => (
    <Box layerStyle={'page'}>
        {/******  Core: PAGE DESIGNER - START  *****/}
        <Page page={page} components={PAGE_DESIGNER_COMPONENT} />
        {/******  Core: PAGE DESIGNER - END  *****/}
    </Box>
)

/**
Retrieves the props for the PageViewer component.
This function fetches the page data using the provided API and parameters, and returns the page object as a prop.
@param {Object} options - The options object containing the API and params.
@param {Object} options.api - The API instance for fetching the page data.
@param {Object} options.params - The parameters object containing the pageId.
@returns {Object} The props object containing the fetched page.
@throws {Error} Throws an error if the page fetch fails or returns an error.
*/

PageViewer.getProps = async ({api, params}) => {
    const {pageId} = params
    const page = await api.shopperExperience.getPage({
        parameters: {pageId}
    })

    if (page.isError) {
        let ErrorClass = page.type?.endsWith('page-not-found') ? HTTPNotFound : HTTPError
        throw new ErrorClass(page.detail)
    }

    return {page}
}

PageViewer.displayName = 'PageViewer'

PageViewer.propTypes = {
    page: pageType.isRequired
}

export default PageViewer
