## Screenshot

![Tampilan Aplikasi](https://github.com/Janatulikzan/fundLsk/blob/main/screencapture-localhost-5173-2025-05-15-16_38_19.png)


[Link Project](https://fund-lsk.vercel.app/)


# FundLsk

FundLsk adalah platform crowdfunding berbasis Web3 yang memungkinkan siapa saja membuat dan mendanai kampanye menggunakan token IDRX.

![license](https://img.shields.io/github/license/Janatulikzan/fundLsk)
![status](https://img.shields.io/badge/status-development-orange)

## 🚀 Fitur

- Buat kampanye dengan judul, deskripsi, kategori, target dana, dan gambar.
- Donasi menggunakan token ERC20 (IDRX).
- Transparansi dana melalui smart contract.
- Terintegrasi dengan dompet Web3 (via MetaMask).
- Dibangun dengan **React**, **TypeScript**, **Ethers.js**, dan **Hardhat**.

## 🛠️ Teknologi

- Frontend: React + TypeScript + TailwindCSS
- Blockchain: Solidity (Hardhat)
- Wallet Integration: Ethers.js + wagmi
- Token: ERC20 (IDRX)

## 📦 Instalasi

**Clone repo ini:**

```bash
git clone https://github.com/Janatulikzan/fundLsk.git
cd fundLsk

**Install Dependencies**

# Frontend
cd frontend
npm install

# Smart contract
cd ../smart-contract
npm install

**Compile & Deploy smart contract (hardhat)**

npx hardhat compile
npx hardhat run scripts/deploy.ts --network <your-network>

**Start Frontend**

cd ../frontend
npm run dev

**Testing**

# Di dalam folder smart-contract
npx hardhat test


Struktur Folder 

fundLsk/
│
├── frontend/              # React frontend app
└── smart-contract/        # Smart contract dengan Hardhat
