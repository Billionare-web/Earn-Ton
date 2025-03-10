"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { IoKeySharp } from "react-icons/io5";
import { FaUserSecret } from "react-icons/fa";

export default function Login() {
  const { login, loginAnonymously } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login();
    } catch (err) {
      setError("Kirishda xatolik yuz berdi. Qaytadan urinib ko‘ring.");
    }
  };

  const handleGuestLogin = async () => {
    try {
      await loginAnonymously();
    } catch (err) {
      setError("Anonim rejimda kirib bo‘lmadi.");
    }
  };

  return (
    <div className="flex flex-col px-8 items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Tizimga kirish</h1>

      <input
        type="email"
        placeholder="Emailingizni kiriting"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-xs px-4 py-3 rounded bg-gray-800 text-white outline-none mb-4"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleLogin}
        className="flex items-center gap-2 bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition w-full max-w-xs mb-3"
      >
        <IoKeySharp /> Google bilan kirish
      </button>

      <button
        onClick={handleGuestLogin}
        className="flex items-center gap-2 bg-gray-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-600 transition w-full max-w-xs"
      >
        <FaUserSecret /> Anonim (Guest) rejim
      </button>
    </div>
  );
}
