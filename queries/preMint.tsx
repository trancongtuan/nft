import { client } from './client'

const path = '/pre-mints';

export const preMintRequest: (data: any, address: string) => Promise<any> = (data, address) =>
    client.post(path, { data, creator_address: address }).then((response) => response.data)

export const getPreMintByCreator: (address: string) => Promise<any> = (address) =>
    client.get(`${path}?creator_address_contains=${address}`).then((response) => response.data)

export const findOnePreMint: (id: string) => Promise<any> = (id) =>
    client.get(`${path}/${id}`).then((response) => response.data)

export const setPreMintPrice: (id: string, amount: number) => Promise<any> = (id, amount) =>
    client.put(`${path}/${id}`, { price: amount }).then((response) => response.data)

export const delPreMint: (id: string) => Promise<any> = (id) =>
    client.delete(`${path}/${id}`).then((response) => response.data)
