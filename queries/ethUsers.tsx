import { client } from './client'
import { Asset } from './assets'

export interface EthUser {
    id: string
    display_name: string
    custom_url: string
    twitter: string
    email: string
    bio: string
    website: string
    address: string
    profile_pic: { url: string }
    profile_banner: { url: string }
    balance?: number
}

interface EthUserCreater {
    display_name?: string
    custom_url?: string
    twitter?: string
    email?: string
    bio?: string
    website?: string
    address: string
}

interface fetchUserRequest {
    _start?: number
    _limit?: number
    _sort?: string
    address?: string
    address_contains?: string
    display_name_contains?: string
}

export const fetchUsers: (
    variables?: fetchUserRequest
) => Promise<[EthUser]> = (variables) => {
    return client
        .get('/eth-users', {
            params: variables,
        })
        .then((response) => response.data)
}

export const updateUser: (id: string, data: EthUser) => Promise<EthUser> = (
    id,
    data
) => client.put(`/eth-users/${id}`, data).then((response) => response.data)

export const createUser: (data: EthUserCreater) => Promise<EthUser> = (data) =>
    client.post(`/eth-users`, data).then((response) => response.data)

export const updateUserAssets: (id: string) => Promise<Asset[]> = (id) =>
    client.put(`/eth-users/${id}/assets`).then((response) => response.data)
