/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        borderRadius: 'base'
    },
    variants: {
        solid: (props) =>
            props.colorScheme === 'blue'
                ? {
                      backgroundColor: 'pinkTant.900',
                      color: 'white',
                      _hover: {
                          bg: 'pinkTant.600',
                          textDecoration: 'none',
                          _disabled: {bg: 'pinkTant.300'}
                      },
                      _active: {bg: 'pinkTant.800'},
                      _disabled: {bg: 'pinkTant.300'}
                  }
                : {},
        outline: (props) =>
            props.colorScheme === 'black'
                ? {color: 'pinkTant.900', _hover: {bg: 'pinkTant.50'}, borderColor: 'pinkTant.200'}
                : {color: 'pinkTant.600', _hover: {bg: 'pinkTant.50'}},
        footer: {
            fontSize: 'sm',
            backgroundColor: 'gray.100',
            color: 'black',
            _hover: {bg: 'gray.200'},
            _active: {bg: 'gray.300'},
            paddingLeft: 3,
            paddingRight: 3
        },
        link: (props) => ({
            color: props.colorScheme === 'red' ? 'red.500' : 'pinkTant.500',
            fontWeight: 'normal',
            minWidth: '1em',
            lineHeight: 4
        }),
        'menu-link': {
            color: 'black',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            _hover: {bg: 'pinkTant.50', textDecoration: 'none'},
            _activeLink: {
                bg: 'pinkTant.50',
                textDecoration: 'none'
            }
        },
        'menu-link-mobile': {
            color: 'black',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            _hover: {bg: 'pinkTant.50', textDecoration: 'none'},
            _activeLink: {
                bg: 'pinkTant.100',
                textDecoration: 'none'
            }
        },
        'search-link': {
            color: 'black',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            _hover: {textDecoration: 'none'}
        }
    },
    sizes: {
        md: {
            height: 11,
            minWidth: 11
        }
    },
    defaultProps: {
        colorScheme: 'blue'
    }
}
