/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, {
    FC,
    useState,
} from 'react'
import {
    Box,
    Button,
    Flex,
    Text,
    useColorMode,
    Link as UILink,
} from 'theme-ui'
import Popover from 'react-popover'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import CloseIcon from '../../public/assets/images/icons/close.svg'
import Tooltip, { TooltipItemProps as TooltiProps } from '../Tooltip'
import Social from '../Social'
import languageList from './languageList';

interface CatalogProps {
    onClose: () => void
}

const MobileMenu: FC<CatalogProps> = ({ onClose }) => {
    const [colorMode] = useColorMode()
    const { t } = useTranslation('common')
    const [showLanguage, setShowLanguage] = useState(false)
    const [language, setLanguage] = useState<TooltiProps>(languageList[0])
    const router = useRouter()
    return (
        <Flex
            bg="background"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                flexDirection: 'column',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Flex
                    bg="background"
                    px={[24, 28, 32]}
                    sx={{
                        height: 84,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Flex>
                        <Link href="/">
                            <Box
                                mr={16}
                                sx={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    width: '180px',
                                    height: '45px',
                                }}
                            >
                                {colorMode === 'dark' ? (
                                    <Image
                                        src="/assets/images/logo_black.png"
                                        alt="logo"
                                        layout="fill"
                                    />
                                ) : (
                                    <Image
                                        src="/assets/images/logo_white.png"
                                        alt="logo"
                                        layout="fill"
                                    />
                                )}
                            </Box>
                        </Link>
                        <Popover
                            onOuterAction={() => setShowLanguage(false)}
                            isOpen={showLanguage}
                            body={
                                <Tooltip
                                    onClick={(item) => setLanguage(item)}
                                    items={languageList}
                                    selectedItem={language}
                                />
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                onClick={() => setShowLanguage(!showLanguage)}
                                variant="border"
                            >
                                {language.label}
                            </Button>
                        </Popover>
                    </Flex>
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
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </Flex>
            </Box>
            <Box px={3} mt={8} sx={{ width: '100%' }}>
                <Flex sx={{ flexDirection: 'column' }}>
                    <Link href="/search">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.explore')}
                        </Text>
                    </Link>
                    <Link href="/my_items">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.my_items')}
                        </Text>
                    </Link>
                    <Link href="/following">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.following')}
                        </Text>
                    </Link>
                    <Flex sx={{ alignItems: 'center', cursor: 'pointer' }}>
                        <Link href="/activity">
                            <Text
                                mb={8}
                                color="text"
                                sx={{
                                    fontSize: 3,
                                    fontWeight: 'heavy',
                                }}
                            >
                                {t('general.activity')}
                            </Text>
                        </Link>
                        <Box ml={8}>
                            <Image
                                src="/assets/images/icons/new.svg"
                                width={30}
                                height={14}
                            />
                        </Box>
                    </Flex>
                    <UILink
                        href="/how_it_works"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.how_it_work')}
                    </UILink>
                </Flex>
                <Box mt={16}>
                    <Text
                        sx={{
                            fontSize: 18,
                            fontWeight: 'heavy',
                            color: 'rgb(0, 238, 185)',
                            WebkitTextFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            backgroundImage:
                                'linear-gradient(to right, rgb(0, 238, 185) 0%, rgb(0, 238, 185) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                        }}
                    >
                        {t('general.community')}
                    </Text>
                </Box>
                <Flex mt={8} sx={{ flexDirection: 'column' }}>
                    <Link href="/rari">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.RARI_token')}
                        </Text>
                    </Link>
                    <UILink
                        href="https://gov.rarible.com/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.discussion')}
                    </UILink>
                    <UILink
                        href="https://snapshot.org/#/rarible/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.voting')}
                    </UILink>
                    <UILink
                        href="https://snapshot.org/#/rarible/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.suggest_feature')}
                    </UILink>
                    <UILink
                        href="https://rarible.nolt.io/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.subscribe')}
                    </UILink>
                </Flex>
            </Box>
            <Box mt="auto" p={3}>
                <Box bg="borderColor" sx={{ width: '100%', height: 1 }} />
                <Flex mt={28}>
                    <Social />
                </Flex>
                <Button
                    mt={16}
                    variant="secondary"
                    sx={{ width: '100%', height: 48, borderRadius: 5 }}
                    onClick={() => {
                        router.push('/create')
                        onClose()
                    }}
                >
                    Create collectible
                </Button>
            </Box>
        </Flex>
    )
}

export default MobileMenu;