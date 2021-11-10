import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, {
    ChangeEventHandler,
    FC, useRef,
    useState
} from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Popover from 'react-popover'
import {
    Box,
    Button,
    Flex, Image as UIIMage, Input,
    Text
} from 'theme-ui'
import { useAuth } from '../../hooks/auth'
import BidCard from '../../components/BidCard'
import CustomInput from '../../components/CustomInput'
import Tooltip from '../../components/Tooltip'
import Layout from '../../containers/Layout'
import BackIcon from '../../public/assets/images/icons/back.svg'
import CloseIcon from '../../public/assets/images/icons/close.svg'
import HelpIcon from '../../public/assets/images/icons/help.svg'
import { mint, uploadImageToIPFS, uploadJsonToIPFS, preMintRequest } from '../../queries'
import { randomString } from '../../utils'

const Single: FC = () => {
    const ref = useRef<HTMLInputElement>(null)

    const { profile } = useAuth()

    const [statusText, setStatusText] = useState('')
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
        setFile(event.target.files[0])
    }
    const [showHelp, setShowHelp] = useState(false)
    const [preMint, setPreMint] = useState(false)
    const router = useRouter()

    const onCreate: (event, isPreMint) => void = async (assetData, isPreMint) => {
        try {
            setLoading(true)

            setStatusText('Minting machine starting...')
            const files = Array.from([file])
            if (files.length < 1) return

            setStatusText('Uploading image to IPFS...')
            const mediaUploadResult = await uploadImageToIPFS(files)
            const nftData = {
                name: assetData.name,
                image: `https://gateway.pinata.cloud/ipfs/${mediaUploadResult.IpfsHash}`,
                description: assetData.description,
                attributes: {},
            }
        
            setStatusText('Preparing NFT JSON...')
            const result = await uploadJsonToIPFS(nftData);

            setStatusText('Minting now! Please approve the transaction on your wallet!')
            if (isPreMint) {
                const data = { meta: nftData, ipfsJson: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}` }
                await preMintRequest(data, profile.address);
            } else {
                await mint(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
                alert(`Minted, please wait for network confirmation and refresh My Item page.`);
            }

            setStatusText('Minted, please wait for network confirmation and refresh My Item page.')
            router.push('/my_items?minted=1')
        } catch (e) {
            if (e.message) return alert(e.message)
            alert(e.toString())
        } finally {
            setLoading(false)
            setStatusText('')
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
                            <div className="mt-6">
                                <input type="checkbox" id="pre-mint" name="pre-mint" value="Bike" onChange={(e) => setPreMint(e.target.checked)}/>
                                <label className="font-bold ml-2">Mint and pay by buyer</label><br />
                            </div>

                            <Flex mt={32} sx={{ alignItems: 'center' }}>
                                <Button
                                    disabled={loading}
                                    sx={{ minWidth: 192 }}
                                    onClick={() => onCreate(assetData, preMint)}
                                >
                                    {loading ? statusText : 'Create item'}
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
                                    type="single"
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

export default Single
