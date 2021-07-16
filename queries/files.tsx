import { useQuery, UseQueryResult } from 'react-query'
import { client } from './client'

export const uploadFile: (files: File[]) => Promise<boolean> = (files) => {
  const data = new FormData();  
  files.forEach((file) => data.append('files', file));

console.log('running uplod file')

  return client
        .post(`/upload`, data)
        .then((response) => response.data)
}