import React from "react";
import { HiStar } from "react-icons/hi";

const Rating = ({ rating }) => {
  const stars = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    i <= rating
      ? stars.push(
          <HiStar key={i} className={`h-5 w-5 inline-block text-yellow-400`} />
        )
      : stars.push(
          <HiStar key={i} className={`h-5 w-5 inline-block text-gray-400`} />
        );
  }

  return <div>{stars}</div>;
};

export default Rating;
