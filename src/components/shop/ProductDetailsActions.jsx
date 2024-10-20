import useLikeProduct from "@/hooks/favorites/useLikeProduct";
import useProductCart from "@/hooks/cart/useProductCart";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiHeart, HiOutlineHeart, HiShoppingBag } from "react-icons/hi";
import { useTranslations } from "next-intl";

export default function ProductDetailsActions({
  id,
  size,
  quantity,
  price,
  color,
  locale
}) {
  const t = useTranslations("Shop.productDetails");
  const { handleAddProductCart } = useProductCart();
  const { handleLike, favorites, handleUnlike, status } = useLikeProduct();
  const isLiked = favorites?.find((favorite) => favorite.productoId == id);
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-5 w-full">
      <button
        onClick={() =>
          isLiked
            ? handleUnlike(isLiked.id)
            : status === "authenticated"
            ? handleLike(id)
            : router.push("/login")
        }
        className="btn btn-outline border-neutral w-full flex-1"
      >
        {isLiked ? (
          <>
            {t("removeFromFavorites")}
            <HiHeart />
          </>
        ) : (
          <>
            {t("addToFavorites")}
            <HiOutlineHeart />
          </>
        )}
      </button>
      <button
        onClick={() =>
          size && quantity && color
            ? handleAddProductCart({
                id,
                size,
                quantity,
                price,
                color,
                locale
              })
            : toast.error(t("noSelectedData"))
        }
        className="btn btn-secondary w-full flex-1"
      >
        {t("addToCart")} <HiShoppingBag />
      </button>
    </div>
  );
}
