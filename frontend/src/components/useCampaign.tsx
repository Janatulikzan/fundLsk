// hooks/useCampaigns.ts
import { useEffect, useState } from 'react';
import { BrowserProvider, formatUnits } from 'ethers';
import { getContract } from '../abi/contract';
import type { CampaignCardProps } from '../components/CampaignCard';
// @ts-ignore
import Crowdfunding from '../abi/Crowdfunding.json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!window.ethereum) return;

      const provider = new BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      const contract = getContract(provider);

      try {
        const count = await contract.campaignCount();
        const campaignsArr = [];
        for (let i = 0; i < count; i++) {

          const c = await contract.campaigns(i);
          campaignsArr.push({
            id: i,
            title: c.title,
            description: c.description,
            category: c.category,
            imageUrl: c.image,
            goal: parseFloat(formatUnits(c.goal, 2)),
            pledged: parseFloat(formatUnits(c.fundsRaised, 2)),
          });
        }
        setCampaigns(campaignsArr);
      } catch (err) {
        console.error('Campaign failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);


  return { campaigns, loading, error: null };
};
