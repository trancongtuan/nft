import { useQuery, UseQueryResult } from 'react-query'
import { client } from './client'
import { Collection } from '../types/model';

export interface CollectionsVariables {
    asset_owner?: string
    limit?: number
    _limit?: number
    _start?: number
    slug?: string
    name_contains?: string
}

/*
 * Backend already removed first layer
 */
export interface CollectionsResponseData {
    collections: Collection[]
}

export interface CollectionsFetchVariables {
    asset_owner?: string
    contract_address?: string
}

export const fetchCollections: (
    variables: CollectionsVariables
) => Promise<Collection[]> = (variables) =>
    client
        .get('/collections', {
            params: variables,
        })
        .then((response) => response.data)

export const fetchCollectionFromOpensea: (variables: CollectionsFetchVariables) => Promise<Collection[]> = async (variables) => {
    return client
        .get('/collections/fetch', {
            params: variables,
        })
        .then((response) => response.data)
}

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
