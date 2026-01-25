export default function ClinicHeader({ hospital }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">

      {/* LEFT */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {hospital.centerName}
        </h1>

        <p className="mt-2 mb-4 text-gray-600">
          📍 {hospital.location}
          {hospital.mapLink && (
            <a
              href={hospital.mapLink}
              target="_blank"
              rel="noreferrer"
              className="ml-2 text-teal-600"
            >
              View on Map
            </a>
          )}
        </p>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <span>{hospital.is24x7 ? "24/7 Service" : "Limited Hours"}</span>
          <span>
            {hospital.emergencyService
              ? "Emergency Dialysis Available"
              : "No Emergency Service"}
          </span>
          <span>Type: {hospital.type}</span>

          <span>
            Working Days: {hospital.workingDays.join(", ")}
          </span>

          {!hospital.is24x7 && (
            <span>
              Timings: {hospital.workingHours.open} - {hospital.workingHours.close}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="rounded-3xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
          alt="clinic"
          className="w-full h-64 object-cover"
        />
      </div>
    </div>
  );
}
