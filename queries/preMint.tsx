import { client } from './client'

const path = '/pre-mints';

export const preMintRequest: (data: any, address: string) => Promise<any> = (data, address) =>
    client.post(path, { data, creator_address: address }).then((response) => response.data)

export const getPreMintByCreator: (address: string) => Promise<any> = (address) =>
    client.get(path, { data: { creator_address: address } }).then((response) => response.data)
