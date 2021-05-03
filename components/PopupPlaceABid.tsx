import { Box, Button, Flex, Text } from 'theme-ui'
import React, { FC } from 'react'
import CustomInput from './CustomInput'

export const PopupPurchase: FC = () => {
    return (
        <Flex
            sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Text sx={{ color: 'text' }}>
                You are about to place a bid for{' '}
                <b>CRYPTOxPINS #25 Crypto Boy</b>
            </Text>
            <Box sx={{ width: '100%' }} mt={3}>
                <CustomInput
                    label="Your bid"
                    value=""
                    placeholder="Enter bid"
                    onChange={(value) => {
                        console.log(value)
                    }}
                    staticRight="WETH"
                />
            </Box>
            <Box sx={{ width: '100%' }} mt={3}>
                <CustomInput
                    label="Enter quantity"
                    optionLabel="69 available"
                    value="1"
                    placeholder="Enter quantity"
                    onChange={(value) => {
                        console.log(value)
                    }}
                />
            </Box>
            <Box sx={{ width: '100%' }} mt={2}>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Your balance
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 600,
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0 ETH
                    </Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Your bidding balance
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 600,
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0 WETH
                    </Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Service fee
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 600,
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0.026 WETH
                    </Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        You will pay
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 600,
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0.026 WETH
                    </Text>
                </Flex>
            </Box>
            <Button
                variant="primary"
                mr={10}
                mt={3}
                sx={{ width: '100%', height: '40px' }}
            >
                Place a bid
            </Button>
        </Flex>
    )
}

export default PopupPurchase
