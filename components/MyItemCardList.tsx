/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Box, Flex } from 'theme-ui'
import { v4 as uuidv4 } from 'uuid'
import BidCard from './BidCard'
import { useRouter } from 'next/router'

const MyItemCardList = ({ assets }) => {
    const router = useRouter()

    return (
        <Flex mt={18} mx={-10} mb={28} sx={{ flexWrap: 'wrap' }}>
            {assets?.map((item) => (
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
                        name={item.name || 'Unnamed'}
                        image={item.image_url}
                        currency="ETH"
                        price={
                            item.sell_orders?.[0]?.current_price / 1000000000000000000
                            || item.orders?.[0]?.current_price / 1000000000000000000
                            || 0}
                        creator={item.creator}
                        owner={item.owner}
                        collection={item.collection_details}
                        selling={item.sell_orders?.length > 0}
                    />
                </Box>
            ))}
        </Flex>
    )
}

export default MyItemCardList