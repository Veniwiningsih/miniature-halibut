# ⚡ Helios Multi-Wallet Auto Deployer

Script otomatis untuk **deploy smart contract** ke jaringan **Helios Testnet** menggunakan banyak wallet sekaligus. Termasuk fitur **notifikasi Telegram**, **retry otomatis**, dan konfigurasi mudah.

---

## 🚀 Fitur

- Multi-wallet deploy (hingga 15 wallet)
- Retry otomatis jika deploy gagal
- Kirim notifikasi ke Telegram (sukses & gagal)
- Menggunakan Ethers.js & Hardhat

---

## 📁 Struktur Folder

helios-multideploy/
├── contracts/
│ └── MyContract.sol # Smart contract
├── index.js # Script utama
├── wallets.json # Private key list
├── .env # Konfigurasi token & RPC
├── hardhat.config.js # Konfigurasi jaringan
└── package.json

yaml
Copy
Edit

---

## ⚙️ Instalasi

### 1. Clone Repo

```bash
git clone https://github.com/Veniwiningsih/helios-multideploy.git
cd helios-multideploy
npm install
2. Konfigurasi .env
Buat file .env di root project:

ini
Copy
Edit
RPC_URL=https://testnet1.helioschainlabs.org
TELEGRAM_BOT_TOKEN=BOT_TOKEN_KAMU
TELEGRAM_CHAT_ID=CHAT_ID_KAMU
3. Masukkan Private Key ke wallets.json
Contoh isi:

json
Copy
Edit
[
  "0xPRIVATE_KEY_1",
  "0xPRIVATE_KEY_2",
  "0xPRIVATE_KEY_3"
]
4. Compile Contract
bash
Copy
Edit
npx hardhat compile
5. Jalankan Deploy
bash
Copy
Edit
node index.js
🛎️ Telegram Notifikasi
✅ Sukses: Akan mengirim TX hash & address deploy

❌ Gagal: Akan mengirim error dan wallet address

🧠 Tips
Jangan push .env & wallets.json ke publik

Bisa digunakan bersama cron untuk auto-deploy berkala

🪪 Lisensi
MIT License. Bebas digunakan dan dimodifikasi.

🙋‍♀️ Author
GitHub: @Veniwiningsih
