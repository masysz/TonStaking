import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell, SendMode } from '@ton/core';

export default class Staking implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell },
    ) {}

    static createForDeploy(code: Cell, initialCounterValue: number, address: Address, ownerAddress: Address): Staking {
        const data = beginCell()
            .storeUint(initialCounterValue, 64)
            .storeAddress(address)
            .storeAddress(ownerAddress)
            .endCell();
        const workchain = 0; // deploy to workchain 0
        const myContractAddress = contractAddress(workchain, { code, data });
        return new Staking(myContractAddress, { code, data });
    }

    async sendDeploy(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: '0.05', // send 0.05 TON to contract for rent
            bounce: false,
        });
    }

    async getCounter(provider: ContractProvider) {
        const { stack } = await provider.get('counter', []);
        return stack.readBigNumber();
    }

    async getData(provider: ContractProvider) {
        const { stack } = await provider.get('get_contract_storage_data', []);
        return {
            number: stack.readNumber(),
            recent_sender: stack.readAddress(),
            owner_address: stack.readAddress(),
        };
    }

    async getBalance(provider: ContractProvider) {
        const { stack } = await provider.get('balance', []);
        return {
            number: stack.readNumber(),
        };
    }

    async sendIncrement(provider: ContractProvider, via: Sender) {
        const messageBody = beginCell()
            .storeUint(1, 32) // op (op #1 = increment)
            .storeUint(0, 64) // query id
            .endCell();
        await provider.internal(via, {
            value: '0.002', // send 0.002 TON for gas
            body: messageBody,
        });
    }

    async sendDeposit(provider: ContractProvider, sender: Sender, value: bigint) {
        const msg_body = beginCell()
            .storeUint(2, 32) // OP code
            .endCell();

        await provider.internal(sender, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: msg_body,
        });
    }

    async sendWithdrawalRequest(provider: ContractProvider, sender: Sender, value: bigint, amount: bigint) {
        const msg_body = beginCell()
            .storeUint(3, 32) // OP code
            .storeCoins(amount)
            .endCell();

        await provider.internal(sender, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: msg_body,
        });
    }
}
