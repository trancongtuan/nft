import { client } from './client'

const path = '/pre-mints';

export const preMintRequest: (data: any, address: string) => Promise<any> = (data, address) =>
    client.post(path, { data, eth_User: address }).then((response) => response.data)

