import React, { FC, useState, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { Box, Text, Flex, Button } from 'theme-ui'
import Popover from 'react-popover'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import Avatar from '../components/Avatar'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import Selection from '../components/Selection'
import BidCard from '../components/BidCard'
import CopyIcon from '../public/assets/images/icons/copy.svg'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import Tooltip from '../components/Tooltip'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import EmailIcon from '../public/assets/images/icons/email.svg'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import UploadIcon from '../public/assets/images/icons/upload.svg'
import FilterButton from '../components/FilterButton'
import Popup from '../components/Popup'
import ActivityCard from '../components/ActivityCard'
import PopupReport from '../components/PopupReport'
import { fetchUsers, fetchAssets, EthUser } from '../queries';
import { useAuth } from '../hooks/auth'

const selectionItems = [
    {
        id: '1',
        label: 'On sale',
        value: 'On sale',
        count: 0,
    },
    // {
    //     id: '2',
    //     label: 'Collectibles',
    //     value: 'Collectibles',
    //     count: 0,
    // },
    // {
    //     id: '3',
    //     label: 'Created',
    //     value: 'Created',
    //     count: 0,
    // },
    // {
    //     id: '4',
    //     label: 'Liked',
    //     value: 'Liked',
    //     count: 2,
    // },
    // {
    //     id: '5',
    //     label: 'Activity',
    //     value: 'Activity',
    //     count: 5,
    // },
]

const Items: FC = () => {
    const router = useRouter()
    const { connected, setConnected } = useAuth()
    const [showCards, setShowCards] = useState(true)
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
    const [assets, setAssets] = useState([]);
    const [profile, setProfile] = useState<EthUser>({
        id: null,
        display_name: '',
        custom_url: '',
        twitter: '',
        email: '',
        bio: '',
        website: '',
        address: '',
        profile_pic: { url: null }
    })

    const toogleResetFilter = (): void => {
        setResetFilter(true)
        setShowReset(false)
    }

    const toggleShowReset = (): void => {
        setShowReset(true)
        setResetFilter(false)
    }


    const updateProfile = async () => {
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            var from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')
            const result = await fetchUsers({ address: from })
            if (result[0]) setProfile(result[0]);
        } catch(e) {
            alert(e.toString());
        }
    }

    const connectWallet = async () => {
        // Get Address
        let accountAddress
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            accountAddress = await window.ethereum.enable()
            if (!accountAddress[0]) throw new Error('No account selected.')
            accountAddress = accountAddress[0]
            setConnected(accountAddress);
            updateProfile();
        } catch(e) {
            alert(e.message)
            return
        }
    }

    const updateAssets = async () => {
        if (!window.ethereum) throw new Error('Please install MetaMask.')
        let accountAddress = await window.ethereum.enable()
        if (!accountAddress[0]) throw new Error('No account selected.')
        accountAddress = accountAddress[0]
        const result = await fetchAssets({ owner_address_contains: accountAddress });
        setAssets(result);
    }

    useEffect(() => {
        if (!connected) {
            connectWallet()
        } else {
            updateProfile()
            updateAssets()
        }
    }, [])

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
                                <Text sx={{ fontWeight: '900' }}>Filters</Text>
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
                                        Reset Filters
                                    </Text>
                                )}
                            </Flex>
                            <Flex sx={{ mt: 3, flexWrap: 'wrap' }}>
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content="Listings"
                                    type="listings"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content="Purchases"
                                    type="purchases"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    content="Sales"
                                    type="sales"
                                    reset={resetFilter}
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    content="Transfers"
                                    type="transfers"
                                    reset={resetFilter}
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content="Burns"
                                    type="burns"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content="Bids"
                                    type="bids"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content="Likes"
                                    type="likes"
                                />
                                <FilterButton
                                    toggleShowReset={() => toggleShowReset()}
                                    reset={resetFilter}
                                    content="Followings"
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
                    label="Filters"
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
                            content="Listings"
                            type="listings"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content="Purchases"
                            type="purchases"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content="Sales"
                            type="sales"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content="Transfers"
                            type="transfers"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content="Burns"
                            type="burns"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content="Bids"
                            type="bids"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content="Likes"
                            type="likes"
                        />
                        <FilterButton
                            toggleShowReset={() => toggleShowReset()}
                            reset={false}
                            content="Followings"
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
                    {assets.map((item) => (
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
                                key={item.id}
                                onCLick={() =>
                                    router.push(
                                        `/product/${item.asset_contract.address}/${item.token_id}`
                                    )
                                }
                                name={item.name}
                                image={item.image_url}
                                currency="ETH"
                                price={item.top_bid ?? 0}
                                {...(item?.creator && {
                                    creator: {
                                        src: item.creator?.profile_img_url,
                                    },
                                })}
                                {...(item?.owner && {
                                    owner: {
                                        src: item.owner?.profile_img_url,
                                    },
                                })}
                                {...(item?.collection && {
                                    collection: {
                                        src: item.collection?.image_url,
                                    },
                                })}
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
                        No items found
                    </Text>
                    <Text mt={20}>
                        Come back soon! Or try to browse something for you on
                        our marketplace
                    </Text>

                    <Button
                        mt={20}
                        variant="primary"
                        sx={{
                            fontSize: 1,
                            height: 40,
                        }}
                    >
                        <Link href="/">Browse Marketplace</Link>
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
                        src={profile.profile_pic?.url ?
                            'https://api.ultcube.scc.sh' + profile.profile_pic?.url
                            : '/assets/images/empty_placeholder.png'}
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
                        {profile.display_name}
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
                            {profile.address}
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
                    <Flex mt={20}>
                        <Button
                            variant="primary"
                            sx={{
                                fontSize: 1,
                                height: 40,
                            }}
                        >
                            Follow
                        </Button>
                        <Popover
                            onOuterAction={() => setShowShare(false)}
                            isOpen={showShare}
                            body={
                                <Tooltip>
                                    <Flex
                                        p={3}
                                        sx={{
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            minWidth: 322,
                                        }}
                                    >
                                        <Text
                                            mb={16}
                                            color="text"
                                            sx={{
                                                fontSize: 18,
                                                fontWeight: 'heavy',
                                                lineHeight: '25px',
                                            }}
                                        >
                                            Share link to this page
                                        </Text>
                                        <Flex
                                            sx={{
                                                width: '100%',
                                                justifyContent: 'space-around',
                                            }}
                                        >
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <TwitterIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Twitter
                                                </Text>
                                            </Flex>
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <FacebookIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Facebook
                                                </Text>
                                            </Flex>
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <TelegramIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Telegram
                                                </Text>
                                            </Flex>
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <EmailIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    E-mail
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Tooltip>
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                onClick={() => setShowShare(!showShare)}
                                ml={8}
                                variant="border"
                                p={0}
                                sx={{ width: 40 }}
                            >
                                <UploadIcon />
                            </Button>
                        </Popover>
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
                                Following
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
                                Followers
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
                                    999 Followers
                                </Text>
                                <Text
                                    color="text"
                                    sx={{ fontSize: 15, fontWeight: 'heavy' }}
                                >
                                    Kyle Le
                                </Text>
                            </Flex>
                        </Flex>
                        <Button variant="primary">Follow</Button>
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
                                    999 Followers
                                </Text>
                                <Text
                                    color="text"
                                    sx={{ fontSize: 15, fontWeight: 'heavy' }}
                                >
                                    Kyle Le
                                </Text>
                            </Flex>
                        </Flex>
                        <Button variant="primary">Follow</Button>
                    </Flex>
                </Flex>
            </Popup>
        </Box>
    )
}

export default Items
