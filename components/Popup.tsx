import { Box, Button, Flex, Text } from 'theme-ui'
import React, { FC, useEffect } from 'react'
import CloseIcon from '../public/assets/images/icons/close.svg'

interface PopupProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    label: string
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, children, label }) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
    }, [isOpen])

    const handleOnClick = (event) => {
        if (event.target.id === 'close') {
            onClose()
        }
    }

    return (
        <Box variant={isOpen ? 'popup.enable' : 'popup.disable'} id="popup">
            <Box variant="popup.box">
                <Flex
                    mb={3}
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        height: '40px',
                    }}
                >
                    <Text
                        sx={{
                            fontSize: '28px',
                            fontWeight: 'heading',
                            color: '#000',
                        }}
                    >
                        {label}
                    </Text>
                    <Button variant="circle" id="close" onClick={handleOnClick}>
                        <CloseIcon />
                    </Button>
                </Flex>
                {children}
            </Box>
        </Box>
    )
}

export default Popup
