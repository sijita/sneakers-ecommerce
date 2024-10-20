import React from "react";

export default function UserInfoCard({ title, data }) {
  return (
    <div className="flex gap-3 flex-wrap">
      <p className="text-xl font-medium">{title}</p>
      <p className="text-lg break-all text-base-200">{data}</p>
    </div>
  );
}
