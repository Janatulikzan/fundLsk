import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CampaignList } from './components/CampaignList';
import { CampaignCreate } from './components/CampaignCreate';
import { Guide } from './components/Guide';
import { Wallet } from './components/Wallet/Wallet';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  category: string;
  goal: number;
  pledged: number;
  imageUrl?: string;
}

const initialCampaigns: Campaign[] = [];

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const handleCreate = (newCampaign: Campaign) => {
    setCampaigns((prev) => [...prev, newCampaign]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col text-white pt-18">
        <Header />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<CampaignList/>} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/create" element={<CampaignCreate onCreate={handleCreate} />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="*" element={<div className="text-center font-semibold text-red-500">404: Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
