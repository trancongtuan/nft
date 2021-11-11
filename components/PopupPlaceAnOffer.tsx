import React, { useState, FC } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'

import CustomInput from './CustomInput'

interface Props {
    name
    onConfirm: (offer: string, timeAuction?: boolean, duration?: number) => void
    loading: boolean
    onClose?: () => void
    allowTimeAuction: boolean
}

export const PopupPurchase: FC<Props> = ({ name, onConfirm, loading, allowTimeAuction = true }) => {
    const [offer, setOffer] = useState('')
    const [duration, setDuration] = useState(3)
    const [timeAuction, setTimeAuction] = useState(false)

    return (
        <Flex
            sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Text sx={{ color: 'text' }}>
                You are about to place a offer for {name}
                {/* <b>CRYPTOxPINS #25 Crypto Boy</b> */}
            </Text>
            {
                allowTimeAuction &&
                    <Box sx={{ width: '100%' }} mt={0}>
                        <div className="mt-6">
                            <input type="checkbox" id="pre-mint" name="pre-mint" value="Bike" onChange={(e) => setTimeAuction(e.target.checked)} />
                            <label className="font-bold ml-2">Time Auction</label><br />
                        </div>
                    </Box>
            }
            <Box sx={{ width: '100%' }} mt={3}>
                <CustomInput
                    onChange={(v) => setOffer(v || '')}
                    label={timeAuction ? 'Starting Price' : 'Amount'}
                    value={offer}
                    placeholder="Enter offer"
                    staticRight="ETH"
                />
            </Box>
            <Box sx={{ width: '100%' }} mt={3}>
                <CustomInput
                    label="Enter quantity"
                    optionLabel="1 available"
                    value="1"
                    placeholder="Enter quantity"
                />
            </Box>
            {
                timeAuction &&
                    <Box sx={{ width: '100%' }} mt={3}>
                        <CustomInput
                            onChange={(v) => setDuration(parseInt(v) || 0)}
                            label="Duration"
                            optionLabel="day"
                            value={`${duration}`}
                            placeholder="Duration"
                        />
                    </Box>
            }
            <Box sx={{ width: '100%' }} mt={2}>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        You will get
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        {parseFloat(offer) * 0.975 || 0} ETH
                    </Text>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        (- 2.5% Fee)
                    </Text>
                </Flex>
            </Box>
            <Button
                disabled={loading}
                variant="primary"
                mr={10}
                mt={3}
                sx={{ width: '100%', height: '40px' }}
                onClick={() => onConfirm(offer, timeAuction, duration)}
            >
                {loading ? 'Loading...' : 'Create Offer'}
            </Button>
        </Flex>
    )
}

export default PopupPurchase
