import { useState } from 'react';
import { ethers, BrowserProvider, parseUnits } from 'ethers';
import { useAccount, useConnect } from 'wagmi';
import IDRX_ABI from '../abi/IDRXabi.json';
import { getContract } from '../abi/contract';


declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface CampaignCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  goal: number;
  pledged: number;
  imageUrl?: string;
}


const IDRX_ADDRESS = '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661'; // Alamat IDRX
const CAMPAIGN_CONTRACT_ADDRESS = '0x01172609ed6DDc5c65F0022152cd9F4c14E7D473'; // Alamat kontrak Crowdfunding

export const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  title,
  description,
  category,
  goal,
  pledged: initialPledged,
  imageUrl,
}) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [pledged, setPledged] = useState(initialPledged);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  useConnect();

  const progress = Math.min((pledged / goal) * 100, 100);

  const handleDonate = async () => {
    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Input Donate Value (> 0)');
      return;
    }

    if (!window.ethereum || !address) {
      alert('Wallet not Connect');
      return;
    }

    setIsLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const idrxContract = new ethers.Contract(IDRX_ADDRESS, IDRX_ABI as any, signer);
      const crowdfundingContract = getContract(signer);

      const amountInWei = parseUnits(donationAmount, 2);

      // Check balance before approving
      const balance = await idrxContract.balanceOf(address);
      if (ethers.toBigInt(balance) < ethers.toBigInt(amountInWei)) {
        alert('Insufficient IDRX balance');
        setIsLoading(false);
        return;
      }


      // 1. Approve IDRX
      const approveTx = await idrxContract.approve(CAMPAIGN_CONTRACT_ADDRESS, amountInWei);
      await approveTx.wait();

      // 2. Donasi ke kampanye
      const donateTx = await crowdfundingContract.donate(id, amountInWei);
      await donateTx.wait();

      setPledged(prev => prev + amount);
      alert(`Successful donation ${amount} IDRX to the campaign "${title}"`);
      setDonationAmount('');
    } catch (error: any) {
      console.error(error);
      alert('Donation failed: ' + (error?.message || error));
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-sm w-full mx-auto">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-55 object-cover"
          onError={() => console.error(`Failed to load image: ${imageUrl}`)}
        />
      )}

      <div className="p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-1 text-blue-300">{category}</p>
        <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>

        <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm mb-2">
          Collected: <span className="font-medium">{pledged}</span> / Target: <span className="font-medium">{goal}</span> IDRX
        </p>

        <input
          type="number"
          min="0"
          step="any"
          value={donationAmount}
          onChange={e => setDonationAmount(e.target.value)}
          className="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter donation amount"
        />
        <button
          onClick={handleDonate}
          disabled={isLoading}
          className={`mt-3 w-full py-2 font-semibold bg-gradient-to-r from-pink-600 to-blue-500 hover:from-pink-700 hover:to-blue-600 rounded transition
            ${isLoading ? ' opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Donating...' : 'Donate'}
        </button>
      </div>
    </div>
  );
};
