import { useQuery, UseQueryResult } from 'react-query'
import { client } from './client'

export interface EthUser {
    id: String;
    display_name: String
    custom_url: String
    twitter: String
    email: String
    bio: String
    website: String
    address: String
}

interface fetchUserRequest {
    _start?: number
    _limit?: number
    address?: string
}

export const fetchUsers: (data?: fetchUserRequest) => Promise<EthUser> = (data) => {
    const url = data.address ? `/eth-users?address=${data.address}` : '/eth-users';

    return client
        .get(url)
        .then((response) => response.data)
}

export const updateUser: (id: String, data: EthUser) => Promise<EthUser> = (id, data) =>
    client
        .put(`/eth-users/${id}`, data)
        .then((response) => response.data)

export const createUser: (data: EthUser) => Promise<EthUser> = (data) =>
    client
        .post(`/eth-users`, data)
        .then((response) => response.data)
