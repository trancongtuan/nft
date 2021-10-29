import React, { FC, useEffect, useState } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Popover from 'react-popover'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { InfiniteData } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useTranslation } from 'react-i18next'
import Avatar from '../../components/Avatar'
import Selection from '../../components/Selection'
import Layout from '../../containers/Layout'
import CopyIcon from '../../public/assets/images/icons/copy.svg'
import CheckedIcon from '../../public/assets/images/icons/checked.svg'
import UploadIcon from '../../public/assets/images/icons/upload.svg'
import ThreeDos from '../../public/assets/images/icons/threedos.svg'
import BidCard from '../../components/BidCard'
import Tooltip from '../../components/Tooltip'
import Popup from '../../components/Popup'
import PopupReport from '../../components/PopupReport'
import PopupShare from '../../components/PopupShare'
import { Asset, fetchAssets } from '../../queries'
import { fetchCollections } from '../../queries/collections'
import { Collection as TCollection } from '../../types/model'
import Error from '../_error';

export const getServerSideProps: GetServerSideProps<{
    collection: TCollection
    assets: InfiniteData<Asset[]> // TODO: Change to correct type
}> = async (context) => {
    const { params, locale } = context
    const assets = await fetchAssets({
        _start: 0,
        _limit: 100,
        collection_slug: `${params.slug}`,
    })
    const collections = await fetchCollections({ slug: `${params.slug}` })

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
            collection: collections?.[0] || null,
            assets: {
                pages: [assets],
                pageParams: [{ _start: 0, _limit: 10 }],
            },
        },
    }
}

const Collection: FC<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ collection, assets }) => {
    const { t } = useTranslation('common')
    const router = useRouter()
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

    if (collection === null) {
        return (<Error statusCode={404} message="Collection Not Found" />)
    }

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
                        backgroundImage: `url(${collection.featured_image_url})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                />
                <Box sx={{ position: 'absolute', bottom: -30 }}>
                    <Avatar src={collection.image_url} size="xl" verified />
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
                        {collection.name}
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
                            {collection.primary_asset_contracts?.[0]?.address ||
                                ''}
                        </Text>
                        <CopyToClipboard
                            onCopy={() => setCounter(2)}
                            text={collection.primary_asset_contracts?.[0]?.address || ''}
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
                            label={t("product.share_this_nft")}
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
                <Flex mt={18} mx={-10} mb={28} sx={{ flexWrap: 'wrap' }}>
                    {assets.pages[0].map((item) => (
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
                            {console.log(item)}
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
                                price={
                                    item.sell_orders?.[0]?.current_price / 1000000000000000000
                                    || item.orders?.[0]?.current_price / 1000000000000000000
                                    ||  0}
                                creator={item.creator}
                                owner={item.owner}
                                collection={item.collection_details}
                            />
                        </Box>
                    ))}
                </Flex>
            </Box>
        </Layout>
    )
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//     props: {
//         ...(await serverSideTranslations(locale, ['common', 'footer'])),
//     },
// })

export default Collection
