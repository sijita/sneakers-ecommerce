"use client"
import React from "react";

export default function TableFooter({
    data
}) {
  return (
    <tr>
      <th>Showin: 1-10</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th>1</th>
      <th className="space-x-2">
        <button className="btn btn-sm btn-outline border-neutral">{"<"}</button>
        <button className="btn btn-sm btn-outline border-neutral">{">"}</button>
      </th>
    </tr>
  );
}
