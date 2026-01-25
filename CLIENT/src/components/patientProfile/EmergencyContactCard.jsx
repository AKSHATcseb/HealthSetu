export default function EmergencyContactCard({ contact }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 text-gray-900">
        Emergency Contact
      </h3>

      <div className="space-y-3 text-sm">
        <Info label="Name" value={contact?.name} />
        <Info label="Relation" value={contact?.relation} />
        <Info label="Phone" value={contact?.phone} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}



















// import { Phone } from "lucide-react";

// export default function EmergencyContactCard() {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="bg-red-100 text-red-600 p-2 rounded-xl">
//           <Phone size={20} />
//         </div>

//         <h3 className="font-semibold text-lg text-gray-900">
//           Emergency Contact
//         </h3>
//       </div>

//       <div className="space-y-3 text-sm">
//         <div>
//           <p className="text-gray-500">Name</p>
//           <p className="font-medium text-gray-800">
//             Sunita Sharma
//           </p>
//         </div>

//         <div>
//           <p className="text-gray-500">Relation</p>
//           <p className="font-medium text-gray-800">
//             Spouse
//           </p>
//         </div>

//         <div>
//           <p className="text-gray-500">Phone</p>
//           <p className="font-medium text-gray-800">
//             +91 91234 56789
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
