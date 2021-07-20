import { useQuery, UseQueryResult } from 'react-query'
import { testNetClient } from './client'

interface AssetVariables {
    account_address?: string
    asset_contract_address?: string
    token_id?: string
}

export interface AssetContract {
    address: string
    asset_contract_type: string
    created_date: Date
    name: string
    nft_version?: any
    opensea_version: string
    owner: number
    schema_name: string
    symbol: string
    total_supply?: any
    description?: any
    external_link?: any
    image_url?: any
    default_to_fiat: boolean
    dev_buyer_fee_basis_points: number
    dev_seller_fee_basis_points: number
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: number
    opensea_seller_fee_basis_points: number
    buyer_fee_basis_points: number
    seller_fee_basis_points: number
    payout_address?: any
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

export interface PaymentToken {
    id: number
    symbol: string
    address: string
    image_url: string
    name: string
    decimals: number
    eth_price: number
    usd_price: number
}

export interface Traits {}

export interface Stats {
    seven_day_volume: number
    total_volume: number
    seven_day_change: number
    seven_day_sales: number
    total_sales: number
    total_supply: number
    count: number
    num_owners: number
    seven_day_average_price: number
    average_price: number
    num_reports: number
    market_cap: number
}

export interface DisplayData {
    card_display_style: string
}

export interface Collection {
    payment_tokens: PaymentToken[]
    primary_asset_contracts: any[]
    traits: Traits
    stats: Stats
    banner_image_url?: any
    chat_url?: any
    created_date: Date
    default_to_fiat: boolean
    description: string
    dev_buyer_fee_basis_points: string
    dev_seller_fee_basis_points: string
    discord_url?: any
    display_data: DisplayData
    external_url?: any
    featured: boolean
    featured_image_url?: any
    hidden: boolean
    safelist_request_status: string
    image_url: string
    is_subject_to_whitelist: boolean
    large_image_url?: any
    medium_username?: any
    name: string
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: string
    opensea_seller_fee_basis_points: string
    payout_address: string
    require_email: boolean
    short_description?: any
    slug: string
    telegram_url?: any
    twitter_username?: any
    instagram_username?: any
    wiki_url?: any
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

export interface User3 {
    username: string
}

export interface Owner2 {
    user: User3
    profile_img_url: string
    address: string
    config: string
    discord_id: string
}

export interface TopOwnership {
    owner: Owner2
    quantity: string
}

export interface AssetResponseData {
    id: number
    token_id: string
    num_sales: number
    background_color?: any
    image_url: string
    image_preview_url: string
    image_thumbnail_url: string
    image_original_url?: any
    animation_url?: any
    animation_original_url?: any
    name: string
    description: string
    external_link?: any
    asset_contract: AssetContract
    owner: Owner
    permalink: string
    collection: Collection
    decimals?: any
    token_metadata?: any
    sell_orders?: any
    creator: Creator
    traits: any[]
    last_sale?: any
    top_bid?: any
    listing_date?: any
    is_presale: boolean
    transfer_fee_payment_token?: any
    transfer_fee?: any
    related_assets: any[]
    orders: any[]
    auctions: any[]
    supports_wyvern: boolean
    top_ownerships: TopOwnership[]
    ownership?: any
    highest_buyer_commitment?: any
}

export const fetchAsset: (
    variables: AssetVariables
) => Promise<AssetResponseData> = (variables) =>
    testNetClient
        .get(
            `/asset/${variables.asset_contract_address}/${variables.token_id}`,
            {
                params: {
                    account_address: variables.account_address,
                },
            }
        )
        .then((response) => response.data)

export function useGetSingleAssetQuery(
    variables: AssetVariables,
    initialData?: AssetResponseData
): UseQueryResult<AssetResponseData, unknown> {
    return useQuery(
        ['asset', ...Object.values(variables)],
        () => fetchAsset(variables),
        {
            initialData,
        }
    )
}
