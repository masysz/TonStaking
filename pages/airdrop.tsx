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

function Airdrop() {
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
          <div className="text-xl font-medium ">Airdrop</div>
          <div className="flex flex-col mt-5">
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Swap #VWS ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Mining Pool #VWS ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>exchange negotiations ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Market maker negotiations ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Key partnerships are coming ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Airdrop Task list ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Airdrop Nfts ETH ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Airdrop NFTs MATIC ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Airdrop NFTs BNB ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Airdrop NFTs GAT ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Airdrop NFTs TON ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Rewards Mining Pool ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Clicker VWS Social Tasks ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Ton Blockchain Training ✅</span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>VWS Staking , </span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Staking Mining NFTs , </span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Domain Zone</span>,
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Bridge BNB/TON </span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>
                Buying premium Telegrams in the bot, and there are a lot of
                interesting things that we will tell you about
              </span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>construction of flying drones </span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Updating the roadmap </span>
            </span>
            <span className="flex items-center space-x-1 mt-1 capitalize">
              <div className="rounded-full min-w-4 h-4 bg-[#0F0]" />{" "}
              <span>Listing all exchange</span>
            </span>
            <span className="mt-5">Donations</span>
            <span className="mt-2.5">TON</span>
            <span className="mt-2.5">
              UQARROkNiK15pmaOZZoxtSra3v39Nd3XJT1DrLSrxVUH4Aci
            </span>
            <span className="mt-2.5 uppercase">bnb eth matic btc</span>
            <span className="mt-2.5">
              0xc69F83A668b3bBAd0B5570dbccF98Ec3C3e50eF3
            </span>
          </div>
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
              <div className="bg-[#1C1F24] text-xs py-2 text-white text-center rounded-lg items-center">
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

export default Airdrop;
