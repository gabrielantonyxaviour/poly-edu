import { NFTStorage } from "nft.storage";

const token = process.env.REACT_APP_NFT_STORAGE_API_KEY;

export const storageClient = new NFTStorage({ token });
