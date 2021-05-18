import React, { FC, useEffect, useState } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'
import Popover from 'react-popover'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { v4 as uuidv4 } from 'uuid'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import Avatar from '../components/Avatar'
import Selection from '../components/Selection'
import Layout from '../containers/Layout'
import CopyIcon from '../public/assets/images/icons/copy.svg'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import UploadIcon from '../public/assets/images/icons/upload.svg'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import BidCard from '../components/BidCard'
import Tooltip from '../components/Tooltip'
import Popup from '../components/Popup'
import PopupReport from '../components/PopupReport'
import PopupShare from '../components/PopupShare'

const Collection: FC = () => {
    const [showReport, setShowReport] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [counter, setCounter] = useState(0)
    const [showReportPopup, setShowReportPopup] = useState(false)

    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => setCounter(counter - 1), 1000)
            return () => clearInterval(timer)
        }
        return setCounter(0)
    }, [counter])
    return (
        <Layout>
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
            <Box
                mx="auto"
                px={[24, 28, 32]}
                sx={{ maxWidth: 1500, width: '100%' }}
            >
                <Flex sx={{ alignItems: 'center', flexDirection: 'column' }}>
                    <Text
                        mb="8px"
                        sx={{
                            fontSize: 28,
                            lineHeight: '34px',
                            color: 'text',
                            fontWeight: 'heavy',
                        }}
                    >
                        Beeple Round 2 Open Edition
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
                    <Flex color="text">
                        <Button
                            onClick={() => setShowShare(!showShare)}
                            mr={8}
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
                                onClick={() => {
                                    setShowReport(!showReport)
                                }}
                                variant="border"
                                p={0}
                                sx={{ width: 40 }}
                            >
                                <ThreeDos />
                            </Button>
                            <Popup
                                isOpen={showReportPopup}
                                onClose={() => {
                                    setShowReportPopup(false)
                                }}
                                label="Why are you reporting?"
                            >
                                <PopupReport
                                    onClose={() => setShowReportPopup(false)}
                                />
                            </Popup>
                        </Popover>
                    </Flex>
                </Flex>
                <Selection
                    borderBottom
                    items={[
                        { id: '1', label: 'general.on_sale', value: 'On sale' },
                        {
                            id: '2',
                            label: 'general.collectibles',
                            value: 'Collectibles',
                        },
                    ]}
                />
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
            </Box>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Collection
