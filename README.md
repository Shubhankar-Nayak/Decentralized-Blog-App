# 📝 Decentralized Blog DApp

A simple decentralized blogging application built with **Hardhat** for Ethereum smart contracts and **Vite** for a fast and modern frontend development experience.

---

## ✨ Features

* Write and publish blog posts to the blockchain.
* View published blog posts in a decentralized frontend.
* Connect with MetaMask or other Ethereum wallets.
* Fully decentralized – no central server.

---

## 🔧 Tech Stack

* **Smart Contracts**: Solidity, Hardhat
* **Frontend**: Vite, React 
* **Blockchain**: Sepolia
* **Wallet Integration**: Ethers.js, MetaMask

---

## 🚀 Getting Started

### Prerequisites

* Node.js & npm/yarn
* MetaMask (or any Ethereum wallet)
* Hardhat (globally or locally)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Shubhankar-Nayak/Decentralized-Blog-App.git
cd decentralized-blog
```

---

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn
```

---

### 3. Compile Smart Contracts

```bash
npx hardhat compile
```

---

### 4. Deploy to Local/Test Network

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

To deploy on a testnet like Sepolia:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Make sure you have set your `.env` file correctly with your private key and Infura/Alchemy API key.

---

### 5. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will start your app at [http://localhost:5173](http://localhost:5173)

---

## 🔐 Environment Variables

Create a `.env` file in the root and add:

```bash
PRIVATE_KEY=your_wallet_private_key
INFURA_API_KEY=your_infura_project_id
```

---

## 🧪 Testing

Run contract tests with:

```bash
npx hardhat test
```

---

## 🛠️ Future Improvements

* IPFS integration for blog content.
* Comments and likes.
* NFT-based blog ownership.
* Decentralized identity (ENS/Sign-In with Ethereum).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.