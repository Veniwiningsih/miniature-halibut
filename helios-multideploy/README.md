# 🚀 Helios Multi-Wallet Deployer

Automated deployment tool for the [Helios Testnet](https://testnet1.helioschainlabs.org/docs), supporting multiple wallets, Telegram notifications, and retry logic. Built using Hardhat, Ethers.js, and Node.js.

---

## ✨ Features

- ✅ Multi-wallet deployment
- ✅ Telegram alert on success/fail
- ✅ Automatic gas configuration
- ✅ Smart retry on failure
- ✅ Secure via `.env` and `wallets.json`
- ✅ Fully scriptable for cron or automation

---

## 📁 Project Structure

helios-multideploy/
├── contracts/
│ └── MyContract.sol # Your contract
├── index.js # Main deploy script
├── wallets.json # List of private keys (ignored from Git)
├── .env # Telegram + RPC config (ignored from Git)
├── hardhat.config.js # Hardhat config
├── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Requirements

- Node.js `v18+`
- NPM
- Helios RPC
- Telegram Bot Token & Chat ID

---

## 🔐 Setup

1. Clone this repository:

```bash
git clone https://github.com/Veniwiningsih/helios-multideploy.git
cd helios-multideploy
npm install
Create .env file:

ini
Copy
Edit
RPC_URL=https://testnet1.helioschainlabs.org
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
Create wallets.json with your private keys:

json
Copy
Edit
[
  "0xabc123....",
  "0xdef456...."
]
Compile the contract:

bash
Copy
Edit
npx hardhat compile
Run the deployer:

bash
Copy
Edit
node index.js
📲 Telegram Example
On successful deploy:

yaml
Copy
Edit
✅ Deployed from: 0xYourWallet
📜 Contract Address: 0xDeployedContractAddress
On error:

yaml
Copy
Edit
❌ Failed from: 0xYourWallet
🔍 Reason: invalid nonce / revert
💡 Tips
You can automate this via cron for hourly deploys.

Rotate wallet keys periodically for safety.

Never commit .env or wallets.json to GitHub!

🛠️ License
MIT — use freely with credit.

🤝 Contact
Built with ❤️ by @Veniwiningsih