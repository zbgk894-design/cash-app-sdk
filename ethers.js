const express = require('express');
const { ethers } = require('ethers');
const app = express();
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const adminWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [ /* SKMAD ABI */ ];
const contract = new ethers.Contract(contractAddress, abi, adminWallet);

// Track User Activity
app.post('/game/payout', async (req, res) => {
    const { userWallet, coinsCollected } = req.body;
    try {
        const amount = ethers.utils.parseUnits(coinsCollected.toString(), 18);
        const tx = await contract.rewardUser(userWallet, amount);
        await tx.wait();
        res.status(200).send({ success: true, txHash: tx.hash });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Admin Backend Running'));