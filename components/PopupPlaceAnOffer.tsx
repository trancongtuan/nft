import React, { useState, FC } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'

import CustomInput from './CustomInput'

interface Props {
    name
    onConfirm: (offer: string) => void
    loading: boolean
    onClose?: () => void
}

export const PopupPurchase: FC<Props> = ({ name, onConfirm, loading }) => {
    const [offer, setOffer] = useState('')

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
            <Box sx={{ width: '100%' }} mt={3}>
                <CustomInput
                    onChange={(v) => setOffer(v || '')}
                    label="Your offer"
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
            <Box sx={{ width: '100%' }} mt={2}>
                {/* <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Your balance
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0 ETH
                    </Text>
                </Flex> */}
                {/* <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Your bidding balance
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0 ETH
                    </Text>
                </Flex> */}
                {/* <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Service fee
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0.026 ETH
                    </Text>
                </Flex> */}
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
                onClick={() => onConfirm(offer)}
            >
                {loading ? 'Loading...' : 'Create Offer'}
            </Button>
        </Flex>
    )
}

export default PopupPurchase
