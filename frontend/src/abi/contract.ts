import { ethers } from 'ethers';
import Crowdfunding from './Crowdfunding.json';

const CROWDFUNDING_ADDRESS = '0x01172609ed6DDc5c65F0022152cd9F4c14E7D473'; // ganti dengan address kontrak

export function getContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(CROWDFUNDING_ADDRESS, Crowdfunding ?? Crowdfunding, signerOrProvider);
}
