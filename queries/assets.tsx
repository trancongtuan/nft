/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    useInfiniteQuery,
    UseInfiniteQueryResult,
    InfiniteData,
    useQuery,
} from 'react-query'
import { client } from './client'
import { Collection } from './asset'
export interface AssetContract {
    address: string
    asset_contract_type: string
    created_date: Date
    name: string
    nft_version?: any
    opensea_version: string
    owner?: number
    schema_name: string
    symbol: string
    total_supply: string
    description: string
    external_link: string
    image_url: string
    default_to_fiat: boolean
    dev_buyer_fee_basis_points: number
    dev_seller_fee_basis_points: number
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: number
    opensea_seller_fee_basis_points: number
    buyer_fee_basis_points: number
    seller_fee_basis_points: number
    payout_address: string
}

export interface User {
    username: string
}

export interface Owner {
    user: User
    profile_img_url: string
    address: string
    config: string
    discord_id: string
}

export interface DisplayData {
    card_display_style: string
    images: any[]
}

export interface Asset2 {
    id: string
    address: string
    quantity: string
}

export interface Metadata {
    asset: Asset2
    schema: string
}

export interface Maker {
    user: number
    profile_img_url: string
    address: string
    config: string
    discord_id: string
}

export interface Taker {
    user: number
    profile_img_url: string
    address: string
    config: string
    discord_id: string
}

export interface FeeRecipient {
    user: number
    profile_img_url: string
    address: string
    config: string
    discord_id: string
}

export interface PaymentTokenContract {
    id: number
    symbol: string
    address: string
    image_url: string
    name: string
    decimals: number
    eth_price: string
    usd_price: string
}

export interface SellOrder {
    created_date: Date
    closing_date?: Date
    closing_extendable: boolean
    expiration_time: number
    listing_time: number
    order_hash: string
    metadata: Metadata
    exchange: string
    maker: Maker
    taker: Taker
    current_price: number
    current_bounty: string
    bounty_multiple: string
    maker_relayer_fee: string
    taker_relayer_fee: string
    maker_protocol_fee: string
    taker_protocol_fee: string
    maker_referrer_fee: string
    fee_recipient: FeeRecipient
    fee_method: number
    side: number
    sale_kind: number
    target: string
    how_to_call: number
    calldata: string
    replacement_pattern: string
    static_target: string
    static_extradata: string
    payment_token: string
    payment_token_contract: PaymentTokenContract
    base_price: string
    extra: string
    quantity: string
    salt: string
    v?: number
    r: string
    s: string
    approved_on_chain: boolean
    cancelled: boolean
    finalized: boolean
    marked_invalid: boolean
    prefixed_hash: string
}

export interface User2 {
    username: string
}

export interface Creator {
    user: User2
    profile_img_url: string
    address: string
    config: string
    discord_id: string
}

export interface Trait {
    trait_type: string
    value: any
    display_type: string
    max_value: string
    trait_count: number
    order?: any
}

export interface Asset {
    id: number
    token_id: string
    num_sales: number
    background_color: string
    image_url: string
    image_preview_url: string
    image_thumbnail_url: string
    image_original_url: string
    animation_url: string
    animation_original_url: string
    name: string
    description: string
    external_link: string
    asset_contract: AssetContract
    owner: Owner
    permalink: string
    collection_details: Collection
    collection: Collection
    decimals?: any
    token_metadata: string
    sell_orders: SellOrder[]
    creator: Creator
    traits: Trait[]
    last_sale?: any
    top_bid?: any
    listing_date?: any
    is_presale: boolean
    transfer_fee_payment_token?: any
    transfer_fee?: any
    ultcube_hot_bids?: boolean
    owner_address?: string
    asset_type?: { name: string }
    orders: {
        current_price: number
    }[]
    top_ownerships: {
        owner: {
            user: {
                username: string,
            }
            address: string,
            config: string,
            profile_img_url: string
        },
        quantity: number
    }[]
}

/*
 * Backend removed first layer
 */
export interface AssetsResponseData {
    assets: Asset[]
}

export const fetchAssets: ({
    _start,
    _limit,
    ultcube_hot_bids,
    ultcube_live_auction,
    asset_type,
    collection_slug,
    owner_address_contains,
    asset_contract_address,
    token_id,
    name_contains,
}: {
    _start?: number
    _limit?: number
    ultcube_hot_bids?: boolean
    ultcube_live_auction?: boolean
    ultcube_explore?: boolean
    asset_type?: string
    collection_slug?: string
    owner_address_contains?: string
    asset_contract_address?: string
    token_id?: string
    name_contains?: string
}) => Promise<Asset[]> = (_params) => {
    const params = { ..._params }
    if (!params.asset_type || params.asset_type === 'all')
        delete params.asset_type
    if (!params.collection_slug) delete params.collection_slug
    if (!params.owner_address_contains) delete params.owner_address_contains
    if (!params.asset_contract_address) delete params.asset_contract_address
    if (!params.token_id) delete params.token_id
    if (!params.ultcube_live_auction) delete params.ultcube_live_auction
    if (!params.name_contains) delete params.name_contains;

    return client.get('/assets', { params }).then((response) => response.data)
}

export function useGetAssetsInfiniteQuery(
    assetType: string,
    initialData?: InfiniteData<Asset[]>
): UseInfiniteQueryResult<Asset[], unknown> {
    return useInfiniteQuery(
        ['assets', assetType],
        ({ pageParam }) =>
            fetchAssets({
                ...pageParam,
                asset_type: assetType,
                ultcube_explore: true,
            }),
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage?.length === 0) return undefined
                return { _start: pages.length * 10, _limit: 10 }
            },
            initialData,
        }
    )
}

export const fetchAssetTypes: () => Promise<any> = () =>
    client.get(`/asset-types`).then((response) => response.data)

export function useAssetTypeQuery() {
    return useQuery(['assetType'], () => fetchAssetTypes())
}

export const updateSingleAsset = (asset_contract_address: string, token_id: string, owner?: string) => {
    let url = `/assets/${asset_contract_address}/${token_id}`
    if (owner) url += `?owner=${owner}`
    
    return client
        .put(url)
        .then((response) => response.data)
}

export const createAsset = (data) => {
    return client.post(`/assets`, data).then((response) => response.data)
}
