import React, { FC, PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import InstagramIcon from '../public/assets/images/icons/instagram.svg'
import DiscordIcon from '../public/assets/images/icons/discord.svg'
import YoutubeIcon from '../public/assets/images/icons/youtube.svg'
import MediumIcon from '../public/assets/images/icons/medium.svg'

const SocialItem: FC<PropsWithChildren<{ href: string }>> = ({
    href,
    children,
}) => (
    <a href={href} target="_blank" rel="noreferrer">
        <Box
            sx={{
                opacity: 0.6,
                ':hover': {
                    opacity: 1,
                },
                transition: 'all 0.12s ease-in-out 0s',
                cursor: 'pointer',
            }}
        >
            {children}
        </Box>
    </a>
)

const Social: FC = () => {
    return (
        <Flex color="text" sx={{ justifyContent: 'space-between', flex: 1 }}>
            <SocialItem href="https://twitter.com/rariblecom">
                <TwitterIcon />
            </SocialItem>
            <SocialItem href="https://t.me/rarible">
                <TelegramIcon />
            </SocialItem>
            <SocialItem href="http://instagram.com/rariblecom">
                <InstagramIcon />
            </SocialItem>
            <SocialItem href="https://discord.gg/cdaFbV5">
                <DiscordIcon />
            </SocialItem>
            <SocialItem href="https://www.youtube.com/channel/UC2v3aVwed777Sxj7pjrpK9Q">
                <YoutubeIcon />
            </SocialItem>
            <SocialItem href="https://medium.com/@rarible">
                <MediumIcon />
            </SocialItem>
        </Flex>
    )
}

export default Social
