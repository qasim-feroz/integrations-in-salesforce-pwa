import React, {useState} from 'react'
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Checkbox,
    Stack,
    Button,
    Text
} from '@chakra-ui/react'

const CookiesModel = ({
    isOpen,
    onClose,
    cookiePreferences,
    handleCheckboxChange,
    handleAcceptClick
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
            blockScrollOnMount={false}
            closeOnOverlayClick={false}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cookie Preferences</ModalHeader>
                <ModalBody maxH="md" overflowY="auto">
                    <Box p={4}>
                        <Stack spacing={4}>
                            <Checkbox
                                isChecked={cookiePreferences.analytics}
                                name="analytics"
                                onChange={handleCheckboxChange}
                            >
                                Enable Analytics Cookies
                                <Text></Text>
                            </Checkbox>
                            <Checkbox
                                isChecked={cookiePreferences.marketing}
                                name="marketing"
                                onChange={handleCheckboxChange}
                            >
                                Enable Marketing Cookies
                            </Checkbox>
                            <Checkbox
                                isChecked={cookiePreferences.functional}
                                name="functional"
                                onChange={handleCheckboxChange}
                            >
                                Enable Functional Cookies
                            </Checkbox>
                        </Stack>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleAcceptClick}
                        disabled={!Object.values(cookiePreferences).some((value) => value)}
                    >
                        Accept
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CookiesModel
