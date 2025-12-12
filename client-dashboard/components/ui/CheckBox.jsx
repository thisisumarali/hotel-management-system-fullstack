import React from "react";

const CheckBox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <div className="border rounded-sm overflow-hidden shadow-sm my-6 gap-4 bg-white text-base flex items-center p-6">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="w-5 h-5"
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </div>
  );
};

export default CheckBox;
