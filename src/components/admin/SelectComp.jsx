import React from "react";

export default function SelectComp({ name, children, value, onChange }) {
  return (
    <div className="w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="select border border-neutral w-full text-base"
      >
        {children}
      </select>
    </div>
  );
}
