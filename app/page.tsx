"use client";
import { useAuth } from "@/app/context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { CiLogout } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Page() {
  const { user, login, logout, loading } = useAuth();
  const [coins, setCoins] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState("");
  const [dataLoading, setDataLoading] = useState(true); // 🔄 Firebase yuklanishi

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCoins(data.coins || 0);
          setUserName(data.name || "Foydalanuvchi");
        }
        setDataLoading(false); // 🔄 Firebase ma'lumotlari yuklandi
      });

      return () => unsubscribe();
    } else {
      setDataLoading(false); // 🔄 Foydalanuvchi yo‘q bo‘lsa ham yuklash tugadi
    }
  }, [user]);

  if (loading || dataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
        <p className="text-lg flex gap-2 px-28 items-center">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl mb-3" />
          Yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full max-w-[400px] mx-auto px-4 text-white bg-gray-900 overflow-hidden">
      {user && (
        <p className="absolute top-4 left-4 text-white font-semibold flex gap-2 items-center">
          <GoPerson /> {userName}
        </p>
      )}

      {user && (
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-4 right-4 bg-gray-800 px-3 py-2 rounded text-sm shadow-md hover:bg-gray-700 transition"
        >
          <IoIosSettings />
        </button>
      )}

      {showSettings && (
        <button
          onClick={logout}
          className="absolute flex gap-2 items-center top-14 right-4 bg-zinc-600 px-3 py-2 rounded text-sm shadow-md hover:bg-zinc-700 transition"
        >
          <CiLogout /> Chiqish
        </button>
      )}

      {user ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">💰 Balans</h1>
          <p className="text-xl">{coins.toFixed(6)} TON</p>
        </div>
      ) : (
        <button
          onClick={login}
          className="flex gap-2 items-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition"
        >
          <IoKeySharp /> Google bilan kirish
        </button>
      )}
      <Navbar />
    </div>
  );
}
