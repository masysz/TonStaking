import { useEffect, useState } from "react";
import Staking from "../contracts/Staking";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, fromNano, toNano } from "@ton/core";

export function useStakingContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | string>();
  const [balance, setBalance] = useState<string>("");
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const stakingContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Staking(
      Address.parse("EQBLJqcVN1ulx_7LIBTH_ZZa_vkYKTVkYCvw59ZqkyTY5Fhj")
    );
    return client.open(contract) as OpenedContract<Staking>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!stakingContract) return;
      // setVal(null);
      const val = await stakingContract.getCounter();
      const bal = await stakingContract.getBalance();
      setVal(val.toString());
      setBalance(bal.toString());
      await sleep(5000); // sleep 5 seconds and poll value again
      getValue();
    }
    getValue();
  }, [stakingContract]);

  return {
    value: val,
    balance: fromNano(BigInt(balance)),
    address: stakingContract?.address.toString(),
    sendIncrement: () => {
      return stakingContract?.sendIncrement(sender);
    },
    sendDeposit: (amount: number) => {
      if (amount <= 0) return;
      return stakingContract?.sendDeposit(sender, toNano(amount));
    },
    sendWithdraw: (amount: number) => {
      if (amount <= 0) return;
      return stakingContract?.sendWithdrawalRequest(
        sender,
        toNano(0.05),
        toNano(amount)
      );
    },
  };
}
