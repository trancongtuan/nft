import { Box, Button, Flex, Grid, Input, Text, Image } from 'theme-ui'
import React, { ChangeEventHandler, FC, useRef, useState } from 'react'
import Popover from 'react-popover'
import { useRouter } from 'next/router'
import Layout from '../../containers/Layout'
import ToggleButton from '../../components/ToggleButton'
import PriceIcon from '../../public/assets/images/icons/price.svg'
import TimedIcon from '../../public/assets/images/icons/timed.svg'
import UnlimitedIcon from '../../public/assets/images/icons/unlimited.svg'
import CloseIcon from '../../public/assets/images/icons/close.svg'
import DropdownIcon from '../../public/assets/images/icons/drop-down.svg'
import HelpIcon from '../../public/assets/images/icons/help.svg'
import BackIcon from '../../public/assets/images/icons/back.svg'
import BidCard from '../../components/BidCard'
import CustomInput from '../../components/CustomInput'
import Tooltip from '../../components/Tooltip'

const tooltipItems = [
    {
        id: 1,
        label: 'Label 1',
    },
    {
        id: 2,
        label: 'Label 2',
    },
    {
        id: 3,
        label: 'Label 3',
    },
]

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
    const router = useRouter()
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
                                            }}
                                            onClick={() => setFile(null)}
                                        >
                                            <CloseIcon />
                                        </Button>
                                        <Image
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
                                        {showMarketplace
                                            ? `Enter price to allow users instantly
                                        purchase your NFT`
                                            : `Put your new NFT on Rarible's marketplace`}
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
                                    <Grid
                                        gap={16}
                                        width={1 / 3}
                                        mt={16}
                                        mb={40}
                                    >
                                        <Flex
                                            px={20}
                                            sx={{
                                                flex: 1,
                                                height: 140,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: 2,
                                                borderStyle: 'solid',
                                                borderColor: 'borderColor',
                                                borderRadius: 16,
                                                ':hover': {
                                                    borderColor:
                                                        'borderHoverColor',
                                                },
                                                flexDirection: 'column',
                                                cursor: 'pointer',
                                            }}
                                            color="text"
                                        >
                                            <PriceIcon />
                                            <Text
                                                mt={8}
                                                sx={{
                                                    maxWidth: 60,
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    fontWeight: 900,
                                                }}
                                            >
                                                Fixed price
                                            </Text>
                                        </Flex>
                                        <Flex
                                            px={20}
                                            sx={{
                                                flex: 1,
                                                height: 140,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: 2,
                                                borderStyle: 'solid',
                                                borderColor: 'borderColor',
                                                borderRadius: 16,
                                                ':hover': {
                                                    borderColor:
                                                        'borderHoverColor',
                                                },
                                                flexDirection: 'column',
                                                cursor: 'pointer',
                                            }}
                                            color="text"
                                        >
                                            <TimedIcon />
                                            <Text
                                                mt={8}
                                                sx={{
                                                    maxWidth: 60,
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    fontWeight: 900,
                                                }}
                                            >
                                                Timed auction
                                            </Text>
                                        </Flex>
                                        <Flex
                                            px={20}
                                            sx={{
                                                flex: 1,
                                                height: 140,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: 2,
                                                borderStyle: 'solid',
                                                borderColor: 'borderColor',
                                                borderRadius: 16,
                                                ':hover': {
                                                    borderColor:
                                                        'borderHoverColor',
                                                },
                                                flexDirection: 'column',
                                                cursor: 'pointer',
                                            }}
                                            color="text"
                                        >
                                            <UnlimitedIcon />
                                            <Text
                                                mt={8}
                                                sx={{
                                                    maxWidth: 60,
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    fontWeight: 900,
                                                }}
                                            >
                                                Unlimited auction
                                            </Text>
                                        </Flex>
                                    </Grid>
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
                                                    setShowTypePrice(false)
                                                }
                                                isOpen={showTypePrice}
                                                body={
                                                    <Tooltip
                                                        items={tooltipItems}
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
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        setShowTypePrice(true)
                                                    }
                                                >
                                                    <Text
                                                        mr={8}
                                                        sx={{
                                                            fontSize: 14,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        ETH
                                                    </Text>
                                                    <DropdownIcon />
                                                </Flex>
                                            </Popover>
                                        }
                                    />
                                    <Text
                                        color="textSecondary"
                                        sx={{
                                            fontSize: 15,
                                            fontWeight: 500,
                                            lineHeight: '20.7px',
                                        }}
                                    >
                                        Service fee{' '}
                                        <Text color="text">2.5%</Text>
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
                                        <Text color="text">0 ETH </Text>
                                        $0.00
                                    </Text>
                                </>
                            )}
                            <Flex mt={40} sx={{ width: '100%' }}>
                                <Flex
                                    sx={{
                                        flexDirection: 'column',
                                        width: '100%',
                                    }}
                                >
                                    <Text
                                        mb="4px"
                                        color="primary"
                                        sx={{ fontSize: 17, fontWeight: 900 }}
                                    >
                                        Unlock once purchased
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
                                <Flex
                                    px={20}
                                    sx={{
                                        flex: 1,
                                        height: 140,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 2,
                                        borderStyle: 'solid',
                                        borderColor: 'borderColor',
                                        borderRadius: 16,
                                        ':hover': {
                                            borderColor: 'borderHoverColor',
                                        },
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                    }}
                                    color="text"
                                >
                                    <PriceIcon />
                                    <Text
                                        mt={8}
                                        sx={{
                                            maxWidth: 60,
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontWeight: 900,
                                        }}
                                    >
                                        Fixed price
                                    </Text>
                                </Flex>
                                <Flex
                                    px={20}
                                    sx={{
                                        flex: 1,
                                        height: 140,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 2,
                                        borderStyle: 'solid',
                                        borderColor: 'borderColor',
                                        borderRadius: 16,
                                        ':hover': {
                                            borderColor: 'borderHoverColor',
                                        },
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                    }}
                                    color="text"
                                >
                                    <TimedIcon />
                                    <Text
                                        mt={8}
                                        sx={{
                                            maxWidth: 60,
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontWeight: 900,
                                        }}
                                    >
                                        Timed auction
                                    </Text>
                                </Flex>
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
