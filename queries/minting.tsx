import { client } from './client'

const API_URL = process.env.NEXT_PUBLIC_ALCHEMY_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../utils/contracts/UltcubeNFTCollection.json");
const contractAddress = "0xDf990Bbf74ed828d68992F9D5CFdC48932E28EE3";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const uploadJsonToIPFS: (data: any) => Promise<{ IpfsHash: string }> = (data) => {
  return client.post(`/minter/ipfs?type=json`, data).then((response) => response.data)
}

const uploadImageToIPFS: (files: File[]) => Promise<{ IpfsHash: string }> = (files) => {
  const data = new FormData()
  data.append('files.image', files[0])
  data.append('data', 'null')

  return client.post(`/minter/ipfs?type=files`, data).then((response) => response.data)
}

const mint = async (attributesJsonUrl: string) => {
  if (!window.ethereum) throw new Error('Please install MetaMask.')
  const creatorKey = (await window.ethereum.enable())[0]
  if (!creatorKey) throw new Error('No account selected.')
  const nonce = await web3.eth.getTransactionCount(creatorKey, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: creatorKey,
    to: contractAddress,
    nonce: `${nonce}`,
    gas: '500000',
    data: nftContract.methods.mintNFT(creatorKey, attributesJsonUrl).encodeABI(),
  }

  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx],
  });
  
  return txHash;
}

export { uploadJsonToIPFS, uploadImageToIPFS, mint }