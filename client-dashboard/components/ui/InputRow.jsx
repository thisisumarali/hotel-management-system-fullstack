import React from "react";

const InputRow = ({ label, id, children, error }) => {
  return (
    <div className="grid grid-cols-3 items-start gap-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {children}

      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default InputRow;
