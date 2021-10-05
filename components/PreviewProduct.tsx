import { Box, Flex, Text, Image } from 'theme-ui'
import React, { FC, useEffect } from 'react'
import PreviewIcon from '../public/assets/images/icons/preview.svg'

interface PreviewProductProps {
    isOpen: boolean
    onClose: () => void
    image: string
    name?: string
    ethUserName?: string
}

const PreviewProduct: FC<PreviewProductProps> = ({
    isOpen,
    onClose,
    image,
    name,
    ethUserName,
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
                alignItems: ['center', 'center', 'center', 'center'],
                position: 'fixed',
                backgroundColor: 'background',
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
            id="box"
            onClick={(event) => {
                if ((event.target as HTMLElement).id === 'image') onClose()
            }}
        >
            <Flex
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 20,
                    right: 30,
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    color: 'text',
                    ':hover': {
                        borderColor: '#777',
                    },
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'textSecondary',
                }}
            >
                <PreviewIcon />
            </Flex>
            <Image
                id="image"
                src={image}
                sx={{
                    objectFit: 'cover',
                    height: '100%',
                    width: 'auto',
                    borderRadius: 10,
                    cursor: 'zoom-out',
                }}
            />
            <Box
                mr={24}
                sx={{
                    cursor: 'pointer',
                    position: 'fixed',
                    bottom: 30,
                    left: 30,
                    color: 'text',
                    fontWeight: 'semiBold',
                    maxWidth: '300px',
                }}
            >
                <Text sx={{ cursor: 'text' }}>
                    {name}
                </Text>
                <Text sx={{ color: 'textSecondary', cursor: 'text' }}>
                    {' '}
                    by{' '}
                </Text>
                <Text
                    sx={{
                        ':hover': {
                            color: '#DDD',
                        },
                    }}
                >
                    {ethUserName}
                </Text>
            </Box>
        </Box>
    )
}

export default PreviewProduct
