function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-indigo-200 rounded-md shadow-lg px-4 py-2 text-sm">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-indigo-600 font-bold">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;