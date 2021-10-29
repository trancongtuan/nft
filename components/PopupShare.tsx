import { Box, Button, Flex } from 'theme-ui'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import EmailIcon from '../public/assets/images/icons/email.svg'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";



export const PopupShare: FC = () => {
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_URL + router.asPath;

    return (
        <Flex
            sx={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Box mx={15}>
                <TwitterShareButton url={url}>
                    <div className="border border-gray-400 flex items-center justify-center rounded-full p-4 active:scale-95 hover:border-opacity-50 transition-all mb-1">
                        <TwitterIcon />
                    </div>
                </TwitterShareButton>

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
                <FacebookShareButton url={url}>
                    <div className="border border-gray-400 flex items-center justify-center rounded-full p-4 active:scale-95 hover:border-opacity-50 transition-all mb-1">
                        <FacebookIcon />
                    </div>
                </FacebookShareButton>
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
                <TelegramShareButton url={url}>
                    <div className="border border-gray-400 flex items-center justify-center rounded-full p-4 active:scale-95 hover:border-opacity-50 transition-all mb-1">
                        <TelegramIcon />
                    </div>
                </TelegramShareButton>
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
                <EmailShareButton url={url}>
                    <div className="border border-gray-400 flex items-center justify-center rounded-full p-4 active:scale-95 hover:border-opacity-50 transition-all mb-1">
                        <EmailIcon />
                    </div>
                </EmailShareButton>
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
