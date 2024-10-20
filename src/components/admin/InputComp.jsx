import React from "react";

export default function InputComp({ type, placeholder, name, onChange, value }) {
  return (
    <div className="w-full">
      <input
        className="input border border-neutral w-full placeholder:text-base"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
