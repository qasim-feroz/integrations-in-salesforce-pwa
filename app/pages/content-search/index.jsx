import React from 'react'
import fetch from 'cross-fetch'

import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'

import { getAppOrigin } from 'pwa-kit-react-sdk/utils/url'

const ContentSearch = ({contentResult}) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }

    const {hits = []} = contentResult
    return (
        <div>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <Link key={id} to={`content/${id}`}>
                            <ListItem>{name}</ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    const res = await fetch(
        `${getAppOrigin()}/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v20_2/content_search?q=about&client_id=871e8709-2c67-44ff-b7a9-031d3ef0c78e`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {contentResult}
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch