/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Component} from '../component'
import {regionType} from '../types'
import {Flex} from '@chakra-ui/react'
/**
 * This component will render a page designer region given its serialized data object.
 *
 * @param {RegionProps} props
 * @param {Region} props.region - The page designer region data representation.
 * @returns {React.ReactElement} - Region component.
 */
export const Region = (props) => {
    const {region, className = '', ...rest} = props
    const {id, components} = region

    return (
        <div id={id} className={`region ${className}`} style={{marginBottom: 15}} {...rest}>
            {/** *****  Core: Page Designer - Start ***** */}
            {getRegion(region)}
            {/** *****  Core: Page Designer - End ***** */}
        </div>
    )

    //******  Core: Page Designer - Start *****
    function getRegion(region) {
        if (region.id == 'categories') {
            return (
                <Flex
                    className="container"
                    justifyContent={'space-evenly'}
                    flexWrap={'wrap'}
                    padding={'4'}
                >
                    {components?.map((component) => (
                        <Component key={component.id} component={component} />
                    ))}
                </Flex>
            )
        } else {
            return (
                <div className="container">
                    {components?.map((component) => (
                        <Component key={component.id} component={component} />
                    ))}
                </div>
            )
        }
    }
}

//*****  Core: Page Designer - End  *****/
Region.displayName = 'Region'

Region.propTypes = {
    region: regionType.isRequired,
    className: PropTypes.string
}
export default Region
