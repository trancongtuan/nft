import {
    useInfiniteQuery,
    UseInfiniteQueryResult,
    InfiniteData,
} from 'react-query'
import { client } from './client'

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

export interface Collection {
    banner_image_url: string
    chat_url?: any
    created_date: Date
    default_to_fiat: boolean
    description: string
    dev_buyer_fee_basis_points: string
    dev_seller_fee_basis_points: string
    discord_url: string
    display_data: DisplayData
    external_url: string
    featured: boolean
    featured_image_url: string
    hidden: boolean
    safelist_request_status: string
    image_url: string
    is_subject_to_whitelist: boolean
    large_image_url: string
    medium_username: string
    name: string
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: string
    opensea_seller_fee_basis_points: string
    payout_address: string
    require_email: boolean
    short_description: string
    slug: string
    telegram_url: string
    twitter_username: string
    instagram_username?: any
    wiki_url?: any
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
    current_price: string
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
}

/*
* Backend removed first layer
*/ 
export interface AssetsResponseData {
    assets: Asset[]
}

export const fetchAssets: ({
    pageParam,
}: {
    pageParam?: number
}) => Promise<Asset[]> = ({ pageParam = 0 }) =>
    client
        .get('/assets', {
            params: {
                // offset: pageParam,
                // limit: 15,
            },
        })
        .then((response) => response.data)

export function useGetAssetsInfiniteQuery(
    initialData?: InfiniteData<Asset[]>
): UseInfiniteQueryResult<Asset[], unknown> {
    return useInfiniteQuery('assets', fetchAssets, {
        getNextPageParam: (lastPage, pages) => {
            // return lastPage.assets.length === 15 ? pages.length * 15 : undefined
            return undefined;
        },
        initialData,
    })
}
