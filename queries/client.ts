import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_ALCHEMY_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
})

const axiosTestNetInstance = axios.create({
    baseURL: 'https://testnets-api.opensea.io/api/v1',
    timeout: 15000,
})

export const client = axiosInstance
export const testNetClient = axiosTestNetInstance
