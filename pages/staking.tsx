import Link from "next/link";
import { useState, useEffect } from "react";

import { useSnackbar } from "notistack";
import axios from "axios";

import { Button } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { TonConnectButton } from "@tonconnect/ui-react";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useRouter } from "next/router";

import { useStakingContract } from "@/src/hooks/useStakingContract";
import { useTonConnect } from "@/src/hooks/useTonConnect";

interface Item {
  t_id: string;
  mount: number;
}

const nftList = [
  { id: 1, name: "NFT1", address: "0x0000" },
  { id: 2, name: "NFT2", address: "0x0000" },
  { id: 3, name: "NFT3", address: "0x0000" },
  { id: 4, name: "NFT4", address: "0x0000" },
  { id: 5, name: "NFT5", address: "0x0000" },
  { id: 6, name: "NFT6", address: "0x0000" },
  { id: 7, name: "NFT7", address: "0x0000" },
];

function Staking() {
  const [user, setUser] = useState<string | null>("");
  const [items, setItems] = useState<Item[]>([]);
  const { value, address, balance, sendIncrement, sendDeposit, sendWithdraw } =
    useStakingContract();
  const { connected } = useTonConnect();

  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const [depositNFT, setDepositNFT] = useState<boolean>(false);
  const [withdrawNFT, setWithdrawNFT] = useState<boolean>(false);

  const [selectedNftId, setSelectedNftId] = useState<number>(1);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      setUser(user);
      if (user != "") {
        const response = await axios.post(
          "https://button-game-backend.onrender.com/friends",
          { user }
        );
        if (response.data.items == undefined) setItems([]);
        else setItems(response.data.items);
      }
    };
    fetchData();
  });

  return (
    <>
      <div className="px-5  flex py-3 items-center">
        <img
          src="/images/avatar.png"
          alt="AvatarImg"
          className=" w-10 h-10"
        ></img>
        <div className=" text-sm font-medium text-white ml-3">@{user}</div>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            paddingY: "8px",
            fontSize: "12px",
            paddingX: "8px",
            marginLeft: "auto",
            borderRadius: "20px",
            textTransform: "none",
            background: "#1C1F24",
          }}
        >
          <img className="w-7 h-7" src="/images/hamster.png" />
          <span>Choose exchange</span>
        </Button>
      </div>
      <div className="flex pt-5 rounded-t-3xl px-[3%] justify-between bg-[#1C1F24] border-t-2 border-[rgb(243,186,47)] shadow-km">
        <div className="flex my-auto justify-center">
          <img
            src="/images/ton_symbol.svg"
            alt="astronaut"
            className="w-[37px] mx-5 my-auto h-[37px] m-auto"
          ></img>
          <h1 className="text-white my-auto text-[37px]">Staking</h1>
        </div>
        <TonConnectButton className="my-auto" />
      </div>

      <div className="flex p-20">
        <div className="w-1/2 mx-20 rounded-2xl  px-5 py-2 h-[270px] bg-[#272A2F]">
          <div className="flex text-[27px] text-white justify-between text-center rounded-lg items-center ">
            <div className="font-mono">Deposit</div>
            <img
              src="/images/deposit.png"
              alt="astronaut"
              className="w-[100px] h-[100px] my-auto"
            ></img>
          </div>
          <div className="flex cursor-pointer items-center me-4">
            <input
              id="red-checkbox"
              type="checkbox"
              checked={depositNFT}
              onChange={() => {
                setDepositNFT(!depositNFT);
              }}
              value=""
              className="w-4 h-4 cursor-pointer bg-gray-100 border-gray-300 rounded-lg"
            />
            <label
              htmlFor="red-checkbox"
              className="ms-2 cursor-pointer text-sm font-medium text-white"
            >
              NFT
            </label>
          </div>
          <div className="mt-3 grid px-0">
            {!depositNFT ? (
              <div className="flex">
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => {
                    setDepositAmount(e.target.value);
                  }}
                  className="w-full text-white outline-none text-[20px] bg-transparent p-2 border-white border rounded-lg"
                ></input>
                <Button
                  className="m-auto ml-2"
                  variant="contained"
                  sx={{
                    paddingY: "5px",
                    fontSize: "15px",
                    paddingX: "12px",
                    borderRadius: "20px",
                    textTransform: "none",
                    width: "15%",
                  }}
                >
                  max
                </Button>
              </div>
            ) : (
              <div className="flex">
                <select
                  value={selectedNftId}
                  onChange={(e) => {
                    setSelectedNftId(Number(e.target.value));
                  }}
                  className="mr-2 outline-none p-1 w-[25%] rounded-lg border border-white bg-transparent text-white"
                >
                  {nftList.map((nft) => {
                    return (
                      <option
                        key={nft.id}
                        value={nft.id}
                        className="bg-[#272A2F]"
                      >
                        {nft.name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="number"
                  step={"any"}
                  value={depositAmount}
                  pattern="[0-9]"
                  onChange={(e) => {
                    setDepositAmount(
                      Math.round(parseFloat(e.target.value)).toString()
                    );
                  }}
                  className="w-[60%] text-white outline-none text-[20px] bg-transparent p-2 border-white border rounded-lg"
                ></input>
                <Button
                  className="m-auto ml-2"
                  variant="contained"
                  sx={{
                    paddingY: "5px",
                    fontSize: "15px",
                    paddingX: "12px",
                    borderRadius: "20px",
                    textTransform: "none",
                    width: "15%",
                  }}
                >
                  max
                </Button>
              </div>
            )}
            <Button
              className="mt-3 m-auto"
              variant="contained"
              sx={{
                paddingY: "10px",
                fontSize: "20px",
                paddingX: "24px",
                borderRadius: "10px",
                textTransform: "none",
                width: "37%",
              }}
              onClick={() => {
                if (depositNFT) alert(selectedNftId + " " + depositAmount);
              }}
            >
              Deposit
            </Button>
          </div>
        </div>
        <div className="w-1/2 mx-20 rounded-2xl  px-5 py-2 h-[250px] bg-[#272A2F]">
          <div className="flex text-[27px] text-white justify-between text-center rounded-lg items-center ">
            <div className="font-mono">Withdraw</div>
            <img
              src="/images/withdraw.png"
              alt="astronaut"
              className="w-[100px] h-[100px] my-auto"
            ></img>
          </div>
          <div className="mt-3 grid px-0">
            <div className="flex">
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                }}
                className="w-full text-white outline-none text-[20px] bg-transparent p-2 border-white border rounded-lg"
              ></input>
              <Button
                className="m-auto ml-2"
                variant="contained"
                sx={{
                  paddingY: "5px",
                  fontSize: "15px",
                  paddingX: "12px",
                  borderRadius: "20px",
                  textTransform: "none",
                  width: "15%",
                }}
              >
                max
              </Button>
            </div>
            <Button
              className="mt-3 m-auto"
              variant="contained"
              sx={{
                paddingY: "10px",
                fontSize: "20px",
                paddingX: "24px",
                borderRadius: "10px",
                textTransform: "none",
                width: "37%",
              }}
              onClick={() => {
                sendWithdraw(parseFloat(withdrawAmount));
              }}
            >
              Withdraw
            </Button>
          </div>
        </div>
        <div className="text-white">
          <h1>Counter Value: {value}</h1>
          <Button
            className="mt-1 m-auto"
            variant="contained"
            sx={{
              paddingY: "5px",
              fontSize: "17px",
              paddingX: "10px",
              borderRadius: "10px",
              textTransform: "none",
              width: "100%",
            }}
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment
          </Button>
          <h1>Balance: {balance?.toString()}</h1>
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex justify-center">
        <div className="grid grid-cols-6 justify-center mt-auto bg-[#272A2F] py-2 px-2 gap-1 w-full">
          <Link href={`/?user=${user}`}>
            <div className="text-xs text-white text-center rounded-lg items-center py-2">
              <img
                src="/images/astronaut.png"
                alt="astronaut"
                className="w-[30px] h-[30px] m-auto"
              ></img>
              <div className="text-center">Exchange</div>
            </div>
          </Link>
          <Link href={"/mine"}>
            <div
              className={
                " text-xs text-center rounded-lg items-center py-2 " +
                (router.pathname === "/mine"
                  ? "bg-[#1C1F24] text-white"
                  : "text-[#777]")
              }
            >
              <ConstructionIcon
                sx={{ width: "30px", height: "30px" }}
              ></ConstructionIcon>
              <div>Mine</div>
            </div>
          </Link>
          <Link href={"/friend"}>
            <div
              className={
                " text-xs text-center rounded-lg items-center py-2 " +
                (router.pathname === "/friend"
                  ? "bg-[#1C1F24] text-white"
                  : "text-[#777]")
              }
            >
              <Diversity3Icon
                sx={{ width: "30px", height: "30px" }}
              ></Diversity3Icon>
              <div>Friends</div>
            </div>
          </Link>
          <Link href={"/earn"}>
            <div
              className={
                " text-xs py-2 text-center rounded-lg items-center " +
                (router.pathname === "/earn"
                  ? "bg-[#1C1F24] text-white"
                  : "text-[#777]")
              }
            >
              <EuroIcon sx={{ width: "30px", height: "30px" }}></EuroIcon>
              <div>Earn</div>
            </div>
          </Link>
          <Link href={"/airdrop"}>
            <div className=" text-xs py-2 text-white text-center rounded-lg items-center">
              <img
                src="/images/dollar-icon.svg"
                alt="astronaut"
                className="w-[30px] h-[30px] m-auto"
              ></img>
              <div>Airdrop</div>
            </div>
          </Link>
          <Link href={"/staking"}>
            <div
              className={
                " text-xs py-2 text-white text-center rounded-lg items-center " +
                (router.pathname === "/staking" ? "bg-[#1C1F24]" : "")
              }
            >
              <img
                src="/images/ton_symbol.svg"
                alt="astronaut"
                className="w-[30px] h-[30px] m-auto"
              ></img>
              <div>Staking</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Staking;
