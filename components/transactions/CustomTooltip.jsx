"use client";

export default function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-lg px-4 py-2 text-sm">
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between gap-2">
            <span className="text-gray-600">{entry.name}:</span>
            <span
              className="font-semibold"
              style={{ color: entry.fill || "#000" }}
            >
              ₹{entry.value.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
