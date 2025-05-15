import { ConnectButton } from "@xellar/kit";
import { useAccount } from "wagmi";

export function Wallet() {
  useAccount();

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Wallet Integration</h2>

      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, openProfileModal, isConnected }) => {
          return (
            <div>
              {isConnected && account ? (
                <div>
                  <p className="text-green-400">✅ Wallet Connected:</p>
                  <p className="font-mono break-all mb-4">{account.address}</p>
                  <button
                    onClick={openProfileModal}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={openConnectModal}
                  className="px-4 py-2 font-semibold bg-gradient-to-r from-pink-600 to-blue-500 hover:from-pink-700 hover:to-blue-600 rounded transition"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
