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
import Layout from '../../containers/Layout'
import CloseIcon from '../../public/assets/images/icons/close.svg'
import HelpIcon from '../../public/assets/images/icons/help.svg'
import BackIcon from '../../public/assets/images/icons/back.svg'

import BidCard from '../../components/BidCard'
import CustomInput from '../../components/CustomInput'
import Tooltip from '../../components/Tooltip'
import { randomString } from '../../utils'
import { uploadJsonToUltcube, uploadImageToIPFS, mintMultiple } from '../../queries';

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

const Multiple: FC = () => {
    const ref = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>(null)
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
        amount?: number
    }>({
        name: '',
        image: '',
        description: '',
        price: '',
        minBid: '',
        token_id: '0',
        asset_contract_address: defaultAddress,
        asset_contract: { address: defaultAddress },
        amount: null
    })

    const onChangeFile: ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        event.stopPropagation()
        event.preventDefault()
        setFile(event.target.files[0])
    }
    const [showHelp, setShowHelp] = useState(false)
    const router = useRouter()

    const onCreate: (event) => void = async (assetData) => {
        try {
            setLoading(true)

            const files = Array.from([file])
            if (files.length < 1) return

            const mediaUploadResult = await uploadImageToIPFS(files)
            const nftData = {
                name: assetData.name,
                image: `https://gateway.pinata.cloud/ipfs/${mediaUploadResult.IpfsHash}`,
                description: assetData.description,
                attributes: {},
            }
        
            const result = await uploadJsonToUltcube(nftData);
            const hash = await mintMultiple(assetData.amount);
            alert(`Minted: ${hash}, please wait for network confirmation and refresh My Item page.`);
            router.push('/my_items')
        } catch (e) {
            if (e.message) return alert(e.message)
            alert(e.toString())
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
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
                                            src={URL.createObjectURL(file)}
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
                                    label="Number of copies"
                                    placeholder={`Amount of tokens, e. g. "100"`}
                                    onChange={(value) =>
                                        setAssetData((ori) => ({
                                            ...ori,
                                            amount: value,
                                        }))
                                    }
                                    value={assetData.amount || ''}
                                />
                            </Box>
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
                                    price={1}
                                    type="Multiple"
                                    image={URL.createObjectURL(file)}
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
                                    name={assetData.name}
                                    // bid={50}
                                    currency="ETH"
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

export default Multiple
