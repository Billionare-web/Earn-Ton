"use client";
import { useAuth } from "@/app/context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";

export default function Wallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setWallet(docSnap.data().wallet || "");
        }
      });
    }
  }, [user]);

  const updateWallet = async () => {
    if (!user) return alert("Avval tizimga kiring!");
    await updateDoc(doc(db, "users", user.uid), { wallet });
    alert("Wallet yangilandi!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-2xl">Wallet</h1>
      <input
        type="text"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="p-2 bg-gray-700 rounded"
      />
      <button onClick={updateWallet} className="bg-blue-500 p-2 rounded mt-2">
        Walletni saqlash
      </button>
      <Navbar />
    </div>
  );
}
