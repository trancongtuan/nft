import { useQuery, UseQueryResult } from 'react-query'
import { client } from './client'

export interface CollectionsVariables {
    asset_owner?: string
    // offset?: number
    limit?: number
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
    images: any[]
}

export interface Collection {
    primary_asset_contracts: any[]
    traits: Traits
    stats: Stats
    banner_image_url: string
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
    twitter_username: string
    instagram_username?: any
    wiki_url?: any
    ultcube_featured?: boolean
}

/*
* Backend already removed first layer
*/
export interface CollectionsResponseData {
    collections: Collection[]
}

export const fetchCollections: (
    variables: CollectionsVariables
) => Promise<Collection[]> = (variables) =>
    client
        .get('/collections', {
            params: variables,
        })
        .then((response) => response.data)

export function useGetCollectionsQuery(
    variables: CollectionsVariables,
    initialData?: Collection[]
): UseQueryResult<Collection[], unknown> {
    return useQuery(
        ['collections', ...Object.values(variables)],
        () => fetchCollections(variables),
        {
            initialData,
        }
    )
}
