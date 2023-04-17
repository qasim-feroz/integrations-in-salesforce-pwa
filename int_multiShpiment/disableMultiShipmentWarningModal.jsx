import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import React from 'react'

import PropTypes from 'prop-types'
import useBasket from '../app/commerce-api/hooks/useBasket'

function MultiShipmentWarningModal({modalState, setModalState, setmultiShipmentState}) {
    const basket = useBasket()
    const closeModel = () => {
        setModalState(false)
    }

    const rejectWarning = () => {
        setModalState(false)
    }

    const acceptWarning = () => {
        basket.productItems.map((shipmentIdsOfProducts, index) => {
            if (shipmentIdsOfProducts.shipmentId !== 'me') {
                const item = {
                    quantity: basket.productItems[index].quantity,
                    shipmentId: 'me'
                }
                basket.updateItemInBasket(item, basket.productItems[index].itemId)
                basket.removeShipmentFromBasket(shipmentIdsOfProducts.shipmentId)
                console.log('shipmentId of product is not me')
            }
        })
        setModalState(false)
        setmultiShipmentState(false)
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={modalState} onClose={closeModel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        You are going to create a single shipment all saved data will be lost
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalFooter>
                        <Button onClick={rejectWarning} mr={3}>
                            Reject
                        </Button>
                        <Button onClick={acceptWarning} colorScheme="blue">
                            Accept
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

MultiShipmentWarningModal.propTypes = {
    modalState: PropTypes.bool,
    setModalState: PropTypes.func,
    setmultiShipmentState: PropTypes.func
}

export {MultiShipmentWarningModal}
