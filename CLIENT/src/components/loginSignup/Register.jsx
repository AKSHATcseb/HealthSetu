import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
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

  const handleRegister = async () => {
    if (!name || !role || !email || !password) {
      setMessage({
        type: "error",
        text: "Please fill all fields and select role",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCred.user);

      localStorage.setItem("selectedRole", role);
      localStorage.setItem("userName", name);

      setMessage({
        type: "success",
        text: "Verification email sent! Click the link in your email, then press the button below.",
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

  // 👇 Manual verify check (SAFE)
  const checkVerification = async () => {
    if (!auth.currentUser) return;

    await auth.currentUser.reload();

    if (auth.currentUser.emailVerified) {
      setVerified(true);

      setMessage({
        type: "success",
        text: "Email verified successfully! You can continue.",
      });
    } else {
      setMessage({
        type: "error",
        text: "Email not verified yet. Please check your inbox.",
      });
    }
  };

  const goToDetails = () => {
    if (role === "patient") navigate("/patient/details");
    if (role === "center") navigate("/center/details");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>

        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-3">
            {["patient", "center"].map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`py-3 rounded-xl ${
                  role === r ? "bg-teal-600 text-white" : "bg-slate-100"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="input"/>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="input"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="input"/>

        </div>

        {message && (
          <div className={`mt-4 p-2 rounded ${
            message.type==="success"?"bg-teal-50 text-teal-700":"bg-red-50 text-red-600"
          }`}>
            {message.text}
          </div>
        )}

        {!verified && (
          <>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="btn-primary mt-5"
            >
              Send Verification Link
            </button>

            <button
              onClick={checkVerification}
              className="btn-outline mt-3"
            >
              I have verified my email
            </button>
          </>
        )}

        {verified && (
          <button
            onClick={goToDetails}
            className="btn-success mt-5"
          >
            Continue to Details
          </button>
        )}

        <style>{`
          .input{
            width:100%;
            padding:12px;
            border-radius:12px;
            background:#f1f5f9;
          }
          .btn-primary{
            width:100%;
            padding:12px;
            background:#14b8a6;
            color:white;
            border-radius:999px;
          }
          .btn-outline{
            width:100%;
            padding:12px;
            border:2px solid #14b8a6;
            border-radius:999px;
          }
          .btn-success{
            width:100%;
            padding:12px;
            background:#22c55e;
            color:white;
            border-radius:999px;
          }
        `}</style>

      </div>
    </div>
  );
}
