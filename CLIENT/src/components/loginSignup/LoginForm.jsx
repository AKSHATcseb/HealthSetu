export default function LoginForm({ onSwitch }) {
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
          className="
            w-full px-4 py-3 rounded-xl
            bg-gray-200 text-gray-600
            outline-none focus:ring-2 focus:ring-teal-500
          "
        />

        <input
          type="password"
          placeholder="Password"
          className="
            w-full px-4 py-3 rounded-xl
            bg-gray-200 text-gray-600
            outline-none focus:ring-2 focus:ring-teal-500
          "
        />
      </div>

      <button
        className="
          w-full mt-6 py-3 rounded-full
          bg-teal-600 text-white font-semibold
          hover:bg-teal-700 transition
        "
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
