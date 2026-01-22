const PricingCard = () => {
  return (
    <div className=" bg-gray-100 rounded-xl p-5 space-y-4">
      <h3 className="font-semibold">Pricing Management</h3>

      {[
        ["Hemodialysis", "150"],
        ["Peritoneal Dialysis", "200"],
        ["CRRT", "450"],
      ].map((p) => (
        <div key={p[0]}>
          <p className="text-xs text-slate-500">{p[0].toUpperCase()}</p>
          <div className="flex gap-2 mt-1 ">
            <input
              value={`$ ${p[1]}.00`}
              className="border rounded-lg px-3 py-2 w-full bg-gray-200 border-gray-200"
              readOnly
            />
            <button className="bg-teal-100 text-teal-800 px-4 rounded-lg hover:bg-teal-600 hover:text-white cursor-pointer">
              Update
            </button>
          </div>
        </div>
      ))}

      <p className="text-xs text-slate-400">
        Last price update: 2 hours ago by Dr. Sharma
      </p>
    </div>
  );
};

export default PricingCard;
