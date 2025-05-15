import { useState } from 'react';
import { ethers } from 'ethers';
import { useWalletClient } from 'wagmi';
import { getContract } from '../abi/contract';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const categories = ['Education', 'Health', 'IoT', 'Blockchain', 'etc.'];

interface CampaignForm {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  goal: string; // input dalam IDR
}

interface CampaignData {
  id: number;
  title: string;
  description: string;
  category: string;
  goal: number;
  pledged: number;
  imageUrl?: string;
}

type CampaignFormField = keyof CampaignForm;

export function CampaignCreate({ onCreate }: { onCreate: (campaign: CampaignData) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<CampaignForm>({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    goal: '',
  });

  // const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleFormChange = (
    fieldTitle: CampaignFormField,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [fieldTitle]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, category, goal } = form;

    if (!title || !description || !category || !goal) {
      alert('Please fill in all required fields');
      return;
    }

    const parsedGoal = parseFloat(goal);
    if (isNaN(parsedGoal) || parsedGoal <= 0) {
      alert('Goal must be a valid positive number');
      return;
    }

    if (!walletClient) {
      alert('Please connect your wallet');
      return;
    }

    setIsLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      // ✅ Konversi dari IDRX ke wei (asumsi 2 desimal)
      const goalInWei = ethers.parseUnits(parsedGoal.toString(), 2);

      const tx = await contract.createCampaign(
        title,
        description,
        category,
        form.imageUrl.trim(),
        goalInWei
      );

      await tx.wait();

      const newCampaign: CampaignData = {
        id: Date.now(),
        title,
        description,
        category,
        goal: parsedGoal,
        pledged: 0,
        imageUrl: form.imageUrl.trim() || undefined,
      };

      onCreate(newCampaign);
      alert('Campaign is created');

      setForm({
        title: '',
        description: '',
        category: '',
        imageUrl: '',
        goal: '',
      });
      setIsLoading(false);

    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("An error occurred while creating the campaign.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-6">Create a Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Form Fields */}

        <div>
          <label className="block mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => handleFormChange('title', e)}
            required
            className="w-full px-3 py-2 rounded-md text-white border border-gray-400 placeholder-gray-500"
            placeholder="Enter campaign title"
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => handleFormChange('description', e)}
            required
            className="w-full px-3 py-2 rounded-md text-white border border-gray-400 placeholder-gray-500"
            rows={4}
            placeholder="Enter campaign description"
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => handleFormChange('category', e)}
            required
            className="w-full px-3 py-2 rounded-md text-white bg-gray-700 border border-gray-500"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1" htmlFor="goal">Goal (IDRX)</label>
          <input
            id="goal"
            type="number"
            min="1"
            value={form.goal}
            onChange={(e) => handleFormChange('goal', e)}
            required
            className="w-full px-3 py-2 rounded-md text-white border border-gray-400 placeholder-gray-500"
            placeholder="Enter funding goal"
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={form.imageUrl}
            onChange={(e) => handleFormChange('imageUrl', e)}
            className="w-full px-3 py-2 rounded-md text-white border border-gray-500 placeholder-gray-700"
            placeholder="Enter image URL (optional)"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 font-bold bg-gradient-to-r from-pink-600 to-blue-500 hover:from-pink-700 hover:to-blue-600 rounded transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating...' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
}
