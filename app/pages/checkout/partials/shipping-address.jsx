/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useState} from 'react'
import {defineMessage, useIntl} from 'react-intl'
import {useCheckout} from '../util/checkout-context'
import PropTypes from 'prop-types'
import {ToggleCard, ToggleCardEdit, ToggleCardSummary} from '../../../components/toggle-card'
import ShippingAddressSelection from './shipping-address-selection'
import AddressDisplay from '../../../components/address-display'
import useBasket from '../../../commerce-api/hooks/useBasket'

const submitButtonMessage = defineMessage({
    defaultMessage: 'Continue to Shipping Method',
    id: 'shipping_address.button.continue_to_shipping'
})

export default function ShippingAddress({
    multiShipmentState,
    productName,
    counter,
    counterForNextStep,
    setcounterForNextStep
}) {
    const {formatMessage} = useIntl()

    const {
        step,
        checkoutSteps,
        selectedShippingAddress,
        selectedShippingAddresses,
        setShippingAddress,
        setCheckoutStep,
        goToNextStep
    } = useCheckout()
    const [isLoading, setIsLoading] = useState()
    const basket = useBasket()

    const submitAndContinue = async (counter, address) => {
        setIsLoading(true)
        if (multiShipmentState && counter > 0) {
            await basket.setMultiShippingAddress(counter, address)
            setcounterForNextStep(counterForNextStep + 1)
        } else if (multiShipmentState && counter == 0) {
            await basket.setShippingAddress(address)
            setcounterForNextStep(counterForNextStep + 1)
        } else if (multiShipmentState == false && counter == 0) {
            await setShippingAddress(address)
            goToNextStep()
        }

        if (counterForNextStep === basket.productItems.length) {
            setcounterForNextStep(1)
            goToNextStep()
        }
        setIsLoading(false)
    }

    // Display multiShipmentAddresses for Address Summary
    var multiShipmentAddresses = null
    var shipmentId = basket.productItems[counter].shipmentId
    var index = 0
    if (shipmentId !== undefined) {
        index = shipmentId.split('e')
        if (index[1] == '') {
            index[1] = 0
        }
    }
    if (
        selectedShippingAddresses[index[1]] &&
        selectedShippingAddresses[index[1]].shippingAddress
    ) {
        multiShipmentAddresses = selectedShippingAddresses[index[1]].shippingAddress
    }

    return (
        <ToggleCard
            id="step-1"
            title={formatMessage({
                defaultMessage: 'Shipping Address',
                id: 'shipping_address.title.shipping_address'
            })}
            editing={step === checkoutSteps.Shipping_Address}
            isLoading={isLoading}
            disabled={selectedShippingAddress == null}
            onEdit={() => setCheckoutStep(checkoutSteps.Shipping_Address)}
        >
            <ToggleCardEdit>
                <ShippingAddressSelection
                    selectedAddress={selectedShippingAddress}
                    submitButtonLabel={submitButtonMessage}
                    onSubmit={submitAndContinue}
                    multiShipmentState={multiShipmentState}
                    counter={counter}
                    selectedmultiShipmentAddresses={multiShipmentAddresses}
                    itemText={basket.productItems[counter].itemText}
                />
            </ToggleCardEdit>
            {selectedShippingAddress && (
                <ToggleCardSummary>
                    <AddressDisplay
                        address={multiShipmentAddresses}
                        productName={productName}
                        multiShipmentState={multiShipmentState}
                    />
                </ToggleCardSummary>
            )}
        </ToggleCard>
    )
}

ShippingAddress.propTypes = {
    multiShipmentState: PropTypes.bool,
    productName: PropTypes.string,
    counter: PropTypes.string,
    counterForNextStep: PropTypes.string,
    setcounterForNextStep: PropTypes.func
}
