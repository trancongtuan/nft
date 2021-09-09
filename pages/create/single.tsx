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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import * as sigUtil from 'eth-sig-util'
import * as ethUtil from 'ethereumjs-util'
import { format } from 'date-fns'
import { uploadFile, createAsset } from '../../queries'
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
import { randomString } from '../../utils'
import { uploadJsonToIPFS, uploadImageToIPFS, mint } from '../../queries';

interface CurrencyIconProps {
    name: string
}

const CurrencyIcon: FC<CurrencyIconProps> = ({ name }) => (
    <Box
        mr={16}
        sx={{
            width: 24,
            height: 24,
            borderRadius: 2,
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
        icon: () => <TimedIcon />,
        label: 'Timed auction',
    },
    {
        id: 3,
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
    // {
    //     id: 1,
    //     icon: () => <CreateIcon />,
    //     label: 'Create',
    //     subLabel: 'ERC-721',
    // },
    {
        creatable: false,
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
        label: 'ULTCube',
        subLabel: 'ULTC Collection',
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
            borderRadius: 1,
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
                fontWeight: 'heavy',
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
            borderRadius: 1,
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
                fontSize: 2,
                fontWeight: 'heavy',
            }}
        >
            {label}
        </Text>
        <Text color="textSecondary" sx={{ fontSize: 0 }}>
            {subLabel}
        </Text>
    </Flex>
)

const Create: FC = () => {
    const ref = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<string>('/assets/images/avt-default.svg')
    const onChangeFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setFile(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <Flex sx={{ width: 324, flexDirection: 'column' }}>
            <Flex sx={{ alignItems: 'center' }}>
                <Flex
                    sx={{
                        borderRadius: 9999,
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}
                >
                    <UIIMage
                        src={file}
                        sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                        }}
                    />
                    <Input
                        sx={{
                            display: 'none',
                        }}
                        ref={ref}
                        type="file"
                        onChange={onChangeFile}
                    />
                </Flex>
                <Flex ml={16} sx={{ flexDirection: 'column' }}>
                    <Text
                        color="textSecondary"
                        sx={{ fontSize: 1, fontWeight: 'body' }}
                    >
                        We recommend an image of at least 400x400. Gifs work
                        too.
                    </Text>
                    <Button
                        onClick={() => ref.current.click()}
                        mt={16}
                        variant="secondary"
                        sx={{ width: 120 }}
                    >
                        Choose file
                    </Button>
                </Flex>
            </Flex>
            <Box mt={16}>
                <CustomInput
                    label="Display name"
                    optionLabel="required"
                    placeholder="Enter token name"
                    value=""
                    staticBottom="Token name cannot be changed in future"
                />
            </Box>
            <Box mt={16}>
                <CustomInput
                    label="Symbol"
                    optionLabel="required"
                    placeholder="Enter token symbol"
                    value=""
                />
            </Box>
            <Box mt={16}>
                <CustomInput
                    label="Description"
                    optionLabel="optional"
                    placeholder="Spread some words about your token collection"
                    value=""
                />
            </Box>
            <Box mt={16}>
                <CustomInput
                    label="Short url"
                    placeholder="Enter short url"
                    value=""
                    staticLeft={
                        <Flex mr={8} sx={{ flexShrink: 0 }}>
                            <Text
                                color="text"
                                sx={{ fontWeight: 'body', fontSize: 2 }}
                            >
                                rarible.com/
                            </Text>
                        </Flex>
                    }
                    staticBottom="Will be used as public URL"
                />
            </Box>
            <Button mt={16}>Create collection</Button>
        </Flex>
    )
}

const Single: FC = () => {
    const ref = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const defaultAddress = `ultcube_local_${randomString(20)}`
    const [assetData, setAssetData] = useState<{
        name: string
        price: string
        minBid: string
        image: string
        token_id: string
        asset_contract_address: string
        asset_contract: { address: string }
        description?: string
        royalties?: string
    }>({
        name: '',
        image: '',
        description: '',
        price: '',
        minBid: '',
        token_id: '0',
        asset_contract_address: defaultAddress,
        asset_contract: { address: defaultAddress },
    })
    const onChangeFile: ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        event.stopPropagation()
        event.preventDefault()
        setFile(URL.createObjectURL(event.target.files[0]))

        try {
            const files = Array.from([event.target.files[0]])
            if (files.length < 1) return

            const result = await uploadImageToIPFS(files)
            setAssetData((ori) => ({
                ...ori,
                image: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
            }))
        } catch (e) {
            alert(e.toString())
        }
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
    const [showCreatePopup, setShowCreatePopup] = useState(false)

    const onCreate: (event) => void = async (assetData) => {
        const nftData = {
            name: assetData.name,
            image: assetData.image,
            description: assetData.description,
            attributes: {},
        }
    
        try {
            setLoading(true)
            const result = await uploadJsonToIPFS(nftData);
            const hash = await mint(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
            alert(`Minted: ${hash}`);
        } catch (e) {
            alert(e.toString())
        } finally {
            setLoading(false)
        }
    }

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
            <Popup
                isOpen={showCreatePopup}
                onClose={() => setShowCreatePopup(false)}
                label="Collection"
                closeType="outside"
            >
                <Create />
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
                        <Text ml={8} sx={{ fontWeight: 'bold', fontSize: 2 }}>
                            Manage collectible type
                        </Text>
                    </Flex>
                    <Text
                        mt={16}
                        color="text"
                        mb={32}
                        sx={{ fontSize: [24, 32, 36], fontWeight: 'heavy' }}
                    >
                        Create single collectible
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
                                sx={{ fontSize: 17, fontWeight: 'heavy' }}
                            >
                                Upload file
                            </Text>
                            <Flex
                                py={4}
                                px={60}
                                mb={40}
                                sx={{
                                    position: 'relative',
                                    borderWidth: 2,
                                    borderStyle: 'dashed',
                                    borderColor: 'borderColor',
                                    borderRadius: 1,
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
                                                borderRadius: 0,
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Text
                                            mb={16}
                                            color="textSecondary"
                                            sx={{
                                                fontWeight: 'body',
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
                                        sx={{
                                            fontSize: 17,
                                            fontWeight: 'heavy',
                                        }}
                                    >
                                        Put on marketplace
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 1, fontWeight: 'body' }}
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
                                    <Grid gap={16} width={1 / 3} mt={16}>
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
                                                onChange={(value) =>
                                                    setAssetData((ori) => ({
                                                        ...ori,
                                                        price: value,
                                                    }))
                                                }
                                                label="Price"
                                                value={assetData.price || ''}
                                                placeholder="Enter price for one piece"
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
                                                                    fontSize: 1,
                                                                    fontWeight:
                                                                        'bold',
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
                                                        fontWeight: 'body',
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
                                                        fontWeight: 'body',
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
                                    {marketplace === marketplaceList[1] && (
                                        <Box mt={40}>
                                            <CustomInput
                                                onChange={(value) =>
                                                    setAssetData((ori) => ({
                                                        ...ori,
                                                        minBid: value,
                                                    }))
                                                }
                                                value={assetData.minBid || ''}
                                                label="Minimum bid"
                                                placeholder="Enter minimum bid"
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
                                                                    currencyTimedList
                                                                }
                                                                onClick={(
                                                                    item
                                                                ) =>
                                                                    setCurrencyTimed(
                                                                        item
                                                                    )
                                                                }
                                                                selectedItem={
                                                                    currencyTimed
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
                                                            <Flex>
                                                                {currencyTimed ===
                                                                    currencyTimedList[0] && (
                                                                    <Popover
                                                                        isOpen={
                                                                            showHelp
                                                                        }
                                                                        body={
                                                                            <Tooltip>
                                                                                <Flex
                                                                                    px={
                                                                                        15
                                                                                    }
                                                                                    sx={{
                                                                                        width:
                                                                                            '100%',
                                                                                        maxWidth: 200,
                                                                                    }}
                                                                                >
                                                                                    <Text
                                                                                        color="text"
                                                                                        sx={{
                                                                                            fontWeight:
                                                                                                'body',
                                                                                            fontSize: 0,
                                                                                        }}
                                                                                    >
                                                                                        {`WETH,
                                                                                        which
                                                                                        stands
                                                                                        for
                                                                                        "wrapped
                                                                                        Ether",
                                                                                        is
                                                                                        a
                                                                                        cryptocurrency
                                                                                        used
                                                                                        to
                                                                                        make
                                                                                        bids
                                                                                        for
                                                                                        digital
                                                                                        goods
                                                                                        on
                                                                                        Rarible.
                                                                                        There
                                                                                        is
                                                                                        a
                                                                                        1:1
                                                                                        exchange
                                                                                        between
                                                                                        WETH
                                                                                        and
                                                                                        ETH,
                                                                                        so
                                                                                        you
                                                                                        can
                                                                                        always
                                                                                        convert
                                                                                        it
                                                                                        back
                                                                                        and
                                                                                        forth
                                                                                        anytime`}
                                                                                    </Text>
                                                                                </Flex>
                                                                            </Tooltip>
                                                                        }
                                                                        place="above"
                                                                        tipSize={
                                                                            0.01
                                                                        }
                                                                    >
                                                                        <Button
                                                                            onMouseEnter={() =>
                                                                                setShowHelp(
                                                                                    true
                                                                                )
                                                                            }
                                                                            onMouseLeave={() =>
                                                                                setShowHelp(
                                                                                    false
                                                                                )
                                                                            }
                                                                            variant="border"
                                                                            p={
                                                                                0
                                                                            }
                                                                            sx={{
                                                                                width: 20,
                                                                                height: 20,
                                                                                flexShrink: 0,
                                                                            }}
                                                                            color="textSecondary"
                                                                            mr={
                                                                                8
                                                                            }
                                                                        >
                                                                            <HelpIcon />
                                                                        </Button>
                                                                    </Popover>
                                                                )}
                                                                <Text
                                                                    mr={8}
                                                                    sx={{
                                                                        fontSize: 1,
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {
                                                                        currencyTimed.label
                                                                    }
                                                                </Text>
                                                            </Flex>
                                                            <Flex
                                                                sx={{
                                                                    flexShrink: 0,
                                                                }}
                                                            >
                                                                <DropdownIcon />
                                                            </Flex>
                                                        </Flex>
                                                    </Popover>
                                                }
                                            />
                                            <Text
                                                mt={8}
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: 1,
                                                    fontWeight: 'body',
                                                    lineHeight: '20.7px',
                                                }}
                                            >
                                                Bids below this amount won’t be
                                                accepted.
                                            </Text>
                                            <Grid gap={16} width="40%" mt={40}>
                                                <CustomInput
                                                    label="Starting Date"
                                                    placeholder="e.g Size"
                                                    value={startingDate}
                                                    staticRight={
                                                        <Popover
                                                            onOuterAction={() =>
                                                                setShowStartingDate(
                                                                    false
                                                                )
                                                            }
                                                            isOpen={
                                                                showStartingDate
                                                            }
                                                            body={
                                                                <Tooltip
                                                                    minWidth={
                                                                        194
                                                                    }
                                                                    items={
                                                                        startingDateList
                                                                    }
                                                                    onClick={(
                                                                        item
                                                                    ) => {
                                                                        if (
                                                                            item ===
                                                                            startingDateList[1]
                                                                        ) {
                                                                            setShowStartingDatePopup(
                                                                                true
                                                                            )
                                                                            setShowStartingDate(
                                                                                false
                                                                            )
                                                                        } else {
                                                                            setStartingDate(
                                                                                item.label
                                                                            )
                                                                        }
                                                                    }}
                                                                    selectedItem={
                                                                        startingDateList.find(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.label ===
                                                                                startingDate
                                                                        ) ??
                                                                        startingDateList[1]
                                                                    }
                                                                />
                                                            }
                                                            place="below"
                                                            tipSize={0.01}
                                                        >
                                                            <Flex
                                                                sx={{
                                                                    flexShrink: 0,
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
                                                                    setShowStartingDate(
                                                                        !showStartingDate
                                                                    )
                                                                }
                                                            >
                                                                <DropdownIcon />
                                                            </Flex>
                                                        </Popover>
                                                    }
                                                />
                                                <CustomInput
                                                    label="Expiration Date"
                                                    placeholder="e.g Size"
                                                    value={expirationDate}
                                                    staticRight={
                                                        <Popover
                                                            onOuterAction={() =>
                                                                setShowExpirationDate(
                                                                    false
                                                                )
                                                            }
                                                            isOpen={
                                                                showExpirationDate
                                                            }
                                                            body={
                                                                <Tooltip
                                                                    minWidth={
                                                                        194
                                                                    }
                                                                    items={
                                                                        expirationDateList
                                                                    }
                                                                    onClick={(
                                                                        item
                                                                    ) => {
                                                                        if (
                                                                            item ===
                                                                            expirationDateList[4]
                                                                        ) {
                                                                            setShowExpirationDatePopup(
                                                                                true
                                                                            )
                                                                            setShowExpirationDate(
                                                                                false
                                                                            )
                                                                        } else {
                                                                            setExpirationDate(
                                                                                item.label
                                                                            )
                                                                        }
                                                                    }}
                                                                    selectedItem={
                                                                        expirationDateList.find(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.label ===
                                                                                expirationDate
                                                                        ) ??
                                                                        expirationDateList[4]
                                                                    }
                                                                />
                                                            }
                                                            place="below"
                                                            tipSize={0.01}
                                                        >
                                                            <Flex
                                                                sx={{
                                                                    flexShrink: 0,
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
                                                                    setShowExpirationDate(
                                                                        !showExpirationDate
                                                                    )
                                                                }
                                                            >
                                                                <DropdownIcon />
                                                            </Flex>
                                                        </Popover>
                                                    }
                                                />
                                            </Grid>
                                            <Flex
                                                mt={16}
                                                sx={{
                                                    flexDirection: 'column',
                                                    fontWeight: 'body',
                                                    fontSize: 1,
                                                }}
                                            >
                                                <Text color="textSecondary">
                                                    Any bid placed in the last
                                                    10 minutes extends the
                                                    auction by 10 minutes.
                                                </Text>
                                                <Text
                                                    color="primary"
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    Learn more how timed
                                                    auctions work
                                                </Text>
                                            </Flex>
                                        </Box>
                                    )}
                                </>
                            )}
                            {/* <Flex mt={40} sx={{ width: '100%' }}>
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
                                                fontWeight: 'heavy',
                                                WebkitTextFillColor:
                                                    'transparent',
                                                WebkitBackgroundClip: 'text',
                                                backgroundImage:
                                                    'linear-gradient(to right, rgb(0, 238, 185) 0%, rgb(0, 238, 185) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                                            }}
                                        >
                                            Unlock once purchased
                                        </Text>
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 1, fontWeight: 'body' }}
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
                            </Flex> */}
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
                                        sx={{ fontSize: 1, fontWeight: 'body' }}
                                    >
                                        Tip: Markdown syntax is supported
                                    </Text>
                                </>
                            )}
                            <Text
                                mt={40}
                                mb="4px"
                                color="text"
                                sx={{ fontSize: 17, fontWeight: 'heavy' }}
                            >
                                Choose collection
                            </Text>
                            <Grid gap={16} width={1 / 3} mt={16} mb={40}>
                                {collectionList.map((item) => (
                                    <CollectionItem
                                        onClick={() => {
                                            setCollection(item)
                                            if (item.creatable)
                                                setShowCreatePopup(true)
                                        }}
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
                                onChange={(value) =>
                                    setAssetData((ori) => ({
                                        ...ori,
                                        name: value,
                                    }))
                                }
                                value={assetData.name || ''}
                            />
                            <Box mt={40}>
                                <CustomInput
                                    label="Description"
                                    optionLabel="Optional"
                                    placeholder={`e. g. "After purchasing you’ll be able to get the real T-Shirt"`}
                                    onChange={(value) =>
                                        setAssetData((ori) => ({
                                            ...ori,
                                            description: value,
                                        }))
                                    }
                                    value={assetData.description || ''}
                                />
                            </Box>
                            <Box mt={40}>
                                <CustomInput
                                    label="Royalties"
                                    placeholder={`E. g. 10%"`}
                                    onChange={(value) =>
                                        setAssetData((ori) => ({
                                            ...ori,
                                            royalties: value,
                                        }))
                                    }
                                    value={assetData.royalties || ''}
                                    staticRight={
                                        <Text
                                            color="textSecondary"
                                            sx={{
                                                fontSize: 2,
                                                fontWeight: 'body',
                                            }}
                                        >
                                            %
                                        </Text>
                                    }
                                    staticBottom="Suggested: 10%, 20%, 30%"
                                />
                            </Box>
                            {/* <Text
                                mt={40}
                                color="text"
                                sx={{ fontWeight: 'bold', fontSize: 2 }}
                            >
                                Properties
                                <Text
                                    ml={8}
                                    color="textSecondary"
                                    sx={{ fontSize: 1, fontWeight: 'body' }}
                                >
                                    (Optional)
                                </Text>
                            </Text>
                            <Grid gap={16} width="40%">
                                <CustomInput
                                    label=""
                                    placeholder="e.g Size"
                                    value=""
                                />
                                <CustomInput
                                    label=""
                                    placeholder="e.g M"
                                    value=""
                                />
                            </Grid> */}
                            <Flex mt={32} sx={{ alignItems: 'center' }}>
                                <Button
                                    disabled={loading}
                                    sx={{ minWidth: 192 }}
                                    onClick={() => onCreate(assetData)}
                                >
                                    {loading ? 'Loading' : 'Create item'}
                                </Button>
                                <Text
                                    ml="auto"
                                    color="textSecondary"
                                    sx={{ fontSize: 1, fontWeight: 'body' }}
                                >
                                    {/* Saved 8 minutes ago */}
                                </Text>
                                <Popover
                                    isOpen={showHelp}
                                    body={
                                        <Tooltip>
                                            <Flex
                                                px={2}
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 200,
                                                }}
                                            >
                                                <Text
                                                    color="text"
                                                    sx={{
                                                        fontWeight: 'body',
                                                        fontSize: 0,
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
                                sx={{ fontSize: 17, fontWeight: 'heavy' }}
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
                                        borderRadius: 1,
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
                                                fontWeight: 'body',
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
                                        borderRadius: 1,
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
                                                fontWeight: 'bold',
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
                                                fontWeight: 'bold',
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Single
