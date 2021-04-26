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
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                background: 'rgba(4, 4, 5, 0.8)',
                width: '100%',
                minHeight: '100vh',
                top: 0,
                left: 0,
                opacity: 1,
                visibility: isOpen ? 'visible' : 'hidden',
                zIndex: 9,
                transition: 'all 0.22s ease-in-out 0s',
                '>div': {
                    transform: isOpen ? 'translateY(0)' : 'translateY(100vh)',
                },
            }}
        >
            <Box
                sx={{
                    px: 20,
                    py: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    background: 'white',
                    borderRadius: 20,
                    minWidth: 400,
                    transition: 'all .5s',
                }}
            >
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
                    <Button variant="circle" onClick={onClose}>
                        <CloseIcon />
                    </Button>
                </Flex>
                {children}
            </Box>
        </Box>
    )
}

export default Popup
