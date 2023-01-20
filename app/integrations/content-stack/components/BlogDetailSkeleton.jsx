
import React, { useEffect } from 'react'

// Chakra Components
import {
    Stack,
    Skeleton
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const BlogDetailSkeleton = () => {

    return (
        <Stack spacing={4} layerStyle="card" boxShadow="none">
            <Skeleton
                width={['50px', '650px']}
                height={['50px', '50px']}
                mt={5}
            />
            <Skeleton
                width={['50px', '100%']}
                height={['50px', '350px']}
                mt={5}
            />
        </Stack>

    )
}

BlogDetailSkeleton.propTypes = {
    size: PropTypes.bool
}

export default BlogDetailSkeleton