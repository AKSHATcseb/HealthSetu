import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { getMe } from "../../services/userApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null);

      // 1️⃣ Firebase authentication
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCred.user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      // 2️⃣ Get Firebase token
      const token = await userCred.user.getIdToken();

      // 3️⃣ Fetch user from backend
      const res = await getMe(token);
      const user = res.data;

      // 4️⃣ Redirect to dashboard
      if (user.role === "patient") {
        navigate(`/patient/${user._id}/dashboard`, { replace: true });
      } else if (user.role === "center") {
        navigate(`/center/${user._id}/dashboard`, { replace: true });
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* 🔒 DESIGN UNCHANGED */}
      <h2 className="text-3xl font-bold text-gray-800">
        Welcome Back 👋
      </h2>

      <p className="text-gray-500 mt-1 mb-6">
        Log in to manage your dialysis care
      </p>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600 outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600 outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* ❌ no alerts, inline error only */}
      {error && (
        <p className="text-red-600 text-sm mt-3">
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        className="w-full mt-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
      >
        Log in
      </button>
    </div>
  );
}
