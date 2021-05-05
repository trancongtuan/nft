import 'react-datepicker/dist/react-datepicker.css'
import {
    Box,
    Button,
    Flex,
    Grid,
    Input,
    Text,
    Image as UIIMage,
} from 'theme-ui'
import React, {
    ChangeEventHandler,
    FC,
    ReactNode,
    useMemo,
    useRef,
    useState,
} from 'react'
import Popover from 'react-popover'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { format } from 'date-fns'
import Layout from '../../containers/Layout'
import ToggleButton from '../../components/ToggleButton'
import PriceIcon from '../../public/assets/images/icons/price.svg'
import TimedIcon from '../../public/assets/images/icons/timed.svg'
import UnlimitedIcon from '../../public/assets/images/icons/unlimited.svg'
import CloseIcon from '../../public/assets/images/icons/close.svg'
import DropdownIcon from '../../public/assets/images/icons/drop-down.svg'
import HelpIcon from '../../public/assets/images/icons/help.svg'
import BackIcon from '../../public/assets/images/icons/back.svg'
import CreateIcon from '../../public/assets/images/icons/create.svg'
import BidCard from '../../components/BidCard'
import CustomInput from '../../components/CustomInput'
import Tooltip, { TooltipItemProps } from '../../components/Tooltip'
import DateTimePicker from '../../components/DateTimePicker'
import Popup from '../../components/Popup'

interface CurrencyIconProps {
    name: string
}

const CurrencyIcon: FC<CurrencyIconProps> = ({ name }) => (
    <Box
        mr={16}
        sx={{
            width: 24,
            height: 24,
            borderRadius: 24,
            overflow: 'hidden',
        }}
    >
        <Image
            src={`/assets/images/${name}.png`}
            width={24}
            height={24}
            alt={name}
        />
    </Box>
)

const currencyList = [
    {
        id: 1,
        label: 'ETH',
        icon: () => <CurrencyIcon name="ETH" />,
        checked: true,
    },
    {
        id: 2,
        label: 'DAI',
        icon: () => <CurrencyIcon name="DAI" />,
    },
    {
        id: 3,
        label: 'RARI',
        icon: () => <CurrencyIcon name="RARI" />,
    },
    {
        id: 4,
        label: 'ATRI',
        icon: () => <CurrencyIcon name="ATRI" />,
    },
    {
        id: 5,
        label: 'ABST',
        icon: () => <CurrencyIcon name="ABST" />,
    },
    {
        id: 6,
        label: 'ADORs',
        icon: () => <CurrencyIcon name="ADORs" />,
    },
]

const currencyTimedList = [
    {
        id: 1,
        label: 'WETH',
        icon: () => <CurrencyIcon name="WETH" />,
        checked: true,
    },
    {
        id: 2,
        label: 'DAI',
        icon: () => <CurrencyIcon name="DAI" />,
    },
    {
        id: 3,
        label: 'RARI',
        icon: () => <CurrencyIcon name="RARI" />,
    },
    {
        id: 4,
        label: 'ATRI',
        icon: () => <CurrencyIcon name="ATRI" />,
    },
    {
        id: 5,
        label: 'ABST',
        icon: () => <CurrencyIcon name="ABST" />,
    },
    {
        id: 6,
        label: 'ADORs',
        icon: () => <CurrencyIcon name="ADORs" />,
    },
]

const marketplaceList = [
    {
        id: 1,
        icon: () => <PriceIcon />,
        label: 'Fixed price',
    },
    {
        id: 2,
        icon: () => <UnlimitedIcon />,
        label: 'Unlimited auction',
    },
]

const startingDateList = [
    {
        id: 1,
        label: 'Right after listing',
    },
    {
        id: 2,
        label: 'Pick specific date',
    },
]

const expirationDateList = [
    {
        id: 1,
        label: '1 day',
    },
    {
        id: 2,
        label: '3 day',
    },
    {
        id: 3,
        label: '5 day',
    },
    {
        id: 4,
        label: '7 day',
    },
    {
        id: 5,
        label: 'Pick specific date',
    },
]

const collectionList = [
    {
        id: 1,
        icon: () => <CreateIcon />,
        label: 'Create',
        subLabel: 'ERC-721',
    },
    {
        id: 2,
        icon: () => (
            <Box
                sx={{
                    borderRadius: 9999,
                    overflow: 'hidden',
                    width: 40,
                    height: 40,
                }}
            >
                <Image
                    src="/assets/images/rarible.png"
                    alt="rarible"
                    width={40}
                    height={40}
                />
            </Box>
        ),
        label: 'Rarible',
        subLabel: 'RARI',
    },
]
interface MarketplaceItemProps {
    id: string | number
    icon: () => ReactNode
    label: string
    onClick?: () => void
    selected?: boolean
}

const MarketplaceItem: FC<MarketplaceItemProps> = ({
    id,
    icon,
    label,
    onClick,
    selected,
}) => (
    <Flex
        onClick={onClick}
        key={id}
        px={20}
        sx={{
            flex: 1,
            height: 140,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: selected ? 'primary' : 'borderColor',
            borderRadius: 16,
            ':hover': {
                borderColor: selected ? 'primary' : 'borderHoverColor',
            },
            flexDirection: 'column',
            cursor: 'pointer',
        }}
        color="text"
    >
        {icon()}
        <Text
            mt={8}
            sx={{
                maxWidth: 60,
                textAlign: 'center',
                fontSize: [12, 14],
                fontWeight: 900,
            }}
        >
            {label}
        </Text>
    </Flex>
)

interface CollectionItemProps {
    id: string | number
    icon: () => ReactNode
    label: string
    onClick?: () => void
    selected?: boolean
    subLabel: string
}

const CollectionItem: FC<CollectionItemProps> = ({
    id,
    icon,
    label,
    onClick,
    selected,
    subLabel,
}) => (
    <Flex
        onClick={onClick}
        key={id}
        px={20}
        sx={{
            flex: 1,
            height: 140,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: selected ? 'primary' : 'borderColor',
            borderRadius: 16,
            ':hover': {
                borderColor: selected ? 'primary' : 'borderHoverColor',
            },
            flexDirection: 'column',
            cursor: 'pointer',
        }}
        color="text"
    >
        {icon()}
        <Text
            mt={8}
            sx={{
                maxWidth: 60,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 900,
            }}
        >
            {label}
        </Text>
        <Text color="textSecondary" sx={{ fontSize: 12 }}>
            {subLabel}
        </Text>
    </Flex>
)

const Multiple: FC = () => {
    const ref = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<string | null>(null)
    const onChangeFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setFile(URL.createObjectURL(event.target.files[0]))
    }
    const [showMarketplace, setShowMarketplace] = useState(true)
    const [showTypePrice, setShowTypePrice] = useState(false)
    const [unlock, setUnlock] = useState(false)
    const [showHelp, setShowHelp] = useState(false)
    const [unlockValue, setUnlockValue] = useState('')
    const [marketplace, setMarketplace] = useState(marketplaceList[0])
    const [collection, setCollection] = useState(collectionList[1])
    const [currency, setCurrency] = useState<TooltipItemProps>(currencyList[0])
    const [expirationDate, setExpirationDate] = useState<string>(
        expirationDateList[0].label
    )
    const [showExpirationDate, setShowExpirationDate] = useState(false)
    const [showStartingDate, setShowStartingDate] = useState(false)
    const [startingDate, setStartingDate] = useState<string>(
        startingDateList[0].label
    )
    const [currencyTimed, setCurrencyTimed] = useState<TooltipItemProps>(
        currencyTimedList[0]
    )
    const router = useRouter()
    const content = useMemo<string>(() => {
        if (showMarketplace) {
            if (marketplace === marketplaceList[0])
                return 'Enter price to allow users instantly purchase your NFT'
            if (marketplace === marketplaceList[1])
                return 'Set a period of time for which buyers can place bids'
            return 'Allow other users to make bids on your NFT'
        }
        return `Put your new NFT on Rarible's marketplace`
    }, [marketplace, showMarketplace])
    const [showStartingDatePopup, setShowStartingDatePopup] = useState(false)
    const [showExpirationDatePopup, setShowExpirationDatePopup] = useState(
        false
    )
    return (
        <Layout>
            <Popup
                isOpen={showStartingDatePopup}
                onClose={() => setShowStartingDatePopup(false)}
                label="Choose starting date"
                closeType="inside"
            >
                <DateTimePicker
                    onChange={(value) =>
                        setStartingDate(format(value, 'MM.dd.yyyy hh:mm a'))
                    }
                />
                <Button
                    onClick={() => setShowStartingDatePopup(false)}
                    mt={16}
                    sx={{ height: 40, width: '100%' }}
                >
                    Apply
                </Button>
            </Popup>
            <Popup
                isOpen={showExpirationDatePopup}
                onClose={() => setShowExpirationDatePopup(false)}
                label="Choose expiration date"
                closeType="inside"
            >
                <DateTimePicker
                    onChange={(value) =>
                        setExpirationDate(format(value, 'MM.dd.yyyy hh:mm a'))
                    }
                />
                <Button
                    onClick={() => setShowExpirationDatePopup(false)}
                    mt={16}
                    sx={{ height: 40, width: '100%' }}
                >
                    Apply
                </Button>
            </Popup>
            <Box mx="auto" sx={{ maxWidth: 815 }}>
                <Flex
                    py={[28, 48]}
                    px={[24, 28, 32]}
                    sx={{ flexDirection: 'column' }}
                >
                    <Flex
                        color="text"
                        onClick={() => router.push('/create')}
                        sx={{
                            alignItems: 'center',
                            cursor: 'pointer',
                            opacity: 0.8,
                        }}
                    >
                        <BackIcon />
                        <Text ml={8} sx={{ fontWeight: 700, fontSize: 16 }}>
                            Manage collectible type
                        </Text>
                    </Flex>
                    <Text
                        mt={16}
                        color="text"
                        mb={32}
                        sx={{ fontSize: [24, 32, 36], fontWeight: 900 }}
                    >
                        Create multiple collectible
                    </Text>
                    <Flex
                        sx={{ flexDirection: 'row', alignItems: 'flex-start' }}
                    >
                        <Flex
                            sx={{ flex: '1 1 auto', flexDirection: 'column' }}
                        >
                            <Text
                                mb={8}
                                color="text"
                                sx={{ fontSize: 17, fontWeight: 900 }}
                            >
                                Upload file
                            </Text>
                            <Flex
                                py={32}
                                px={60}
                                mb={40}
                                sx={{
                                    position: 'relative',
                                    borderWidth: 2,
                                    borderStyle: 'dashed',
                                    borderColor: 'borderColor',
                                    borderRadius: 16,
                                    minHeight: 140,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                {file ? (
                                    <>
                                        <Button
                                            variant="border"
                                            p={0}
                                            sx={{
                                                width: 40,
                                                position: 'absolute',
                                                right: 16,
                                                top: 16,
                                                svg: {
                                                    width: 13,
                                                    height: 13,
                                                },
                                            }}
                                            onClick={() => setFile(null)}
                                        >
                                            <CloseIcon />
                                        </Button>
                                        <UIIMage
                                            src={file}
                                            sx={{
                                                width: 300,
                                                borderRadius: 6,
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Text
                                            mb={16}
                                            color="textSecondary"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: 15,
                                                textAlign: 'center',
                                            }}
                                        >
                                            PNG, GIF, WEBP, MP4 or MP3. Max
                                            30mb.
                                        </Text>
                                        <Button
                                            variant="secondary"
                                            sx={{ minWidth: 160 }}
                                            onClick={() => ref.current.click()}
                                        >
                                            Choose File
                                        </Button>
                                    </>
                                )}
                                <Input
                                    sx={{
                                        display: 'none',
                                    }}
                                    ref={ref}
                                    type="file"
                                    onChange={onChangeFile}
                                />
                            </Flex>
                            <Flex sx={{ width: '100%' }}>
                                <Flex
                                    sx={{
                                        flexDirection: 'column',
                                        width: '100%',
                                    }}
                                >
                                    <Text
                                        mb="4px"
                                        color="text"
                                        sx={{ fontSize: 17, fontWeight: 900 }}
                                    >
                                        Put on marketplace
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                        {content}
                                    </Text>
                                </Flex>
                                <Flex mt={8} ml={16} sx={{ flexShrink: 0 }}>
                                    <ToggleButton
                                        toggle={showMarketplace}
                                        setToggle={setShowMarketplace}
                                        size="large"
                                    />
                                </Flex>
                            </Flex>
                            {showMarketplace && (
                                <>
                                    <Grid gap={16} width={0.5} mt={16}>
                                        {marketplaceList.map((item) => (
                                            <MarketplaceItem
                                                onClick={() =>
                                                    setMarketplace(item)
                                                }
                                                key={item.id}
                                                {...item}
                                                selected={marketplace === item}
                                            />
                                        ))}
                                    </Grid>
                                    {marketplace === marketplaceList[0] && (
                                        <Box mt={40}>
                                            <CustomInput
                                                label="Price"
                                                value=""
                                                placeholder="Enter price for one piece"
                                                onChange={(value) => {
                                                    console.log(value)
                                                }}
                                                staticRight={
                                                    <Popover
                                                        onOuterAction={() =>
                                                            setShowTypePrice(
                                                                false
                                                            )
                                                        }
                                                        isOpen={showTypePrice}
                                                        body={
                                                            <Tooltip
                                                                minWidth={172}
                                                                items={
                                                                    currencyList
                                                                }
                                                                onClick={(
                                                                    item
                                                                ) =>
                                                                    setCurrency(
                                                                        item
                                                                    )
                                                                }
                                                                selectedItem={
                                                                    currency
                                                                }
                                                            />
                                                        }
                                                        place="below"
                                                        tipSize={0.01}
                                                    >
                                                        <Flex
                                                            color="textSecondary"
                                                            sx={{
                                                                svg: {
                                                                    fill:
                                                                        'textSecondary',
                                                                },
                                                                alignItems:
                                                                    'center',
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                            onClick={() =>
                                                                setShowTypePrice(
                                                                    !showTypePrice
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                mr={8}
                                                                sx={{
                                                                    fontSize: 14,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {currency.label}
                                                            </Text>
                                                            <DropdownIcon />
                                                        </Flex>
                                                    </Popover>
                                                }
                                            />
                                            <Flex
                                                sx={{ flexDirection: 'column' }}
                                            >
                                                <Text
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: 15,
                                                        fontWeight: 500,
                                                        lineHeight: '20.7px',
                                                    }}
                                                >
                                                    Service fee{' '}
                                                    <Text color="text">
                                                        2.5%
                                                    </Text>
                                                </Text>
                                                <Text
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: 15,
                                                        fontWeight: 500,
                                                        lineHeight: '20.7px',
                                                    }}
                                                >
                                                    You will receive{' '}
                                                    <Text color="text">
                                                        0 ETH{' '}
                                                    </Text>
                                                    $0.00
                                                </Text>
                                            </Flex>
                                        </Box>
                                    )}
                                </>
                            )}
                            <Flex mt={40} sx={{ width: '100%' }}>
                                <Flex
                                    sx={{
                                        flexDirection: 'column',
                                        width: '100%',
                                    }}
                                >
                                    <Text>
                                        <Text
                                            mb="4px"
                                            color="primary"
                                            sx={{
                                                fontSize: 17,
                                                fontWeight: 900,
                                                WebkitTextFillColor:
                                                    'transparent',
                                                WebkitBackgroundClip: 'text',
                                                backgroundImage:
                                                    'linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                                            }}
                                        >
                                            Unlock once purchased
                                        </Text>
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                        Content will be unlocked after
                                        successful transaction
                                    </Text>
                                </Flex>
                                <Flex mt={8} ml={16} sx={{ flexShrink: 0 }}>
                                    <ToggleButton
                                        toggle={unlock}
                                        setToggle={setUnlock}
                                        size="large"
                                    />
                                </Flex>
                            </Flex>
                            {unlock && (
                                <>
                                    <CustomInput
                                        label=""
                                        placeholder="Digital key, code to redeem or link to file..."
                                        value={unlockValue}
                                        onChange={(text) =>
                                            setUnlockValue(text)
                                        }
                                    />
                                    <Text
                                        mt={8}
                                        color="textSecondary"
                                        sx={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                        Tip: Markdown syntax is supported
                                    </Text>
                                </>
                            )}
                            <Text
                                mt={40}
                                mb="4px"
                                color="text"
                                sx={{ fontSize: 17, fontWeight: 900 }}
                            >
                                Choose collection
                            </Text>
                            <Grid gap={16} width={1 / 3} mt={16} mb={40}>
                                {collectionList.map((item) => (
                                    <CollectionItem
                                        onClick={() => setCollection(item)}
                                        key={item.id}
                                        {...item}
                                        selected={collection === item}
                                    />
                                ))}
                                <Flex
                                    px={20}
                                    sx={{
                                        flex: 1,
                                        height: 140,
                                    }}
                                />
                            </Grid>
                            <CustomInput
                                label="Title"
                                placeholder={`e. g. "Redeemable T-Shirt with logo"`}
                                value=""
                                onChange={(text) => console.log(text)}
                            />
                            <Box mt={40}>
                                <CustomInput
                                    label="Description"
                                    optional
                                    placeholder={`e. g. "After purchasing you’ll be able to get the real T-Shirt"`}
                                    value=""
                                    onChange={(text) => console.log(text)}
                                />
                            </Box>
                            <Box mt={40}>
                                <CustomInput
                                    label="Royalties"
                                    placeholder={`E. g. 10%"`}
                                    value="10"
                                    staticRight={
                                        <Text
                                            color="textSecondary"
                                            sx={{
                                                fontSize: 16,
                                                fontWeight: 500,
                                            }}
                                        >
                                            %
                                        </Text>
                                    }
                                    onChange={(text) => console.log(text)}
                                />
                            </Box>
                            <Text
                                mt={8}
                                color="textSecondary"
                                sx={{ fontSize: 14, fontWeight: 500 }}
                            >
                                Suggested: 10%, 20%, 30%
                            </Text>
                            <Text
                                mt={40}
                                color="text"
                                sx={{ fontWeight: 700, fontSize: 16 }}
                            >
                                Properties
                                <Text
                                    ml={8}
                                    color="textSecondary"
                                    sx={{ fontSize: 1, fontWeight: 500 }}
                                >
                                    (Optional)
                                </Text>
                            </Text>
                            <Grid gap={16} width="40%">
                                <CustomInput
                                    label=""
                                    placeholder="e.g Size"
                                    value=""
                                    onChange={(text) => console.log(text)}
                                />
                                <CustomInput
                                    label=""
                                    placeholder="e.g M"
                                    value=""
                                    onChange={(text) => console.log(text)}
                                />
                            </Grid>
                            <Flex mt={32} sx={{ alignItems: 'center' }}>
                                <Button sx={{ minWidth: 192 }}>
                                    Create item
                                </Button>
                                <Text
                                    ml="auto"
                                    color="textSecondary"
                                    sx={{ fontSize: 14, fontWeight: 500 }}
                                >
                                    Saved 8 minutes ago
                                </Text>
                                <Popover
                                    isOpen={showHelp}
                                    body={
                                        <Tooltip>
                                            <Flex
                                                px={8}
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 200,
                                                }}
                                            >
                                                <Text
                                                    color="text"
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: 12,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    Auto-saving is enabled. All
                                                    data will be stored in your
                                                    browser only
                                                </Text>
                                            </Flex>
                                        </Tooltip>
                                    }
                                    place="above"
                                    tipSize={0.01}
                                >
                                    <Button
                                        onMouseEnter={() => setShowHelp(true)}
                                        onMouseLeave={() => setShowHelp(false)}
                                        variant="border"
                                        p={0}
                                        sx={{
                                            width: 20,
                                            height: 20,
                                        }}
                                        color="textSecondary"
                                        ml={8}
                                    >
                                        <HelpIcon />
                                    </Button>
                                </Popover>
                            </Flex>
                        </Flex>
                        <Flex
                            ml={48}
                            sx={{
                                flexBasis: 240,
                                flexShrink: 0,
                                '@media screen and (max-width: 810px)': {
                                    display: 'none',
                                },
                                flexDirection: 'column',
                                position: 'sticky',
                                top: 106,
                            }}
                        >
                            <Text
                                mb={8}
                                color="text"
                                sx={{ fontSize: 17, fontWeight: 900 }}
                            >
                                Preview
                            </Text>
                            {file ? (
                                <BidCard
                                    favorite={10}
                                    price={10}
                                    type="single"
                                    image={file}
                                    collection={{
                                        src: 'https://picsum.photos/300/300',
                                        verified: true,
                                    }}
                                    owner={{
                                        src: 'https://picsum.photos/200/300',
                                    }}
                                    creator={{
                                        src: 'https://picsum.photos/200/400',
                                        verified: true,
                                    }}
                                    name="Test"
                                    bid={50}
                                    currency="WETH"
                                />
                            ) : (
                                <Flex
                                    sx={{
                                        with: '100%',
                                        height: '100%',
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        borderColor: 'borderColor',
                                        borderStyle: 'solid',
                                    }}
                                    py={[18, 22]}
                                    px={[22, 24]}
                                >
                                    <Flex
                                        sx={{
                                            height: 320,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            color="textSecondary"
                                            sx={{
                                                textAlign: 'center',
                                                fontSize: 15,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Upload file to preview your brand
                                            new NFT
                                        </Text>
                                    </Flex>
                                </Flex>
                            )}
                            {unlock && (
                                <Flex
                                    mt={16}
                                    sx={{
                                        with: '100%',
                                        height: '100%',
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        borderColor: 'borderColor',
                                        borderStyle: 'solid',
                                    }}
                                    py={[18, 22]}
                                    px={[22, 24]}
                                >
                                    {unlockValue ? (
                                        <Text
                                            color="text"
                                            sx={{
                                                fontSize: 15,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {unlockValue}
                                        </Text>
                                    ) : (
                                        <Text
                                            color="textSecondary"
                                            sx={{
                                                width: '100%',
                                                fontSize: 15,
                                                fontWeight: 700,
                                                textAlign: 'center',
                                            }}
                                        >
                                            Unlockable content
                                        </Text>
                                    )}
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Layout>
    )
}

export default Multiple
