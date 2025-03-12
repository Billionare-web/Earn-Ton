"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "@/app/firebaseConfig";
import {
  FaCog,
  FaWallet,
  FaUsers,
  FaGlobe,
  FaSignOutAlt,
  FaUser,
  FaLink,
} from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [language, setLanguage] = useState("uz");
  const [profileImage, setProfileImage] = useState("");
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setWallet(userDoc.data().wallet || "");
          setReferrals(userDoc.data().referrals || []);
          const profileRef = ref(storage, `profiles/${currentUser.uid}.jpg`);
          try {
            const profileUrl = await getDownloadURL(profileRef);
            setProfileImage(profileUrl);
          } catch (error) {
            setProfileImage("");
          }
        }
      }
    };
    fetchUserData();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-2"
            />
          ) : (
            <FaUser size={40} className="mr-2 text-gray-400" />
          )}
          <h1 className="text-xl font-bold">{user?.displayName}</h1>
        </div>
        <button
          className="text-gray-300"
          onClick={() => setLanguage(language === "uz" ? "en" : "uz")}
        >
          <FaCog size={20} />
        </button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center">
        <FaWallet size={20} className="mr-2" />
        <div>
          <h2 className="text-lg">Wallet</h2>
          <p className="text-sm text-gray-400">{wallet || "Not linked"}</p>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center">
        <FaUsers size={20} className="mr-2" />
        <div>
          <h2 className="text-lg">Referrals</h2>
          <ul className="text-sm text-gray-400">
            {referrals.length > 0 ? (
              referrals.map((ref, index) => <li key={index}>{ref}</li>)
            ) : (
              <p>No referrals yet</p>
            )}
          </ul>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center">
        <FaLink size={20} className="mr-2" />
        <div>
          <h2 className="text-lg">Referral Link</h2>
          <p className="text-sm text-gray-400">
            https://earn-ton.vercel.app/ref/{user?.uid}
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 p-2 rounded-lg text-white flex items-center justify-center"
      >
        <FaSignOutAlt size={20} className="mr-2" /> Logout
      </button>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 flex items-center">
        <FaGlobe size={20} className="mr-2" />
        <div>
          <h2 className="text-lg">Internet Status</h2>
          <p className="text-sm text-gray-400">
            {navigator.onLine ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
