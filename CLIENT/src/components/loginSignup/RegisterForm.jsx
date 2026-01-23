import { useState } from "react";
import RoleSelector from "./RoleSelector";
import PatientDetailsForm from "./PatientDetailsForm";
import CenterDetailsForm from "./CenterVerificationForm";

export default function RegisterForm({ onSwitch }) {
  const [role, setRole] = useState(null);
  const [verified, setVerified] = useState(false);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-800">
        Create Account
      </h2>

      <p className="text-gray-500 mt-1 mb-4">
        Register to use HealthSetu services
      </p>

      {/* ROLE SELECTION */}
      {!verified && (
        <RoleSelector role={role} setRole={setRole} />
      )}

      {/* EMAIL + PASSWORD */}
      {!verified && role && (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600"
          />

          <input
            type="password"
            placeholder="Create password"
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600"
          />

          <button
            onClick={() => setVerified(true)}
            className="w-full py-3 rounded-full bg-teal-600 text-white font-semibold"
          >
            Send Verification Link
          </button>
        </div>
      )}

      {/* AFTER VERIFICATION */}
      {verified && role === "patient" && <PatientDetailsForm />}
      {verified && role === "center" && <CenterDetailsForm />}

      <p className="text-sm text-gray-500 text-center mt-6">
        Already registered?{" "}
        <span
          onClick={onSwitch}
          className="text-teal-600 cursor-pointer font-medium"
        >
          Log in
        </span>
      </p>
    </div>
  );
}
