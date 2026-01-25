import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { getMe } from "../../services/userApi";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Firebase login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCred.user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      // 2️⃣ Get backend profile
      const token = await userCred.user.getIdToken();
      const res = await getMe(token);
      const user = res.data;

      // 3️⃣ Role-based redirect
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-8">

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Log in to manage your dialysis care with HealthSetu
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold hover:opacity-95 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center text-slate-500">
          New to HealthSetu?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-600 font-medium cursor-pointer hover:underline"
          >
            Create new account
          </span>
        </p>
      </div>

      {/* Utility styles */}
      <style>{`
        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          background: #f1f5f9;
          color: #334155;
          outline: none;
          border: 1px solid transparent;
        }
        .input:focus {
          border-color: #14b8a6;
          background: #ffffff;
        }
      `}</style>
    </div>
  );
}
