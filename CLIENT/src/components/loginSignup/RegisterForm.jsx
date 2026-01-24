import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import RoleSelector from "./RoleSelector";
import PatientDetailsForm from "./PatientDetailsForm";
import CenterDetailsForm from "./CenterVerificationForm";

export default function RegisterForm({ onSwitch }) {
  const [role, setRole] = useState(null);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCred.user);
      setVerificationSent(true);

      alert("Verification email sent. Please check your inbox.");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 CHECK REAL VERIFICATION STATUS
  const checkVerification = async () => {
    await auth.currentUser.reload(); // IMPORTANT
    if (auth.currentUser.emailVerified) {
      setVerified(true);
    } else {
      alert("Email not verified yet. Please click the link in your email.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-5">
        Create Account
      </h2>

      {!verified && <RoleSelector role={role} setRole={setRole} />}

      {!verified && role && (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-200"
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-200"
          />

          {!verificationSent ? (
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 rounded-full bg-teal-600 text-white disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Verification Link"}
            </button>
          ) : (
            <button
              onClick={checkVerification}
              className="w-full py-3 rounded-full bg-gray-800 text-white"
            >
              I have verified my email
            </button>
          )}
        </div>
      )}

      {verified && role === "patient" && <PatientDetailsForm />}
      {verified && role === "center" && <CenterDetailsForm />}

      <p className="text-sm text-center mt-6">
        Already registered?{" "}
        <span onClick={onSwitch} className="text-teal-600 cursor-pointer">
          Log in
        </span>
      </p>
    </div>
  );
}
