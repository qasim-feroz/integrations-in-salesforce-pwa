/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import { componentMapping as components } from '../content-stack-helper';
import Section from './Section';

const componentsMapping = {
    'banner_section': Section
}
const RenderComponent = ({ componentName, data, ...props }) => {
    const mapping = {...componentsMapping, ...components}

    const SpecificComponent = mapping[componentName];
    if (SpecificComponent) {
        return (
            <SpecificComponent {...data} />
        );
    }
    return (
        <></>
    );
}

export default RenderComponent
