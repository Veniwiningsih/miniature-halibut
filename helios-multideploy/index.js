require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');

// === SETUP RPC & KONTRAK ===
const HELIOS_RPC = 'https://testnet1.helioschainlabs.org';
const provider = new ethers.JsonRpcProvider(HELIOS_RPC);

// Ambil bytecode dan abi dari file build JSON (hasil compile)
const compiled = JSON.parse(fs.readFileSync('./artifacts/contracts/MyContract.sol/MyContract.json', 'utf8'));
const bytecode = compiled.bytecode;
const abi = compiled.abi;

// === LOAD WALLET ===
let wallets = [];
try {
  wallets = JSON.parse(fs.readFileSync('./wallets.json', 'utf8'));
} catch (e) {
  console.error("❌ Gagal membaca file wallets.json");
  process.exit(1);
}

// === BATAS NONCE — SKIP JIKA TERLALU TINGGI ===
const MAX_NONCE = 50;

async function deployFromWallet(privateKey) {
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  try {
    const nonce = await provider.getTransactionCount(wallet.address, 'latest');
    console.log(`🚀 Deploying from: ${wallet.address} | Nonce: ${nonce}`);

    if (nonce > MAX_NONCE) {
      console.log(`⚠️  Skipping wallet ${wallet.address} (nonce too high: ${nonce})`);
      return;
    }

    const contract = await factory.deploy("Hello from Helios!", {
      gasLimit: 3000000,
      nonce: nonce,
    });

    console.log("📨 TX sent:", contract.deploymentTransaction().hash);
    await contract.waitForDeployment();
    console.log("✅ Contract deployed at:", await contract.getAddress());

  } catch (err) {
    console.error(`❌ Error deploying from: ${wallet.address}`);
    console.error(err?.message || err);
  }
}

async function main() {
  for (const key of wallets) {
    await deployFromWallet(key.trim());
    await new Promise(res => setTimeout(res, 1000)); // Delay 1 detik antar wallet
  }
}

main();
