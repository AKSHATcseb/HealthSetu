import { useState } from "react";
import AuthContainer from "../../components/loginSignup/AuthContainer";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return <AuthContainer mode={mode} setMode={setMode} />;
}
