import { Network, OpenSeaPort } from 'opensea-js'
import { Order, OrderSide } from 'opensea-js/lib/types'
import { updateSingleAsset } from '../queries'

const Web3 = require('web3')
// Live WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
const paymentTokenAddress = '0xc778417e063141139fce010982780140aa0cd5ab'

const CreateSeaport = () => {
    const provider =
        typeof window.web3 !== 'undefined'
            ? window.web3.currentProvider
            : new Web3.providers.HttpProvider(
                'https://rinkeby.infura.io/v3/014909ef8db84165ade6e01f5efb6e74'
            )

    const seaport = new OpenSeaPort(provider, {
        // networkName: Network.Main
        networkName: Network.Rinkeby,
    })

    return seaport
}

const getCurrentAddress = async (): Promise<string> => {
    if (!window.ethereum) throw new Error('Please install MetaMask.')
    let accountAddress = await window.ethereum.enable()
    if (!accountAddress[0]) throw new Error('No account selected.')
    return accountAddress[0]
}

const createSellOrder = async (
    metaData,
    price,
    waitForHighestBid = false,
    expirationTime = 0
): Promise<Order> => {
    // Get Address
    try {
        const accountAddress = await getCurrentAddress()
        const {
            token_id,
            asset_contract: { address: asset_contract_address },
        } = metaData

        const seaport = CreateSeaport()
        const data: any = {
            asset: {
                tokenId: token_id,
                tokenAddress: asset_contract_address,
            },
            accountAddress,
            startAmount: price,
            expirationTime: expirationTime,
            waitForHighestBid,
        }

        if (waitForHighestBid) data.paymentTokenAddress = paymentTokenAddress
        const fixedPriceSellOrder = await seaport.createSellOrder(data)

        return fixedPriceSellOrder
    } catch (e) {
        alert(e.message)
    }
}

const fulfillOrder = async (metaData, acceptBid) => {
    const accountAddress = await getCurrentAddress()
    const {
        token_id,
        asset_contract: { address: asset_contract_address },
    } = metaData
    const seaport = CreateSeaport()

    const order = await seaport.api.getOrder({
        side: acceptBid ? OrderSide.Buy : OrderSide.Sell,
        asset_contract_address,
        token_id,
    })

    const transactionHash = await seaport.fulfillOrder({
        order,
        accountAddress,
    })

    return transactionHash
}

const createBuyOrder = async ({
    tokenAddress,
    tokenId,
    startAmount,
    quantity,
    expirationTime,
}) => {
    const accountAddress = await getCurrentAddress()
    const seaport = CreateSeaport()
    const asset = await seaport.api.getAsset({ tokenAddress, tokenId })
    return seaport.createBuyOrder({
        asset,
        accountAddress,
        startAmount,
        quantity,
        expirationTime,
        paymentTokenAddress,
        sellOrder: asset.orders[0],
    })
}

const cancelOrder = async (tokenAddress, tokenId) => {
    // Get Address
    try {
        const accountAddress = await getCurrentAddress()
        const seaport = CreateSeaport()
        const asset = await seaport.api.getAsset({ tokenAddress, tokenId })
        const result = await seaport.cancelOrder({
            order: asset.orders[0],
            accountAddress,
        })
        return result
    } catch (e) {
        alert(e.message)
    }
}

const getOrder = async (tokenAddress, tokenId, side) => {
    const seaport = CreateSeaport()
    return await seaport.api.getOrders({
        asset_contract_address: tokenAddress,
        token_id: tokenId,
        side: side === 'buy' ? OrderSide.Buy : OrderSide.Sell
    })
}

export { createSellOrder, fulfillOrder, cancelOrder, createBuyOrder, getOrder }
