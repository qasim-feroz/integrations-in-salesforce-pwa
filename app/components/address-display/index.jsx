/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Alert, Box, Text} from '@chakra-ui/react'

const AddressDisplay = ({address, productName, multiShipmentState}) => {
    return (
        <Box>
            {multiShipmentState == true ? <Text>Product Name: {productName}</Text> : null}
            {address !== null ? (
                <>
                    <Text>
                        {address.firstName} {address.lastName}
                    </Text>
                    <Text>{address.address1}</Text>
                    <Text>
                        {address.city}, {address.stateCode} {address.postalCode}
                    </Text>
                    <Text>{address.countryCode}</Text>
                </>
            ) : (
                <Alert status="error">Enter Shipping Address for this Product</Alert>
            )}
        </Box>
    )
}

AddressDisplay.propTypes = {
    address: PropTypes.object,
    productName: PropTypes.string,
    multiShipmentState: PropTypes.bool
}

export default AddressDisplay
