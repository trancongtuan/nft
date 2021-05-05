import { Box, Button, Flex, Text } from 'theme-ui'
import React, { FC, useEffect } from 'react'
import CloseIcon from '../public/assets/images/icons/close.svg'

interface PopupProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    label: string
    closeType?: 'inside' | 'outside'
}

const Popup: FC<PopupProps> = ({
    isOpen,
    onClose,
    children,
    label,
    closeType = 'outside',
}) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
    }, [isOpen])
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: ['flex-end', 'center', 'center', 'center'],
                position: 'fixed',
                background: 'rgba(4, 4, 5, 0.8)',
                width: '100%',
                minHeight: '100vh',
                top: 0,
                left: 0,
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? 'visible' : 'hidden',
                zIndex: 9999,
                transition: 'all 0.22s ease-in-out 0s',
                '>div': {
                    transform: isOpen ? 'translateY(0)' : 'translateY(100vh)',
                },
            }}
        >
            {closeType === 'outside' && (
                <Box
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        borderRadius: 'none',
                        color: '#aaa',
                        ':hover': {
                            color: '#FFF',
                        },
                        cursor: 'pointer',
                    }}
                >
                    <CloseIcon />
                </Box>
            )}
            <Box
                sx={{
                    px: 30,
                    py: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: 'background',
                    borderRadius: 20,
                    borderBottomLeftRadius: [0, 20, 20, 20],
                    borderBottomRightRadius: [0, 20, 20, 20],
                    minWidth: [
                        '100%',
                        'max-content',
                        'max-content',
                        'max-content',
                    ],
                    maxWidth: 380,
                    transition: 'all .5s',
                    border: '1px #292929 solid',
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
                    <Flex
                        sx={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: closeType === 'inside' ? 20 : 28,
                                fontWeight: 'heading',
                                color: 'text',
                            }}
                        >
                            {label}
                        </Text>
                        {closeType === 'inside' && (
                            <Button
                                onClick={onClose}
                                p={0}
                                variant="border"
                                color="text"
                                sx={{
                                    width: 40,
                                    svg: {
                                        width: 13,
                                        height: 13,
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <CloseIcon />
                            </Button>
                        )}
                    </Flex>
                </Flex>
                {children}
            </Box>
        </Box>
    )
}

export default Popup
