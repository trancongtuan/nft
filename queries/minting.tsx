import { client } from './client'

const API_URL = process.env.NEXT_PUBLIC_ALCHEMY_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const singleContract = require("../utils/contracts/single.json");
const multiContract = require("../utils/contracts/multi.json");
const singleMintingContractAddress = "0x8277885126bB6d5d5ba6A9ebb43Df35d7E31C807";
const multiMintingContractAddress = "0x50277b27624751a1FDe7c473BD61f3e9A9C2e0D2";

const singleContractConnection = new web3.eth.Contract(singleContract.abi, singleMintingContractAddress);
const multiContractConncetion = new web3.eth.Contract(multiContract.abi, multiMintingContractAddress);

const path = '/minters';

const uploadJsonToUltcube: (data: any) => Promise<{ token_id: string, data: any }> = (data) => {
  return client.post(`${path}`, data)
}

const uploadJsonToIPFS: (data: any) => Promise<{ IpfsHash: string }> = (data) => {
  return client.post(`${path}/ipfs?type=json`, data).then((response) => response.data)
}

const uploadImageToIPFS: (files: File[]) => Promise<{ IpfsHash: string }> = (files) => {
  const data = new FormData()
  data.append('files.image', files[0])
  data.append('data', 'null')

  return client.post(`${path}/ipfs?type=files`, data).then((response) => response.data)
}

const mint = async (attributesJsonUrl: string) => {
  if (!window.ethereum) throw new Error('Please install MetaMask.')
  const creatorKey = (await window.ethereum.enable())[0]
  if (!creatorKey) throw new Error('No account selected.')
  const nonce = await web3.eth.getTransactionCount(creatorKey, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: creatorKey,
    to: singleMintingContractAddress,
    nonce: `${nonce}`,
    gas: '500000',
    data: singleContractConnection.methods.mintNFT(creatorKey, attributesJsonUrl).encodeABI(),
  }

  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx],
  });
  
  return txHash;
}

const mintAndPayCreator = async (attributesJsonUrl: string, creatorAddress: string, priceInEth: number) => {
  if (!window.ethereum) throw new Error('Please install MetaMask.')
  const creatorKey = (await window.ethereum.enable())[0]
  if (!creatorKey) throw new Error('No account selected.')
  const nonce = await web3.eth.getTransactionCount(creatorKey, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: creatorKey,
    to: singleMintingContractAddress,
    nonce: `${nonce}`,
    gas: '500000',
    data: singleContractConnection.methods.mintNFTAndPayCreator(creatorKey, attributesJsonUrl, creatorAddress).encodeABI(),
    value: (priceInEth * 10 ** 18).toString(16)
  }

  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx],
  });
  
  return txHash;
}

const mintMultiple = async (amount: number) => {
  if (!window.ethereum) throw new Error('Please install MetaMask.')
  const creatorKey = (await window.ethereum.enable())[0]
  if (!creatorKey) throw new Error('No account selected.')
  const nonce = await web3.eth.getTransactionCount(creatorKey, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: creatorKey,
    to: multiMintingContractAddress,
    nonce: `${nonce}`,
    gas: '500000',
    data: multiContractConncetion.methods.bakePizza(amount).encodeABI(),
  }

  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx],
  });
  
  return txHash;
}

export { uploadJsonToUltcube, uploadJsonToIPFS, uploadImageToIPFS, mint, mintMultiple, mintAndPayCreator }