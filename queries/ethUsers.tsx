import { useQuery, UseQueryResult } from 'react-query'
import { client } from './client'

export interface EthUser {
    id: string;
    display_name: string
    custom_url: string
    twitter: string
    email: string
    bio: string
    website: string
    address: string
    profile_pic: { url: string }
}

interface EthUserCreater {
    display_name?: String
    custom_url?: String
    twitter?: String
    email?: String
    bio?: String
    website?: String
    address: String
}

interface fetchUserRequest {
    _start?: number
    _limit?: number
    _sort?: string
    address?: string
}

export const fetchUsers: (variables?: fetchUserRequest) => Promise<[EthUser]> = (variables) => {
    return client
        .get('/eth-users', {
            params: variables,
        })
        .then((response) => response.data)
}

export const updateUser: (id: String, data: EthUser) => Promise<EthUser> = (id, data) =>
    client
        .put(`/eth-users/${id}`, data)
        .then((response) => response.data)

export const createUser: (data: EthUserCreater) => Promise<EthUser> = (data) =>
    client
        .post(`/eth-users`, data)
        .then((response) => response.data)
