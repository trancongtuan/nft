import { Box, Button, Flex } from 'theme-ui'
import React, { FC } from 'react'
import EmailIcon from '../public/assets/images/icons/email.svg'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'

export const PopupShare: FC = () => {
    return (
        <Flex
            sx={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Box mx={15}>
                <Button variant="circle" sx={{ width: '56px', height: '56px' }}>
                    <TwitterIcon />
                </Button>
                <Box
                    mt={1}
                    sx={{
                        width: '56px',
                        color: 'textSecondary',
                        fontSize: '11px',
                        lineHeight: '16.56px',
                        textAlign: 'center',
                        fontWeight: '600',
                    }}
                >
                    Twitter
                </Box>
            </Box>
            <Box mx={15}>
                <Button variant="circle" sx={{ width: '56px', height: '56px' }}>
                    <FacebookIcon />
                </Button>
                <Box
                    mt={1}
                    sx={{
                        width: '56px',
                        color: 'textSecondary',
                        fontSize: '11px',
                        lineHeight: '16.56px',
                        textAlign: 'center',
                        fontWeight: '600',
                    }}
                >
                    Facebook
                </Box>
            </Box>
            <Box mx={15}>
                <Button variant="circle" sx={{ width: '56px', height: '56px' }}>
                    <TelegramIcon />
                </Button>
                <Box
                    mt={1}
                    sx={{
                        width: '56px',
                        color: 'textSecondary',
                        fontSize: '11px',
                        lineHeight: '16.56px',
                        textAlign: 'center',
                        fontWeight: '600',
                    }}
                >
                    Telegram
                </Box>
            </Box>
            <Box mx={15}>
                <Button variant="circle" sx={{ width: '56px', height: '56px' }}>
                    <EmailIcon />
                </Button>
                <Box
                    mt={1}
                    sx={{
                        width: '56px',
                        color: 'textSecondary',
                        fontSize: '11px',
                        lineHeight: '16.56px',
                        textAlign: 'center',
                        fontWeight: '600',
                    }}
                >
                    E-mail
                </Box>
            </Box>
        </Flex>
    )
}

export default PopupShare
