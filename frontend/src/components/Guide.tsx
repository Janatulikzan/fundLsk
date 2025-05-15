export function Guide() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6">Platform Guide & Tutorial</h2>
      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">1. Wallet Integration</h3>
        <p>
          Connect your wallet to start creating and contributing to campaigns using the IDRX stablecoin.
          Supported wallets include MetaMask and WalletConnect.
        </p>
      </section>
      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">2. Creating a Campaign</h3>
        <p>
          Navigate to the "Create Campaign" page to start a new crowdfunding campaign.
          Fill in the campaign details including title, description, category, funding goal, and an optional image.
        </p>
      </section>
      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">3. Discovering Campaigns</h3>
        <p>
          Use the homepage to browse and search for campaigns by category or keywords.
          Click on a campaign card to view more details and contribute.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">4. Contributing to Campaigns</h3>
        <p>
          Once your wallet is connected, you can contribute IDRX stablecoins to campaigns you support.
          Contributions are securely recorded on the blockchain.
        </p>
      </section>
      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage Flow</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Connect your wallet using the Wallet page.</li>
          <li>Browse campaigns on the homepage or create your own campaign.</li>
          <li>Search and filter campaigns by category or keywords.</li>
          <li>Click on a campaign to view details and donate using IDRX stablecoin.</li>
          <li>Track your contributions and campaign progress.</li>
        </ol>
      </section>
    </div>
  )
}
