import {Checkbox} from '@chakra-ui/react'
import React from 'react'
import {useState} from 'react'
import PropTypes from 'prop-types'
import useBasket from '../../../commerce-api/hooks/useBasket'
import {MultiShipmentWarningModal} from '../../../../int_multiShpiment/disableMultiShipmentWarningModal'

function EnableMultiShipment({multiShipmentState, setmultiShipmentState}) {
    const basket = useBasket()
    const [isModalOpenState, setModalOpenState] = useState(false)

    const toggleCheckBoxState = async () => {
        if (multiShipmentState == false) {
            setmultiShipmentState(true)
        } else if (multiShipmentState == true) {
            if (basket.getShipmentsCount > 1) {
                setModalOpenState(true)
            }
        }
    }

    var isChecked = false

    if (multiShipmentState == true) {
        isChecked = true
    } else if (multiShipmentState == false) {
        isChecked = false
    }

    return (
        <>
            <MultiShipmentWarningModal
                modalState={isModalOpenState}
                setModalState={setModalOpenState}
                setmultiShipmentState={setmultiShipmentState}
            />
            <Checkbox isChecked={isChecked} size="lg" spacing="1rem" onChange={toggleCheckBoxState}>
                <b>Enable Multi Shipment</b>
            </Checkbox>
        </>
    )
}

EnableMultiShipment.propTypes = {
    multiShipmentState: PropTypes.bool,
    setmultiShipmentState: PropTypes.func
}

export {EnableMultiShipment}
