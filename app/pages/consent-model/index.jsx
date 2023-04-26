import React from 'react'
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
const ConsentModel = ({isOpen, onClose}) => {
    // submitedCookies

    const submitedCookies = (e) => {
        e.preventDefault()
        Cookies.set('sidConsent', 'testingSite123-Accepted', {expires: 7})
        console.log('Getting that')
        onClose()
    }

    const rejectedCookies = (e) => {
        e.preventDefault()
        Cookies.set('sidConsent', 'testingSite123-Rejected', {expires: 7})
        console.log('rejected cookies')
        onClose()
    }

    return (
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
                <ModalBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur.
                    </p>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={submitedCookies}>
                        Yes
                    </Button>
                    <Button colorScheme="blue" onClick={rejectedCookies}>
                        No
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConsentModel
