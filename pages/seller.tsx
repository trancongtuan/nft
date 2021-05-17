import React, { FC, useState, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { Box, Text, Flex, Button } from 'theme-ui'
import Popover from 'react-popover'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { v4 as uuidv4 } from 'uuid'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { GetStaticProps } from 'next'
import Avatar from '../components/Avatar'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import Selection from '../components/Selection'
import BidCard from '../components/BidCard'
import CopyIcon from '../public/assets/images/icons/copy.svg'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import Tooltip from '../components/Tooltip'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import UploadIcon from '../public/assets/images/icons/upload.svg'
import FilterButton from '../components/FilterButton'
import Popup from '../components/Popup'
import ActivityCard from '../components/ActivityCard'
import WorldIcon from '../public/assets/images/icons/world.svg'
import PopupReport from '../components/PopupReport'
import PopupShare from '../components/PopupShare'

const selectionItems = [
    {
        id: '1',
        label: 'seller.on_sale',
        value: 'On sale',
        count: 0,
    },
    {
        id: '2',
        label: 'seller.collectibles',
        value: 'Collectibles',
        count: 0,
    },
    {
        id: '3',
        label: 'seller.created',
        value: 'Created',
        count: 0,
    },
    {
        id: '4',
        label: 'seller.liked',
        value: 'Liked',
        count: 2,
    },
    {
        id: '5',
        label: 'seller.activity',
        value: 'Activity',
        count: 5,
    },
]

const Items: FC = () => {
    const { t } = useTranslation('common')
    const [showCards, setShowCards] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showActivity, setShowActivity] = useState(false)
    const [counter, setCounter] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)
    const [resetFilter, setResetFilter] = useState(false)
    const [showReset, setShowReset] = useState(false)
    const [showReportPopup, setShowReportPopup] = useState(false)

    const toogleResetFilter = (): void => {
        setResetFilter(true)
        setShowReset(false)
    }

    const toggleShowReset = (): void => {
        setShowReset(true)
        setResetFilter(false)
    }

    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => setCounter(counter - 1), 1000)
            return () => clearInterval(timer)
        }
        return setCounter(0)
    }, [counter])

    const renderActivity = (): ReactNode => {
        return (
            <>
                <Box>
                    <Flex sx={{ marginTop: '17px' }}>
                        <Box
                            sx={{
                                width: '65%',
                                '@media screen and (max-width: 776px)': {
                                    width: '100%',
                                },
                            }}
                        >
                            {new Array(10).fill(0).map(() => (
                                <Box
                                    key={uuidv4()}
                                    sx={{ marginBottom: '12px' }}
                                >
                                    <ActivityCard
                                        type="follow"
                                        src="https://via.placeholder.com/500x100"
                                        verified
                                        name="Ahihihi"
                                        content={{
                                            from: {
                                                name: 'Han Khung',
                                                src:
                                                    'https://via.placeholder.com/500x100',
                                            },
                                            to: {
                                                name: 'Han Dien',
                                                src:
                                                    'https://via.placeholder.com/500x100',
                                            },
                                            value: 200,
                                        }}
                                        time="6 days ago"
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                ml: 4,
                                width: '35%',
                                '@media screen and (max-width: 776px)': {
                                    display: 'none',
                                },
                            }}
                        >
                            <Flex>
                                <Text sx={{ fontWeight: '900' }}>
                                    {t('seller.filters')}
                                </Text>
                                {showReset && (
                                    <Text
                                        ml={20}
                                        onClick={() => toogleResetFilter()}
                                        sx={{
                                            fontWeight: '900',
                                            cursor: 'pointer',
                                            color: 'primary',
                                        }}
                                    >
                                        {t('seller.reset_filter')}
                                    </Text>
                                )}
                            </Flex>
                            <Flex sx={{ mt: 3, flexWrap: 'wrap' }}>
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content={t('seller.listings')}
                                    type="listings"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content={t('seller.purchases')}
                                    type="purchases"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    content={t('seller.sales')}
                                    type="sales"
                                    reset={resetFilter}
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    content={t('seller.transfers')}
                                    type="transfers"
                                    reset={resetFilter}
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content={t('seller.burns')}
                                    type="burns"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content={t('seller.bids')}
                                    type="bids"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content={t('seller.likes')}
                                    type="likes"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content={t('seller.followings')}
                                    type="followings"
                                />
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box
                    px={24}
                    sx={{
                        display: 'none',
                        width: '100%',
                        position: 'fixed',
                        bottom: '0',
                        '@media screen and (max-width: 776px)': {
                            display: 'block',
                        },
                    }}
                >
                    <Button
                        variant="primary"
                        onClick={() => {
                            setOpenPopup(true)
                        }}
                        sx={{
                            width: '100%',
                        }}
                    >
                        Filters : All
                    </Button>
                </Box>

                <Popup
                    isOpen={openPopup}
                    onClose={() => {
                        setOpenPopup(false)
                    }}
                    label={t('seller.filters')}
                >
                    <Flex
                        sx={{
                            width: 400,
                            mt: 3,
                            flexWrap: 'wrap',
                        }}
                    >
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.listings')}
                            type="listings"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.purchases')}
                            type="purchases"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.sales')}
                            type="sales"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.transfers')}
                            type="transfers"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.burn')}
                            type="burns"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.bids')}
                            type="bids"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.likes')}
                            type="likes"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content={t('seller.followings')}
                            type="followings"
                        />
                        <Button
                            variant="primary"
                            onClick={() => {
                                setOpenPopup(false)
                            }}
                            sx={{
                                width: '100%',
                            }}
                        >
                            Show
                        </Button>
                    </Flex>
                </Popup>
            </>
        )
    }

    const renderCards = (): ReactNode => {
        if (showCards && !showActivity) {
            return (
                <Flex mt={18} mx={-10} mb={28} sx={{ flexWrap: 'wrap' }}>
                    {new Array(10).fill(0).map(() => (
                        <Box
                            key={uuidv4()}
                            p={10}
                            sx={{
                                maxWidth: [
                                    '100%',
                                    '50%',
                                    '33.3333%',
                                    '25%',
                                    '20%',
                                ],
                                flex: [
                                    '0 0 100%',
                                    '0 0 50%',
                                    '0 0 33.3333%',
                                    '0 0 25%',
                                    '0 0 20%',
                                ],
                            }}
                        >
                            <BidCard
                                favorite={10}
                                price={10}
                                type="single"
                                image="https://picsum.photos/200/400"
                                collection={{
                                    src: 'https://picsum.photos/300/300',
                                    verified: true,
                                }}
                                owner={{ src: 'https://picsum.photos/200/300' }}
                                creator={{
                                    src: 'https://picsum.photos/200/400',
                                    verified: true,
                                }}
                                name="Test"
                                bid={50}
                                currency="WETH"
                            />
                        </Box>
                    ))}
                </Flex>
            )
        }
        return (
            <Box sx={{ margin: '60px auto', maxWidth: '360px' }}>
                <Flex
                    px={3}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text
                        color="text"
                        sx={{ fontWeight: 'heavy', fontSize: 28 }}
                    >
                        {t('seller.no_items_found')}
                    </Text>
                    <Text mt={20}>
                        {t('seller.no_items_found_description')}
                    </Text>

                    <Button
                        mt={20}
                        variant="primary"
                        sx={{
                            fontSize: 1,
                            height: 40,
                        }}
                    >
                        <Link href="/">{t('seller.browse_marketplace')}</Link>
                    </Button>
                </Flex>
            </Box>
        )
    }

    return (
        <Box>
            <NavigationBar />
            <Flex
                mb={52}
                sx={{ justifyContent: 'center', position: 'relative' }}
            >
                <Flex
                    sx={{
                        width: '100%',
                        height: 260,
                        '@media screen and (max-width: 1110px)': {
                            height: 160,
                        },
                        backgroundImage: 'url(https://picsum.photos/1500/300)',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                />
                <Box sx={{ position: 'absolute', bottom: -30 }}>
                    <Avatar
                        src="https://picsum.photos/500/300"
                        size="xl"
                        verified
                    />
                </Box>
            </Flex>

            <Box sx={{ margin: '0 auto', maxWidth: '500px' }}>
                <Flex
                    px={3}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text
                        color="text"
                        sx={{ fontWeight: 'heavy', fontSize: 28 }}
                    >
                        Christopher Nolan
                    </Text>
                    <Flex mb={20} sx={{ alignItems: 'center' }}>
                        <Text
                            sx={{
                                fontSize: 2,
                                lineHeight: '22px',
                                color: 'text',
                                fontWeight: 'bold',
                            }}
                        >
                            0xd92e44ac213b9...fa96
                        </Text>
                        <CopyToClipboard
                            onCopy={() => setCounter(2)}
                            text="0xd92e44ac213b9ebda0178e1523cc0ce177b7fa96"
                        >
                            <Box
                                ml={8}
                                color="textSecondary"
                                sx={{
                                    cursor: 'pointer',
                                    svg: {
                                        width: 16,
                                        height: 16,
                                    },
                                }}
                            >
                                {counter > 0 ? <CheckedIcon /> : <CopyIcon />}
                            </Box>
                        </CopyToClipboard>
                    </Flex>
                    <Text mt={20}>
                        KIWIE 1001 is a unique concept that brings ownership to
                        Street Art through Blockchain technology. Each of KIWIE
                        1001 artworks starts with a real street-art piece and is
                        then adapted into a 3D version that is minted as an NFT.
                    </Text>
                    <Text
                        mt={12}
                        sx={{
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'all 0.12s ease-in-out 0s',
                            ':hover': {
                                color: 'text',
                            },
                        }}
                    >
                        <WorldIcon /> kiwie1001.com
                    </Text>

                    <Flex mt={20}>
                        <Button
                            variant="primary"
                            sx={{
                                fontSize: 1,
                                height: 40,
                            }}
                        >
                            {t('seller.follow')}
                        </Button>
                        <Button
                            onClick={() => setShowShare(!showShare)}
                            ml={8}
                            variant="border"
                            p={0}
                            sx={{ width: 40 }}
                        >
                            <UploadIcon />
                        </Button>
                        <Popup
                            isOpen={showShare}
                            onClose={() => {
                                setShowShare(false)
                            }}
                            label="Share this NFT"
                        >
                            <PopupShare />
                        </Popup>
                        <Popover
                            onOuterAction={() => setShowReport(false)}
                            isOpen={showReport}
                            body={
                                <Tooltip
                                    items={[{ id: '1', label: 'Report page' }]}
                                    minWidth={159}
                                    onClick={() => {
                                        setShowReportPopup(true)
                                        setShowReport(false)
                                    }}
                                />
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                ml={8}
                                onClick={() => setShowReport(!showReport)}
                                variant="border"
                                p={0}
                                sx={{ width: 40 }}
                            >
                                <ThreeDos />
                            </Button>
                        </Popover>
                    </Flex>
                </Flex>
            </Box>
            <Box
                py={4}
                px={[24, 28, 32]}
                mx="auto"
                sx={{
                    width: '100%',
                    maxWidth: 1500,
                }}
            >
                <Flex>
                    <Selection
                        items={selectionItems}
                        onChange={(item) => {
                            if (item.id === '1') {
                                setShowCards(false)
                                setShowActivity(false)
                            } else if (item.id === '5') {
                                setShowActivity(true)
                            } else {
                                setShowActivity(false)
                                setShowCards(true)
                            }
                        }}
                    />
                    <Box
                        sx={{
                            height: 30,
                            position: 'relative',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginLeft: 16,
                            display: 'inline-block',
                        }}
                        onClick={() => setShowFollowing(true)}
                    >
                        <Flex sx={{ alignItems: 'center' }}>
                            <Text
                                sx={{
                                    color: 'textSecondary',
                                    fontWeight: 'bold',
                                    fontSize: 1,
                                    lineHeight: '30px',
                                    transition: 'all 0.12s ease-in-out 0s',
                                    ':hover': {
                                        color: 'text',
                                    },
                                }}
                            >
                                {t('seller.followings')}
                            </Text>

                            <Text
                                sx={{
                                    verticalAlign: 'top',
                                    ml: '4px',
                                    color: 'textSecondary',
                                    fontSize: 0,
                                    fontWeight: 'heavy',
                                    lineHeight: '22px',
                                    mb: '4px',
                                }}
                            >
                                10
                            </Text>
                        </Flex>
                    </Box>
                    <Box
                        sx={{
                            height: 30,
                            position: 'relative',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginLeft: 16,
                            display: 'inline-block',
                        }}
                        onClick={() => setShowFollowers(true)}
                    >
                        <Flex sx={{ alignItems: 'center' }}>
                            <Text
                                sx={{
                                    color: 'textSecondary',
                                    fontWeight: 'bold',
                                    fontSize: 1,
                                    lineHeight: '30px',
                                    transition: 'all 0.12s ease-in-out 0s',
                                    ':hover': {
                                        color: 'text',
                                    },
                                }}
                            >
                                {t('seller.followers')}
                            </Text>

                            <Text
                                sx={{
                                    verticalAlign: 'top',
                                    ml: '4px',
                                    color: 'textSecondary',
                                    fontSize: 0,
                                    fontWeight: 'heavy',
                                    lineHeight: '22px',
                                    mb: '4px',
                                }}
                            >
                                10
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
                {showActivity && renderActivity()}
                {renderCards()}
            </Box>
            <Footer />
            <Popup
                isOpen={showReportPopup}
                onClose={() => {
                    setShowReportPopup(false)
                }}
                label="Why are you reporting?"
            >
                <PopupReport onClose={() => setShowReportPopup(false)} />
            </Popup>
            <Popup
                isOpen={showFollowers}
                onClose={() => {
                    setShowFollowers(false)
                }}
                label="Followers"
            >
                <Flex sx={{ width: 400, mt: 3, flexWrap: 'wrap' }}>
                    <Flex
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Flex sx={{ alignItems: 'center' }}>
                            <Avatar
                                src="https://picsum.photos/200/300"
                                verified
                                size="sm"
                            />
                            <Flex ml={16} sx={{ flexDirection: 'column' }}>
                                <Text
                                    color="textSecondary"
                                    sx={{ fontSize: 1, fontWeight: 'bold' }}
                                >
                                    999 {t('seller.followers')}
                                </Text>
                                <Text
                                    color="text"
                                    sx={{ fontSize: 15, fontWeight: 'heavy' }}
                                >
                                    Kyle Le
                                </Text>
                            </Flex>
                        </Flex>
                        <Button variant="primary">{t('seller.follow')}</Button>
                    </Flex>
                </Flex>
            </Popup>
            <Popup
                isOpen={showFollowing}
                onClose={() => {
                    setShowFollowing(false)
                }}
                label="Following"
            >
                <Flex sx={{ width: 400, mt: 3, flexWrap: 'wrap' }}>
                    <Flex
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Flex sx={{ alignItems: 'center' }}>
                            <Avatar
                                src="https://picsum.photos/200/300"
                                verified
                                size="sm"
                            />
                            <Flex ml={16} sx={{ flexDirection: 'column' }}>
                                <Text
                                    color="textSecondary"
                                    sx={{ fontSize: 1, fontWeight: 'bold' }}
                                >
                                    999 {t('seller.followers')}
                                </Text>
                                <Text
                                    color="text"
                                    sx={{ fontSize: 15, fontWeight: 'heavy' }}
                                >
                                    Kyle Le
                                </Text>
                            </Flex>
                        </Flex>
                        <Button variant="primary">{t('seller.follow')}</Button>
                    </Flex>
                </Flex>
            </Popup>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'common',
            'footer',
            'seller',
        ])),
    },
})

export default Items
