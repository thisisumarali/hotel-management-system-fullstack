import React from "react";

const CheckBox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor=""></label>
    </div>
  );
};

export default CheckBox;
