import * as fs from 'fs';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from 'ton-crypto';
import { TonClient, Cell, WalletContractV4, Address } from '@ton/ton';
import Staking from '../wrappers/Staking'; // this is the interface class from step 7

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

    // prepare Staking's initial code and data cells for deployment
    const stakingCode = Cell.fromBoc(fs.readFileSync('build/staking.cell'))[0]; // compilation output from step 6
    const initialStakingValue = Date.now(); // to avoid collisions use current number of milliseconds since epoch as initial value
    const initAddress: Address = wallet.address;
    const ownerAddress: Address = wallet.address;
    const staking = Staking.createForDeploy(stakingCode, initialStakingValue, initAddress, ownerAddress);

    // exit if contract is already deployed
    console.log('contract address:', staking.address.toString());
    if (await client.isContractDeployed(staking.address)) {
        return console.log('Staking already deployed');
    }

    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);
    const seqno = await walletContract.getSeqno();

    // send the deploy transaction
    const stakingContract = client.open(staking);
    await stakingContract.sendDeploy(walletSender);

    // wait until confirmed
    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        console.log('waiting for deploy transaction to confirm...');
        await sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }
    console.log('deploy transaction confirmed!');
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
