import React from "react";

const Button = ({ children, type, onClick }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

export { Button };
