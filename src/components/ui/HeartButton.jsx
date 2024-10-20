"use cliente";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import useLikeProduct from "@/hooks/favorites/useLikeProduct";
import { useRouter } from "next/navigation";

export default function HeartButton({ id }) {
  const { handleLike, favorites, handleUnlike, status } = useLikeProduct();
  const router = useRouter();
  const isLiked = favorites?.find((favorite) => favorite.productoId == id);

  return (
    <button className="absolute right-3 top-2 z-10">
      {isLiked ? (
        <HiHeart
          className="text-2xl text-black"
          onClick={() => handleUnlike(isLiked.id)}
        />
      ) : (
        <HiOutlineHeart
          className="text-2xl text-black"
          onClick={() =>
            status === "unauthenticated"
              ? router.push("/login")
              : handleLike(id)
          }
        />
      )}
    </button>
  );
}
