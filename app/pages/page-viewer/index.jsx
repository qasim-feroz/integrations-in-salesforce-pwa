import React from 'react'
import {Box} from '@chakra-ui/react'
import {Page, pageType} from '../../page-designer'
import {PAGEDESIGNER_TO_COMPONENT} from 'pwa-custom-core/src'

import {HTTPError, HTTPNotFound} from 'pwa-kit-react-sdk/ssr/universal/errors'

const PageViewer = ({page}) => (
    <Box layerStyle={'page'}>
        <Page page={page} components={PAGEDESIGNER_TO_COMPONENT} />
    </Box>
)

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
