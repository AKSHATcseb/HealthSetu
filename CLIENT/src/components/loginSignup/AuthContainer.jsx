import { AnimatePresence, motion } from "framer-motion";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import LogoPanel from "./LogoPanel";

export default function AuthContainer({ mode, setMode }) {
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50 overflow-hidden">
      
      {/* LEFT SIDE */}
      <div className="h-full flex items-center justify-center px-6 py-5">
        {isLogin ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="login"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <LoginForm onSwitch={() => setMode("register")} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <LogoPanel />
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="h-full flex items-center justify-center px-6 py-5">
        {isLogin ? (
          <LogoPanel />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="register"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <RegisterForm onSwitch={() => setMode("login")} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
