"use client";
import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { IoKeySharp } from "react-icons/io5";
import { FaUserSecret } from "react-icons/fa";




// 🔹 AuthContext yaratish
type AuthContextType = {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  loginAnonymously: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// 🔹 AuthProvider komponenti
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  // Foydalanuvchini avtomatik tekshirish
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Google bilan kirish
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // ✅ To‘g‘ri ishlaydi
    } catch (error) {
      console.error(error);
    }
  };

  // Anonim rejimda kirish
  const loginAnonymously = async () => {
    try {
      const result = await signInAnonymously(auth);
      setUser(result.user); // ✅ To‘g‘ri ishlaydi
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginAnonymously }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 useAuth hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 🔹 Login sahifasi
const Login = () => {
  const { loginWithGoogle, loginAnonymously } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
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
};

// 🔹 Barcha kodni AuthProvider bilan o‘rab, eksport qilish
export default function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
