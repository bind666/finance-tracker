import React from "react";

const Input = ({ name, type, placeholder, onChange, value }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="p-2 border rounded"
    />
  );
};

export { Input };
