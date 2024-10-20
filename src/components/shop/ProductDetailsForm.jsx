import useQuantitySize from "@/hooks/shop/useQuantitySize";
import { useTranslations } from "next-intl";

export default function ProductDetailsForm({ sizes = [], price = 0 }) {
  const t = useTranslations("Shop.productDetails");
  const {
    size,
    quantity,
    handleSetSize,
    handleSetColor,
    handleIncrementQuantity,
    handleDecrementQuantity,
  } = useQuantitySize();

  const uniqueSizes = [...new Set(sizes.map(({ talla }) => talla))];

  return (
    <div className="bg-neutral/25 px-8 py-5 flex flex-col gap-8 sm:flex-row justify-between rounded-md">
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <span className="text-sm uppercase">{t("quantity")}</span>
        <div className="flex items-center">
          <button
            onClick={handleDecrementQuantity}
            className="btn btn-sm btn-neutral border-none rounded-r-none rounded-md text-secondary"
          >
            -
          </button>
          <input
            className="btn btn-sm btn-square btn-disabled read-only:text-secondary border-neutral rounded-none bg-neutral/25 text-center"
            type="number"
            min="1"
            max="10"
            value={quantity}
            readOnly
          />
          <button
            onClick={handleIncrementQuantity}
            className="btn btn-sm btn-neutral border-none rounded-l-none rounded-md text-secondary"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <span className="text-sm uppercase">{t("size")}</span>
        <select onChange={handleSetSize} className="w-full select select-sm">
          <option value="0">0</option>
          {uniqueSizes.map((talla, index) => (
            <option key={index} value={talla}>
              {talla}
            </option>
          ))}
        </select>
      </div>
      {
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <span className="text-sm uppercase">{t("color")}</span>
          <select onChange={handleSetColor} className="w-full select select-sm">
            <option value="0">{t("selectColor")}</option>
            {sizes
              .filter(({ talla }) => size === talla)
              .map(({ id, color }) => (
                <option key={id} value={color}>
                  {color}
                </option>
              ))}
          </select>
        </div>
      }
      <div className="flex flex-col justify-center items-center sm:items-start">
        <span className="text-2xl font-extrabold">
          $ {price.toLocaleString("es-CO")}
        </span>
      </div>
    </div>
  );
}
