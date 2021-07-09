import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://api.ultcube.scc.sh',
    // baseURL: 'https://testnets-api.opensea.io/api/v1',
    timeout: 15000,
})

export const client = axiosInstance
