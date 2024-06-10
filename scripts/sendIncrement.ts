import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from 'ton-crypto';
import { TonClient, WalletContractV4, Address } from '@ton/ton';
import Staking from '../wrappers/Staking'; // this is the interface class we just implemented

export async function run() {
    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({ network: 'testnet' });
    const client = new TonClient({ endpoint });

    // open wallet v4 (notice the correct wallet version here)
    const mnemonic =
        'drive escape interest exile similar solid pause twelve bleak atom coin fox fortune robust jar green maid then hen because slot loan sea bar'; // your 24 secret words (replace ... with the rest of the words)
    const key = await mnemonicToWalletKey(mnemonic.split(' '));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    if (!(await client.isContractDeployed(wallet.address))) {
        return console.log('wallet is not deployed');
    }

    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);
    const seqno = await walletContract.getSeqno();

    // open Counter instance by address
    const stakingAddress = Address.parse('EQAtpOucNTcLH3bjeWja6511YzutT-wJ2cni6WZQ51vfEgY3'); // replace with your address from step 8
    const counter = new Staking(stakingAddress);
    const counterContract = client.open(counter);

    // send the increment transaction
    await counterContract.sendIncrement(walletSender);

    // wait until confirmed
    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        console.log('waiting for transaction to confirm...');
        await sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }
    console.log('transaction confirmed!');
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
