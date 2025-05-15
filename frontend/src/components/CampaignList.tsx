import React, { useState, useMemo } from 'react';
import { CampaignCard } from './CampaignCard';
import { useCampaigns } from './useCampaign';

interface Campaign {
  id: number;
  title: string;
  description: string;
  category: string;
  goal: number;
  pledged: number;
  imageUrl?: string;
}

const categories = ['All', 'Education', 'Health', 'IoT', 'Blockchain', 'etc.'];

export const CampaignList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { campaigns, loading, error } = useCampaigns() as {
    campaigns: Campaign[] | undefined;
    loading: boolean;
    error: any;
  };

  // Pastikan campaign selalu memiliki nilai default
  const campaignData = campaigns || [];

  const filteredCampaigns = useMemo(() => {
    if (!campaigns) return [];

    const lowerSearch = search.toLowerCase();

    return campaignData.
    filter((campaign) => {
      const matchesCategory =
        selectedCategory === 'All' || campaign.category === selectedCategory;
      const matchesSearch =
        campaign.title.toLowerCase().includes(lowerSearch) ||
        campaign.description.toLowerCase().includes(lowerSearch);

        const notReachedGoal = campaign.pledged < campaign.goal;
        
      return matchesCategory && matchesSearch && notReachedGoal;
    });
  }, [campaignData, search, selectedCategory]); // Gunakan campaignData sebagai dependensi, bukan campaigns

  if (loading) return <p className="text-white text-2xl font-semibold text-center ">Loading campaigns...</p>;
  if (error) return <p className="text-red-500">Failed to load campaign data: {error?.message ?? String(error)}</p>;
  if (!campaignData.length) return <p className="text-white">No campaign.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h3 className="text-center text-3xl font-bold mb-6 text-white">
        Discover Campaigns
      </h3>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md w-full md:w-1/3 text-white bg-gray-700 border border-gray-700 placeholder-gray-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-md w-full md:w-1/4 text-white bg-gray-700 border border-gray-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {filteredCampaigns.length === 0 ? (
        <p className="text-white text-center">No campaigns found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      )}
    </div>
  );
};