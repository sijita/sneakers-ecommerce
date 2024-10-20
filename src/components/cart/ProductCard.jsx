"use client";
import { HiHeart, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";
import useProductCart from "@/hooks/cart/useProductCart";
import Image from "next/image";
import useLikeProduct from "@/hooks/favorites/useLikeProduct";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function ProductCard({
  name,
  image,
  price,
  size,
  color,
  id,
  category,
  quantity,
  productId,
  locale
}) {
  const t = useTranslations("Cart");
  const { handleRemoveProductCart, handleProductQuantity } = useProductCart();
  const { handleLike, favorites, handleUnlike, status } = useLikeProduct();
  const isLiked = favorites?.find(
    (favorite) => favorite.productoId == productId
  );
  const router = useRouter();

  return (
    <div className="rounded-lg">
      <div className="rounded-md border border-neutral p-6 flex flex-col lg:flex-row gap-8">
        <Image
          src={image}
          alt={name}
          className="w-full rounded-md lg:w-40 h-52 sm:h-32 object-cover object-center"
          height={500}
          width={500}
        />
        <div className="flex md:flex-row flex-col justify-between w-full gap-8">
          <div className="flex flex-col gap-1">
            <div className="flex gap-5 items-start">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-5">
                {name}
              </h2>
              <button>
                {isLiked ? (
                  <HiHeart size={21} onClick={() => handleUnlike(isLiked.id)} />
                ) : (
                  <HiOutlineHeart
                    size={21}
                    onClick={() =>
                      status === "unauthenticated"
                        ? router.push("/login")
                        : handleLike(productId)
                    }
                  />
                )}
              </button>
            </div>
            <p className="text-base text-base-200 uppercase">
              {locale === "es"
                ? category
                : category === "Hombre"
                ? "Man"
                : category === "Mujer"
                ? "Woman"
                : "Kids"}{" "}
              - {size} EU
            </p>
            <p className="text-base text-base-200 uppercase">{color}</p>
          </div>
          <div className="flex flex-col min-[435px]:flex-row md:flex-col gap-5 items-center md:items-end justify-between md:justify-between">
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    handleProductQuantity({
                      id,
                      quantity: quantity - 1,
                      price,
                      color,
                      size,
                    });
                  } else {
                    toast.error(t("less"));
                  }
                }}
                className="btn btn-sm btn-neutral border-none rounded-r-none rounded-md text-secondary"
              >
                -
              </button>
              <input
                className="btn btn-sm btn-square btn-disabled read-only:text-base-200 border-neutral rounded-none bg-neutral/25 text-center"
                type="number"
                min="1"
                max="10"
                value={quantity}
                readOnly
              />
              <button
                onClick={() => {
                  if (quantity < 10) {
                    handleProductQuantity({
                      id,
                      quantity: quantity + 1,
                      price,
                      color,
                      size,
                    });
                  } else {
                    toast.error(t("greater"));
                  }
                }}
                className="btn btn-sm btn-neutral border-none rounded-l-none rounded-md text-secondary"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveProductCart(id)}
                className="btn btn-outline border-neutral btn-sm btn-square ml-3"
              >
                <HiOutlineTrash size={20} />
              </button>
            </div>
            <div className="flex items-center order-first md:order-last">
              <p className="text-md font-semibold">
                $ {price.toLocaleString("es-CO")} COP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
