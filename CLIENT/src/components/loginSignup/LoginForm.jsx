import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ 1. Firebase Login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      // ✅ 2. Reload & Check Verification
      await user.reload();

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      // ✅ 3. Generate Firebase Token
      const token = await user.getIdToken(true);

      // ✅ 4. Fetch Profile from Backend
      const res = await axios.get(
        "http://localhost:8080/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profile = res.data;

      console.log("✅ Logged-in User:", profile);

      // ✅ 5. Redirect Based on Role
      if (profile.role === "patient") {
        navigate(`/patient/dashboard`, { replace: true });
      }

      else if (profile.role === "hospital_admin") {
        navigate(`/center/dashboard`, { replace: true });
      }

      else {
        setError("Invalid role found. Contact support.");
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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-linear-to-br from-teal-600 to-teal-800 text-white">

          <h1 className="text-4xl font-bold mb-4">
            HealthSetu
          </h1>

          <p className="text-lg opacity-90 leading-relaxed">
            A smarter way to manage dialysis appointments, hospitals,
            and patient care — securely and efficiently.
          </p>

          <div className="mt-10 space-y-3 text-sm opacity-90">
            <p>✔ Secure patient management</p>
            <p>✔ Verified hospitals</p>
            <p>✔ Real-time booking</p>
            <p>✔ Emergency priority care</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 md:p-14 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome back
          </h2>

          <p className="text-slate-500 mb-8">
            Sign in to your HealthSetu account
          </p>

          {/* FORM */}
          <div className="space-y-6">

            <div>
              <label className="text-sm font-medium text-slate-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 
                 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                {/* Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    // Eye open
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5
               c4.478 0 8.268 2.943 9.542 7
               -1.274 4.057-5.064 7-9.542 7
               -4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    // Eye closed
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19
               c-4.478 0-8.268-2.943-9.543-7
               a9.97 9.97 0 012.233-3.592M6.223 6.223
               A9.956 9.956 0 0112 5
               c4.478 0 8.268 2.943 9.543 7
               a9.978 9.978 0 01-4.132 5.411M15 12
               a3 3 0 00-3-3M3 3l18 18" />
                    </svg>
                  )}
                </button>

              </div>
            </div>


          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-5 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-8 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-center text-slate-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-teal-600 font-medium cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>

        </div>

      </div>
    </div>
  );

}
