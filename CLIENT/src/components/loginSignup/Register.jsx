import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  /* ------------------------------------------ */
  /* ✅ STEP 1: REGISTER + SEND VERIFICATION */
  /* ------------------------------------------ */
  const handleRegister = async () => {
    if (!name || !role || !email || !password) {
      setMessage({
        type: "error",
        text: "Please fill all fields and select role.",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // ✅ Firebase Signup
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Send Verification Email
      await sendEmailVerification(userCred.user);

      setMessage({
        type: "success",
        text: "Verification email sent! Verify it, then click below.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------ */
  /* ✅ STEP 2: CHECK VERIFICATION + SAVE BACKEND */
  /* ------------------------------------------ */
  const checkVerification = async () => {
    if (!auth.currentUser) {
      setMessage({
        type: "error",
        text: "No user session found. Please login again.",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // ✅ Reload user from Firebase
      await auth.currentUser.reload();

      // ✅ Force refresh token from server
      const freshToken = await auth.currentUser.getIdToken(true);

      // ❌ Still not verified
      if (!auth.currentUser.emailVerified) {
        setMessage({
          type: "error",
          text: "Email still not verified. Please check Gmail and refresh.",
        });
        return;
      }

      // ✅ Save user in backend MongoDB
      await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          role,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${freshToken}`,
          },
        }
      );

      // ✅ Verified success
      setVerified(true);

      setMessage({
        type: "success",
        text: "Email verified + Account saved successfully! Redirecting...",
      });

      // ✅ Redirect after short delay
      setTimeout(() => {
        if (role === "patient") {
          navigate("/patient/details", { replace: true });
        }

        if (role === "hospital_admin") {
          navigate("/center/details", { replace: true });
        }
      }, 1200);

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------ */
  /* ✅ UI SAME AS BEFORE */
  /* ------------------------------------------ */
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-linear-to-br from-teal-600 to-teal-800 text-white">

          <h1 className="text-4xl font-bold mb-4">
            HealthSetu
          </h1>

          <p className="text-lg opacity-90 leading-relaxed">
            Join a trusted healthcare network connecting patients
            with verified dialysis centers across India.
          </p>

          <div className="mt-10 space-y-3 text-sm opacity-90">
            <p>✔ Secure account verification</p>
            <p>✔ Trusted hospitals & admins</p>
            <p>✔ Easy appointment booking</p>
            <p>✔ Emergency support</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 md:p-14 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Create your account
          </h2>

          <p className="text-slate-500 mb-8">
            Get started with HealthSetu in minutes
          </p>

          {/* ROLE SELECT */}
          <div className="grid grid-cols-2 gap-4 mb-6">

            {["patient", "hospital_admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`py-3 rounded-xl font-semibold capitalize transition border ${role === r
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                  }`}
              >
                {r === "hospital_admin" ? "Hospital Admin" : "Patient"}
              </button>
            ))}

          </div>

          {/* INPUTS */}
          <div className="space-y-5">

            <div>
              <label className="text-sm font-medium text-slate-600">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-300
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-300
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-300
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mt-6 px-4 py-3 rounded-xl text-sm font-medium ${message.type === "success"
                  ? "bg-teal-50 text-teal-700"
                  : "bg-red-50 text-red-600"
                }`}
            >
              {message.text}
            </div>
          )}

          {/* BUTTONS */}
          {!verified ? (
            <>
              <button
                onClick={handleRegister}
                disabled={loading}
                className="mt-8 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 
                         text-white font-semibold transition disabled:opacity-60"
              >
                {loading ? "Sending verification..." : "Send verification link"}
              </button>

              <button
                onClick={checkVerification}
                disabled={loading}
                className="mt-4 w-full py-3 rounded-xl border-2 border-teal-600
                         text-teal-600 font-semibold hover:bg-teal-50 transition"
              >
                I’ve verified my email
              </button>
            </>
          ) : (
            <p className="text-center mt-8 text-green-600 font-semibold">
              ✅ Verified! Redirecting...
            </p>
          )}

          {/* FOOTER */}
          <p className="mt-6 text-sm text-center text-slate-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-teal-600 font-medium cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>

        </div>

      </div>
    </div>
  );

}
