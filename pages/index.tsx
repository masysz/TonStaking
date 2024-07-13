"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { updateItem } from "../app/lib/api";
import Button from "@mui/material/Button";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import EuroIcon from "@mui/icons-material/Euro";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useSnackbar } from "notistack";
import { TonConnectButton } from "@tonconnect/ui-react";

export default function Index() {
  const [count, setCount] = useState<number>(0);
  const [mount, setMount] = useState<number>(1000);
  const [showAnimation, setShowAnimation] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState<string>("");
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";
  let storageUser;
  const snackbar = useSnackbar();
  const handleChooseExchange = () => {
    snackbar.enqueueSnackbar("Coming Soon!", { variant: "info" });
  };
  const handleChange = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  const handleIncrement = (event: React.MouseEvent<HTMLDivElement>) => {
    // const { clientX, clientY } = event
    const { clientX, clientY } = event;
    console.log("Mouse X: ", clientX, "Mouse Y: ", clientY);
    setMousePosition({ x: clientX, y: clientY });
    const newCount = count + 1;
    setCount(newCount);
    setMount(mount - 1);
    if (!showAnimation) handleChange();
    try {
      const user = localStorage.getItem("user");
      updateItem(user, { count: newCount }); // Use the correct item ID here
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };
  useEffect(() => {
    if (mount < 1000) {
      const intervalId = setInterval(() => {
        setMount((prevMount) => Math.min(prevMount + 3, 1000)); // Ensure mount doesn't exceed 1000
      }, 1000); // Adjust the interval as needed

      return () => clearInterval(intervalId); // Clean up the interval on unmount
    }
  }, [mount]);

  useEffect(() => {
    if (userFromQuery) {
      setUser(userFromQuery);
    }
  }, [userFromQuery]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user);
      localStorage.setItem("user", user);
      // storageUser = localStorage.getItem("user");
      if (user != "") {
        const response = await axios.post(
          "https://button-game-backend.onrender.com/items",
          { user }
        );
        if (response.data.stats === "success") {
          const id = response.data.item._id;
          localStorage.setItem("id", id);
          const res = await axios.get(
            "https://button-game-backend.onrender.com/items"
          );
          const data = res.data;
          // Assuming you have an item with an initial mount value
          const itemId = localStorage.getItem("id");
          const item = data.find((item: any) => item._id === itemId); // Adjust the condition if needed
          setCount(item.mount);
        } else {
          alert("Login error");
        }
      }
    };
    fetchData();
  }, [user]);
  return (
    <>
      <div>
        <style>
          {`
            .animation {
              opacity: 1;
              animation-name: example;
              animation-duration: 1s;
              animation-fill-mode: forwards;
            }

            @keyframes example {
              0%   {opacity: 1; left :${mousePosition.x + "px"}; top:${
            mousePosition.y - 70 + "px"
          };}
              100% {opacity: 0; left: ${mousePosition.x + "px"}; top:${
            mousePosition.y - 150 + "px"
          };}
            }
            `}
        </style>
      </div>
      <div className="px-5 py-3 flex items-center relative z-[1]">
        <img
          src="/images/avatar.png"
          alt="AvatarImg"
          className="w-10 h-10"
        ></img>
        <div className=" text-sm font-medium text-white ml-3">@{user}</div>
        <Button
          onClick={handleChooseExchange}
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
      <div className="px-5 relative rounded-t-3xl bg-[#1C1F24] border-t-2 border-[rgb(243,186,47)] shadow-km">
        <div className="grid grid-cols-3 gap-2 pt-5 ">
          <div className="py-2 text-xs font-medium bg-[#272A2F] rounded-2xl text-center">
            <div className="text-[#A0634B]">Earn per tap</div>
            <div className="flex mt-2 justify-center items-center space-x-2">
              <img
                src="/images/dollar-icon.svg"
                alt="dollar"
                className="w-6 h-6"
              ></img>
              <div className="text-white text-lg">+1</div>
            </div>
          </div>
          <div className="py-2 text-xs font-medium bg-[#272A2F] rounded-2xl text-center">
            <div className="text-[#4A4E90]">Coins to level up</div>
            <div className="flex mt-2 justify-center items-center space-x-2">
              <div className="text-white text-lg">5k</div>
            </div>
          </div>
          <div className="py-2 text-xs font-medium bg-[#272A2F] rounded-2xl text-center">
            <div className="text-[#A0634B]">Profit per hour</div>
            <div className="flex mt-2 justify-center items-center space-x-2">
              <img
                src="/images/dollar-icon.svg"
                alt="dollar"
                className="w-6 h-6"
              ></img>
              <div className="text-white text-lg">20</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 items-center space-x-3">
          <img
            src="/images/dollar-icon.svg"
            alt="dollar"
            className="w-14 h-14"
          ></img>
          <div className="text-2xl font-semibold text-white">{count}</div>
        </div>
        <div className="flex mt-5 text-white items-center">
          <div className="font-semibold text-xs">Bronze &gt;</div>
          <div className="ml-auto text-xs">
            <span className="text-[#8B8E93] mr-2">Level</span>1/9
          </div>
        </div>
        <div className="z-0 relative overflow-hidden h-3 rounded-full bg-[#FFFFFF] bg-opacity-15 mt-1">
          <div
            className="h-full rounded-full transition-transform !duration-500 opacity-100"
            style={{
              transform: `translateX(-${100 - (3 + count / 50)}%)`,
              background: "-webkit-linear-gradient(left, #0075FF, #86BEFF)",
            }}
          ></div>
        </div>
        <div
          className="mt-5 w-[200px] h-[200px] flex justify-center items-center rounded-full m-auto cursor-pointer group"
          onClick={handleIncrement}
        >
          <div
            className="w-[90%] h-[90%] rounded-full bg-cover transition duration-300 group-active:scale-105"
            style={{
              backgroundImage: "url(/images/Photoroom-20240713_201910.png)",
              backgroundRepeat: "none",
            }}
          ></div>
          {/* <img src='/images/hamster.png' alt='hamster' className='w-[90%] h-[90%] rounded-full'></img> */}
          <div
            className={`animation font-medium text-lg text-white ${
              showAnimation ? "" : "hidden"
            }`}
            style={{
              position: "absolute",
              left: mousePosition.x + "px",
              top: mousePosition.y + "px",
            }}
          >
            +1
          </div>
        </div>
        <div className="flex mt-5 text-white text-lg font-medium">
          <div className="">⚡ {mount}/1000</div>
          <div className="ml-auto">🚀 Boost</div>
        </div>
        <div className="flex flex-row items-center justify-center ">
          <TonConnectButton />
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex justify-center">
        <div className="grid grid-cols-6 justify-center mt-auto bg-[#272A2F] py-2 px-2 gap-1 w-full">
          <Link href={`/?user=${user}`}>
            <div className="bg-[#1C1F24] text-xs text-white text-center rounded-lg items-center py-2">
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
                (router.pathname === "/mine" ? "text-white" : "text-[#777]")
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
                (router.pathname === "/friend" ? "text-white" : "text-[#777]")
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
                (router.pathname === "/earn" ? "text-white" : "text-[#777]")
              }
            >
              <EuroIcon sx={{ width: "30px", height: "30px" }}></EuroIcon>
              <div>Earn</div>
            </div>
          </Link>
          <Link href={"/airdrop"}>
            <div
              className={
                " text-xs py-2 text-white text-center rounded-lg items-center " +
                (router.pathname === "/airdrop" ? "bg-[#1C1F24]" : "")
              }
            >
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
