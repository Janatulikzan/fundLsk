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
- Wallet Integration: Ethers.js + wagmi + Xellar kit
- Token: ERC20 (IDRX)

## 📦 Instalasi

1. **Clone repo ini:**

```bash
git clone https://github.com/Janatulikzan/fundLsk.git
cd fundLsk

2. **Instal Dependencies:**

# Frontend
cd frontend
npm install

# Smart contract
cd ../smart-contract
npm install

3. **Compile & Deploy Smart Contract (Hardhat):**

npx hardhat compile
npx hardhat run scripts/deploy.ts --network <your-network>

4. **Start Frontend:**

cd ../frontend
npm run dev

5. **Testing:**

# Di dalam folder smart-contract
npx hardhat test
