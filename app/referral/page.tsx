"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";

export default function Referral() {
  const { user } = useAuth();
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    if (user) {
      setReferralLink(`${window.location.origin}?ref=${user.uid}`);
    }
  }, [user]);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referal link nusxalandi!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-2xl">Referal</h1>
      <div className="p-2 bg-gray-700 rounded">{referralLink}</div>
      <button onClick={copyLink} className="bg-blue-500 p-2 rounded mt-2">
        Nusxalash
      </button>
      <Navbar />
    </div>
  );
}
