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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center mb-4">
          Create Account
        </h2>

        {/* ROLE SELECT */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["patient", "hospital_admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`py-3 rounded-xl font-semibold capitalize transition ${
                role === r
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r === "hospital_admin" ? "Hospital Admin" : "Patient"}
            </button>
          ))}
        </div>

        {/* INPUTS */}
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input mt-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mt-3"
        />

        {/* MESSAGE */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm font-medium ${
              message.type === "success"
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
              className="btn-primary mt-5"
            >
              {loading ? "Sending..." : "Send Verification Link"}
            </button>

            <button
              onClick={checkVerification}
              disabled={loading}
              className="btn-outline mt-3"
            >
              I Have Verified My Email
            </button>
          </>
        ) : (
          <p className="text-center mt-6 text-green-600 font-semibold">
            ✅ Verified! Redirecting...
          </p>
        )}

        {/* STYLES */}
        <style>{`
          .input {
            width: 100%;
            padding: 12px;
            border-radius: 12px;
            background: #f1f5f9;
            outline: none;
          }

          .input:focus {
            border: 1px solid #14b8a6;
            background: white;
          }

          .btn-primary {
            width: 100%;
            padding: 12px;
            background: #14b8a6;
            color: white;
            font-weight: 600;
            border-radius: 999px;
          }

          .btn-outline {
            width: 100%;
            padding: 12px;
            border: 2px solid #14b8a6;
            font-weight: 600;
            border-radius: 999px;
          }
        `}</style>

      </div>
    </div>
  );
}
