import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://api.opensea.io/api/v1',
    timeout: 15000,
})

export const client = axiosInstance
