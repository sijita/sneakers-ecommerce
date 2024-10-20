import { HiStar } from "react-icons/hi";

const ProductRating = ({ rating, setRating }) => {
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= rating ? "text-yellow-500" : "text-gray-300";
      stars.push(
        <HiStar
          key={i}
          size={30}
          className={`cursor-pointer ${starClassName}`}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars()}
      <span className="ml-2">{rating}</span>
    </div>
  );
};

export default ProductRating;
