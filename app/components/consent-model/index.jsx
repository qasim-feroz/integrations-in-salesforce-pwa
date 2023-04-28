import React, {useEffect, useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    // ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    // useDisclosure,
    Divider,
    Text
} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import {createOcapiFetch} from '../../commerce-api/utils'
import {app as appConfig} from '../../../config/default'
import parse from 'html-react-parser'
const ConsentModel = ({isOpen, onClose}) => {
    const [consentData, setConsentData] = useState(undefined)
    let data

    // getting data from the api end point => content/{contentId}

    useEffect(async () => {
        const endpoint = 'content/consent-body-content'
        const method = 'Get'
        const apiConfig = {...appConfig.commerceAPI, proxy: undefined}

        // ocapi call
        data = await createOcapiFetch(apiConfig)(endpoint, method, [{headers: ''}])
        setConsentData(data.c_body)
    }, [])
    // Accept cookies handler
    const submitConsent = (e) => {
        e.preventDefault()
        Cookies.set('sidConsent', 'testingSite123-Accepted', {expires: 7})
        onClose()
    }

    // reject cookies handler
    const rejectedConsent = (e) => {
        e.preventDefault()
        Cookies.set('sidConsent', 'testingSite123-Rejected', {expires: 7})
        onClose()
    }

    return (
        <>
            {consentData && (
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    blockScrollOnMount={false}
                    closeOnOverlayClick={false}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <Text p={'4'} ms={'2'}>
                            Tracking Consent
                        </Text>
                        <Divider />
                        <ModalBody>{parse(consentData)}</ModalBody>
                        <Divider />
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={submitConsent}>
                                Yes
                            </Button>
                            <Button colorScheme="blue" onClick={rejectedConsent}>
                                No
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}

export default ConsentModel
