"use client";
import Link from "next/link";
import { CiWallet } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";

export default function Navbar() {
  return (
    <div className="fixed bottom-0 w-full max-w-[400px] mx-auto bg-[#1E1E1E] p-4 flex justify-around text-white text-sm">
      <Link href="/" className="py-2 flex gap-2 items-center">
        <AiOutlineHome /> Balans
      </Link>
      <Link href="/wallet" className="py-2 flex gap-2 items-center">
        <CiWallet /> Wallet
      </Link>
      <Link href="/referral" className="py-2 flex gap-2 items-center">
        <FaLink /> Referal
      </Link>
    </div>
  );
}
