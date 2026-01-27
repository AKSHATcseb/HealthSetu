import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/patientDashboard/Navbar";
import axios from "axios";
import { auth } from "../../firebase";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

export default function ConfirmAppointment() {

  const navigate = useNavigate();
  const location = useLocation();
  const { pid } = useParams();

  const state = location.state;

  // 🔁 Fallback for refresh
  const bookingData =
    state?.bookingData ||
    JSON.parse(localStorage.getItem("bookingData"));

  const filters =
    state?.filters ||
    JSON.parse(localStorage.getItem("filters"));

  const center =
    state?.center ||
    JSON.parse(localStorage.getItem("selectedCenter"));

  const patient =
    state?.patient ||
    JSON.parse(localStorage.getItem("patient"));

  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!bookingData || !center || !filters) {
    return (
      <div className="p-10 text-center text-gray-600">
        No booking data found.
      </div>
    );
  }

  // ⏰ Convert time
  const convertTo24Hour = (time) => {
    if (!time.includes("AM") && !time.includes("PM")) return time;

    let [clock, period] = time.split(" ");
    let [h, m] = clock.split(":").map(Number);

    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  // 💰 Payment values
  const amount = center.cost;
  const upiId = center.upiId;
  

  const upiLink = upiId
    ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(center.name)}&am=${amount}&cu=INR`
    : "";

  // 📌 CONFIRM APPOINTMENT
  const handleConfirm = async () => {

    try {

      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        alert("User not logged in");
        return;
      }

      const token = await user.getIdToken();

      const formattedStartTime = convertTo24Hour(
        bookingData.startTime
      );

      const payload = {
        hospitalId: center._id,
        appointmentDate: filters.date,
        startTime: formattedStartTime,
        durationHours: bookingData.durationHours,
        isEmergency: bookingData.isEmergency,
        upiId: center.upiId,
      };

      const res = await axios.post(
        "http://localhost:8080/api/appointments/book",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const appointment = res.data.appointment;

      navigate("/confirm", {
        state: {
          appointment,
          amount: appointment.amount,
        },
      });

    } catch (err) {

      console.error("Booking failed:", err);

      alert(
        err.response?.data?.message ||
        "Failed to confirm booking"
      );

    } finally {
      setLoading(false);
    }
  };
  console.log("🏥 Selected center FULL:", center);

  console.log(`upiId: ${upiId}`);
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-teal-50 px-4 md:px-10 py-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Confirm Appointment
          </h1>

          <button
            onClick={() => navigate(`/patient/${pid}/bookappointment`)}
            className="px-4 py-2 rounded-xl border border-teal-600 text-teal-600 hover:bg-teal-50 transition font-medium"
          >
            ✏️ Edit Booking
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            <Card title="Patient Details">
              <p className="font-medium">{patient?.name}</p>
              <p className="text-gray-500 text-sm">{patient?.email}</p>
            </Card>

            <Card title="Appointment Details">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <Info label="Date" value={filters.date} />
                <Info label="Start Time" value={bookingData.startTime} />
                <Info label="Duration" value={`${bookingData.durationHours} Hours`} />
                <Info
                  label="Type"
                  value={bookingData.isEmergency ? "Emergency" : "Regular"}
                />
              </div>
            </Card>

            <Card title="Selected Center">

              <p className="text-xl font-bold">{center.name}</p>

              <p className="text-gray-600 text-sm mt-1">
                📍 {center.address.street}, {center.address.city}, {center.address.state} - {center.address.pincode}
              </p>

              <span className="inline-block bg-teal-50 text-teal-700 px-4 py-2 rounded-xl mt-4 text-sm font-medium">
                {bookingData.durationHours} hrs • ₹{amount}
              </span>

            </Card>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">

            <h3 className="font-semibold text-lg mb-5">
              💳 Payment Summary
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span>Session Cost</span>
                <span>₹{amount}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{amount}</span>
              </div>

            </div>

            {!upiId ? (
              <p className="mt-6 text-red-600 text-center font-medium">
                ❌ Payment not available for this center
              </p>
            ) : !showQR ? (

              <button
                onClick={() => setShowQR(true)}
                className="w-full mt-6 py-4 rounded-2xl bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow hover:opacity-90 transition"
              >
                Proceed to Pay
              </button>

            ) : (

              <div className="mt-6 text-center space-y-4">

                <p className="font-semibold text-gray-700">
                  Scan QR to Pay ₹{amount}
                </p>

                <div className="flex justify-center">
                  <QRCodeCanvas value={upiLink} size={220} />
                </div>

                <p className="text-xs text-gray-500">
                  Pay to: {upiId}
                </p>

                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="w-full mt-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : "✅ I Have Paid"}
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}

/* REUSABLE */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}





















// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/patientDashboard/Navbar";
// import axios from "axios";
// import { auth } from "../../firebase";
// import QRCode from "qrcode.react";
// import { useState } from "react";


// export default function ConfirmAppointment() {

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { pid } = useParams();

//   const [showQR, setShowQR] = useState(false);

//   console.log("📍 Location state:", location.state);

//   const state = location.state;

//   // 🔁 Fallback for refresh
//   const bookingData =
//     state?.bookingData ||
//     JSON.parse(localStorage.getItem("bookingData"));

//   const filters =
//     state?.filters ||
//     JSON.parse(localStorage.getItem("filters"));

//   const center =
//     state?.center ||
//     JSON.parse(localStorage.getItem("selectedCenter"));

//   const patient =
//     state?.patient ||
//     JSON.parse(localStorage.getItem("patient"));

//   console.log("📦 bookingData:", bookingData);
//   console.log("📦 filters:", filters);
//   console.log("🏥 center:", center);
//   console.log("👤 patient:", patient);

//   if (!bookingData || !center || !filters) {
//     console.warn("⚠️ Missing booking info");
//     return (
//       <div className="p-10 text-center text-gray-600">
//         No booking data found.
//       </div>
//     );
//   }

//   // 🔄 Convert "9:00 AM" → "09:00"
//   const convertTo24Hour = (time) => {

//     if (!time.includes("AM") && !time.includes("PM")) {
//       return time; // already 24 hr
//     }

//     let [clock, period] = time.split(" ");
//     let [h, m] = clock.split(":").map(Number);

//     if (period === "PM" && h !== 12) h += 12;
//     if (period === "AM" && h === 12) h = 0;

//     return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
//   };

//   // 💳 HANDLE CONFIRM
//   const handleConfirm = async () => {

//     try {

//       // 🔐 Firebase auth
//       const user = auth.currentUser;

//       if (!user) {
//         alert("User not logged in");
//         return;
//       }

//       const token = await user.getIdToken();

//       console.log("🔐 Firebase Token:", token);

//       const formattedStartTime = convertTo24Hour(
//         bookingData.startTime
//       );

//       const payload = {
//         hospitalId: center._id,
//         appointmentDate: filters.date,
//         startTime: formattedStartTime,   // ✅ FIXED
//         durationHours: bookingData.durationHours,
//         isEmergency: bookingData.isEmergency,
//       };

//       console.log("📤 Sending booking payload:", payload);

//       console.log("🚀 Calling backend /api/appointments/book");

//       const res = await axios.post(
//         "http://localhost:8080/api/appointments/book",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("✅ Booking success:", res.data);

//       const appointment = res.data.appointment;

//       navigate("/confirm", {
//         state: {
//           appointment,
//           amount: appointment.amount,
//         },
//       });

//     } catch (err) {

//       console.error("❌ Booking failed FULL ERROR:", err);

//       if (err.response) {
//         console.error("📛 Backend response:", err.response.data);
//         console.error("📛 Status:", err.response.status);
//       } else if (err.request) {
//         console.error("📭 No response received:", err.request);
//       } else {
//         console.error("⚠️ Error message:", err.message);
//       }

//       alert(
//         err.response?.data?.message ||
//         "Failed to confirm booking"
//       );
//     }
//   };

//   const amount = center.cost;
//   const upiLink = `upi://pay?pa=healthsetu@upi&pn=HealthSetu&am=${amount}&cu=INR`;


//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-teal-50 px-4 md:px-10 py-8">

//         {/* TOP BAR */}
//         <div className="flex justify-between items-center mb-8">

//           <h1 className="text-3xl font-bold text-gray-900">
//             Confirm Appointment
//           </h1>

//           <button
//             onClick={() => navigate(`/patient/${pid}/bookappointment`)}
//             className="px-4 py-2 rounded-xl border border-teal-600 text-teal-600 hover:bg-teal-50 transition font-medium"
//           >
//             ✏️ Edit Booking
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* LEFT */}
//           <div className="lg:col-span-2 space-y-6">

//             <Card title="Patient Details">
//               <p className="font-medium text-gray-900">
//                 {patient?.name}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 {patient?.email}
//               </p>
//             </Card>

//             <Card title="Appointment Details">
//               <div className="grid sm:grid-cols-2 gap-4 text-sm">
//                 <Info label="Date" value={filters.date} />
//                 <Info label="Start Time" value={bookingData.startTime} />
//                 <Info label="Duration" value={`${bookingData.durationHours} Hours`} />
//                 <Info
//                   label="Type"
//                   value={bookingData.isEmergency ? "Emergency" : "Regular"}
//                 />
//               </div>
//             </Card>

//             <Card title="Selected Center">

//               <p className="text-xl font-bold">
//                 {center.name}
//               </p>

//               <p className="text-gray-600 text-sm mt-1">
//                 📍 {center.address.street}, {center.address.city}, {center.address.state} - {center.address.pincode}
//               </p>

//               <div className="flex gap-3 mt-4">

//                 <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl text-sm font-medium">
//                   {bookingData.durationHours} hrs • ₹{
//                     // bookingData.durationHours === 4
//                     //   ? center.costPerSession4h
//                     //   : center.costPerSession6h


//                     center.cost
//                   }
//                 </span>

//                 {bookingData.isEmergency && (
//                   <span className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium">
//                     🚑 Emergency Booking
//                   </span>
//                 )}
//               </div>

//             </Card>

//           </div>

//           {/* RIGHT */}
//           <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">

//             <h3 className="font-semibold text-lg mb-5">
//               💳 Payment Summary
//             </h3>

//             <div className="space-y-3 text-sm">

//               <div className="flex justify-between">
//                 <span>Session Cost</span>
//                 <span>
//                   ₹{
//                     center.cost
//                   }
//                 </span>
//               </div>

//               {bookingData.isEmergency && (
//                 <div className="flex justify-between text-red-600">
//                   <span>Emergency Charges</span>
//                   <span>Included</span>
//                 </div>
//               )}

//               <div className="border-t pt-4 flex justify-between font-semibold text-lg">
//                 <span>Total</span>
//                 <span>
//                   ₹{
//                     center.cost
//                   }
//                 </span>
//               </div>

//             </div>

//             {!showQR ? (
//               <button
//                 onClick={() => setShowQR(true)}
//                 className="w-full mt-6 py-4 rounded-2xl bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow hover:opacity-90 transition"
//               >
//                 Proceed to Pay
//               </button>
//             ) : (
//               <div className="mt-6 text-center space-y-4">

//                 <p className="font-semibold text-gray-700">
//                   Scan QR to Pay ₹{amount}
//                 </p>

//                 <div className="flex justify-center">
//                   <QRCode value={upiLink} size={220} />
//                 </div>

//                 <button
//                   onClick={handleConfirm}
//                   className="w-full mt-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:opacity-90 transition"
//                 >
//                   ✅ I Have Paid
//                 </button>

//               </div>
//             )}


//           </div>

//         </div>
//       </div>
//     </>
//   );
// }


// /* Reusable Components */

// function Card({ title, children }) {
//   return (
//     <div className="bg-white rounded-3xl p-6 shadow-sm">
//       <h3 className="font-semibold text-lg mb-4">{title}</h3>
//       {children}
//     </div>
//   );
// }

// function Info({ label, value }) {
//   return (
//     <div>
//       <p className="text-gray-400 text-xs">{label}</p>
//       <p className="font-medium text-gray-800">{value}</p>
//     </div>
//   );
// }
