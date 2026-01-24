import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../../firebase";

export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ ADD THIS

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCred.user.emailVerified) {
        alert("Please verify your email first");
        return;
      }

      const token = await userCred.user.getIdToken();
      console.log("Firebase ID Token:", token);

      alert("Login successful");

      // ✅ REDIRECT TO DASHBOARD
      navigate("/dashboard");

      // 👉 optionally send token to backend here
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        try {
          const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          await sendEmailVerification(userCred.user);
          alert("Verification email sent. Please verify before login.");
        } catch (e) {
          alert(e.message);
        }
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
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

      <button
        onClick={handleLogin}
        className="w-full mt-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
      >
        Log in
      </button>

      <p className="text-sm text-gray-500 text-center mt-6">
        New to HealthSetu?{" "}
        <span
          onClick={onSwitch}
          className="text-teal-600 cursor-pointer font-medium"
        >
          Create account
        </span>
      </p>
    </div>
  );
}
