import React from "react";

const Spinner = ({ size = 24 }: { size?: number }) => {
  return (
    <div
      className={`inline-block border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin`}
      style={{
        width: size,
        height: size,
        borderWidth: size / 8,
      }}
    ></div>
  );
};

export default Spinner;
