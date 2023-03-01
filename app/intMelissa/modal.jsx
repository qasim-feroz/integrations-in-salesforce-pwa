import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import React from 'react'

function MelissaSuggestionModal({modalState, setModalState, melissaAddress, addressData, submitForm}) {
    const closeModel = () => {
        setModalState(false)
    }

    const formSubmissionMelissaAddress = () => {
        setModalState(false)
        submitForm({
            firstName: addressData.firstName,
            lastName: addressData.lastName,
            phone: addressData.phone,
            address1: melissaAddress.Address1,
            city: melissaAddress.Locality,
            stateCode: melissaAddress.AdministrativeArea,
            postalCode: melissaAddress.PostalCode,
            countryCode: melissaAddress.ISO3166_2
        })
    }

    const formSubmissionAddress = () => {
        setModalState(false)
        submitForm({
            firstName: addressData.firstName,
            lastName: addressData.lastName,
            phone: addressData.phone,
            address1: addressData.address1,
            city: addressData.city,
            stateCode: addressData.stateCode,
            postalCode: addressData.postalCode,
            countryCode: addressData.countryCode
        })
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={modalState} onClose={closeModel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Melissa Address Suggestion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <b>Entered Address:</b>
                        <p>{`${addressData.address1}`}</p>
                        <p>
                            {`${addressData.city}, ${addressData.stateCode} ${addressData.postalCode}`}
                        </p>
                        <p>{addressData.countryCode}</p>
                        <b>Melissa Suggested Address:</b>
                        <p>{`${melissaAddress.Address1}`}</p>
                        <p>
                            {`${melissaAddress.Locality}, ${melissaAddress.AdministrativeArea} ${melissaAddress.PostalCode}`}
                        </p>
                        <p>{melissaAddress.ISO3166_2}</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={formSubmissionAddress} mr={3}>
                            Cancel
                        </Button>
                        <Button onClick={formSubmissionMelissaAddress} colorScheme="blue">
                            Continue
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function ErrorModal ({errorModalState, setErrorModalState}) {

    const closeModel = () => {
        setErrorModalState(false)
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={errorModalState} onClose={closeModel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Error</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <p>Incorrect Address, Go back and enter correct address</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={closeModel} mr={3}>
                            Back
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export {MelissaSuggestionModal, ErrorModal}
