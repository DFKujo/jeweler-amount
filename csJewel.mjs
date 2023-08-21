import { ethers } from 'ethers';

const ERC20_ABI = [
    'function getTotalLockedAmount() view returns (uint256)',
    'function getYesterdayAPRData() view returns (uint256, uint256)'
];

const KLAYProvider = new ethers.JsonRpcProvider('https://klaytn.rpc.defikingdoms.com/');
const DFKCProvider = new ethers.JsonRpcProvider('https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc');
const contractAddress = '0x9ed2c155632C042CB8bC20634571fF1CA26f5742';
const KLAYAddress = '0xaA8548665bCC12C202d5d0C700093123F2463EA6';

async function getDFKCAmount() {
    try {
        const contract = new ethers.Contract(contractAddress, ERC20_ABI, DFKCProvider);

        const totalLockedAmount = await contract.getTotalLockedAmount();
        const APR = await contract.getYesterdayAPRData();
        const formattedAmount = ethers.formatUnits(totalLockedAmount);
        console.log('Total Locked on DFKChain:', formattedAmount);
        console.log('APR: ', APR);


    } catch (error) {
        console.error('Error:', error);
    }
}

async function getKlayLocked() {
    try {
        const contract = new ethers.Contract(KLAYAddress, ERC20_ABI, KLAYProvider);

        const totalKlayLocked = await contract.getTotalLockedAmount();
        const formattedAmount = ethers.formatUnits(totalKlayLocked);
        console.log('Total Locked Klay: ', formattedAmount);
    } catch (error) {
        console.error('error: ', error);
    }
}


getDFKCAmount();
getKlayLocked();
