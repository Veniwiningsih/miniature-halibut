const fs = require("fs");
const { execSync } = require("child_process");

// Buat folder utama
if (!fs.existsSync("helios-multideploy")) {
  fs.mkdirSync("helios-multideploy");
  fs.mkdirSync("helios-multideploy/contracts");
}

// Buat MyContract.sol
fs.writeFileSync("helios-multideploy/contracts/MyContract.sol", `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    string public message;
    constructor(string memory _message) {
        message = _message;
    }
}
`);

// Buat wallets.json
fs.writeFileSync("helios-multideploy/wallets.json", JSON.stringify([
  "0xPRIVATE_KEY_1",
  "0xPRIVATE_KEY_2"
], null, 2));

// Buat .env
fs.writeFileSync("helios-multideploy/.env", `RPC_URL=https://testnet1.helioschainlabs.org`);

// Buat index.js
fs.writeFileSync("helios-multideploy/index.js", `require("dotenv").config();
const { ethers } = require("ethers");
const solc = require("solc");
const fs = require("fs");
const path = require("path");

const RPC_URL = process.env.RPC_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);

function compileContract() {
  const source = fs.readFileSync(path.join(__dirname, "contracts", "MyContract.sol"), "utf8");

  const input = {
    language: "Solidity",
    sources: { "MyContract.sol": { content: source } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contract = output.contracts["MyContract.sol"];
  const contractName = Object.keys(contract)[0];
  const abi = contract[contractName].abi;
  const bytecode = contract[contractName].evm.bytecode.object;

  return { abi, bytecode };
}

async function deployFromWallet(privateKey, abi, bytecode) {
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  try {
    console.log("🚀 Deploying from:", wallet.address);
    const contract = await factory.deploy("Hello from Helios!");
    console.log("📨 Tx hash:", contract.deploymentTransaction().hash);
    await contract.waitForDeployment();
    console.log("✅ Contract deployed at:", await contract.getAddress());
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

async function main() {
  const { abi, bytecode } = compileContract();
  const wallets = JSON.parse(fs.readFileSync("wallets.json", "utf8"));

  for (let i = 0; i < wallets.length; i++) {
    await deployFromWallet(wallets[i], abi, bytecode);
    await new Promise(r => setTimeout(r, 5000 + Math.random() * 5000));
  }
}

main();
`);

// Buat package.json
fs.writeFileSync("helios-multideploy/package.json", JSON.stringify({
  name: "helios-multideploy",
  version: "1.0.0",
  main: "index.js",
  scripts: {
    start: "node index.js"
  },
  dependencies: {}
}, null, 2));

// Install dependencies
console.log("📦 Installing dependencies...");
execSync("cd helios-multideploy && npm install ethers dotenv solc", { stdio: "inherit" });

console.log("✅ Semua file dibuat di folder 'helios-multideploy'");
console.log("📂 Jalankan dengan:");
console.log("   cd helios-multideploy && node index.js");
