"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { IoKeySharp } from "react-icons/io5";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col px-16 items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Tizimga kirish</h1>

      <input
        type="email"
        placeholder="Emailingizni kiriting"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-xs px-4 py-3 rounded bg-gray-800 text-white outline-none mb-4"
      />

      <button
        onClick={login}
        className="flex items-center gap-2 bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition"
      >
        <IoKeySharp /> Google bilan kirish
      </button>
    </div>
  );
}
