import React from "react";
import { HiStar } from "react-icons/hi";

export default function Rating({ rating }) {
  return (
    <div className="absolute left-5 top-5 flex gap-3">
      <HiStar className="text-2xl text-primary" />
      <h2 className="font-bold text-black">{rating}</h2>
    </div>
  );
}
