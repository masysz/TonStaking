"use Client";

import Card from "@/app/components/common/card";
import Link from "next/link";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ConstructionIcon from "@mui/icons-material/Construction";
import EuroIcon from "@mui/icons-material/Euro";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Mine() {
  const [user, setUser] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleImageLoad = () => {
    // setImagesLoaded((prev) => {
    //     console.log(prev)
    //     const newCount = prev + 1;
    //     console.log(newCount)
    //     if (newCount === totalImages) {
    //         setLoading(false);
    //     }
    //     return newCount;
    // });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div></div>
      )}

      <div hidden={loading}>
        <div className="px-5  flex py-3 items-center">
          <img
            src="/images/avatar.png"
            alt="AvatarImg"
            className=" w-10 h-10"
            onLoad={handleImageLoad}
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
        <div className="pt-7 mb-[90px] px-5 text-white rounded-t-3xl bg-[#1C1F24] border-t-2 border-[rgb(243,186,47)] shadow-km">
          <div className="text-xl font-medium ">Tasks list</div>
          <Card
            title="Telegram MagicVipClub Channel"
            price="10000"
            link="https://t.me/MagicVipClub"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Telegram MiningVws Channel"
            price="10000"
            link="https://t.me/miningvws"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Telegram VirtualsWorlds Channel"
            price="10000"
            link="https://t.me/VirtualsWorlds"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Telegram MagicNFTcollection Channel"
            price="10000"
            link="https://t.me/MagicNFTcollections"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Telegram MagicVipPeople Channel"
            price="10000"
            link="https://t.me/MagicVipPeople"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Telegram P2PExchange Channel"
            price="10000"
            link="https://t.me/p2pExchenges"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Telegram AirdropNftOpensea Channel"
            price="10000"
            link="https://t.me/AirdropNftOpensea"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Telegram MagicNftClub Channel"
            price="10000"
            link="https://t.me/MagicNftClub"
            img="/images/telegram-1.svg"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Swap VWS"
            price="10000"
            link="https://dedust.io/swap/TON/VWS"
            img="/images/hamster.png"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Mining Pool VWS/TON"
            price="10000"
            link="https://dedust.io/pools/EQCCa6jA_VzoQi76cAHmumoJfZbglVtY-DL-k8-f9h3vUOy2"
            img="/images/hamster.png"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Swap bot"
            price="10000"
            link="https://t.me/tonRocketBot/cex?startapp=trade-VWS-TON"
            img="/images/hamster.png"
            onLoad={handleImageLoad}
          ></Card>
          <Card
            title="Mining NFTs"
            price="10000"
            link="http://getgems.io/virtualsworlds"
            img="/images/hamster.png"
            onLoad={handleImageLoad}
          ></Card>
        </div>
        <div className="fixed bottom-0 w-full flex justify-center">
          <div className="grid grid-cols-6 justify-center mt-auto bg-[#272A2F] py-2 px-2 gap-1 w-full">
            <Link href={`/?user=${user}`}>
              <div className=" text-xs text-white text-center rounded-lg items-center py-2">
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
                  "text-xs py-2 text-center rounded-lg items-center " +
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
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Fetch or define your static props here
  return {
    props: {
      data: {}, // Example data
    },
  };
}

export default Mine;
