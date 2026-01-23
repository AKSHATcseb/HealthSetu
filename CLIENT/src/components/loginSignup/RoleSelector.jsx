export default function RoleSelector({ role, setRole }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {["patient", "center"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`
            py-3 rounded-xl font-semibold capitalize
            transition-all
            ${
              role === r
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }
          `}
        >
          {r === "patient" ? "Patient" : "Dialysis Center"}
        </button>
      ))}
    </div>
  );
}
