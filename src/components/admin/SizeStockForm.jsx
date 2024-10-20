import { useState } from "react";
import { useRecoilState } from "recoil";
import { productDetailsState } from "@/atoms/productDetailsState";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function SizeStockForm({
  sizePlaceholder,
  stockPlaceholder,
  addSizeBtnText,
  colorPlaceholder,
}) {
  const t = useTranslations("SizeStockForm");
  const [productDetails, setProductDetails] =
    useRecoilState(productDetailsState);
  const [sizes, setSizes] = useState({
    size: "",
    stock: "",
    color: "",
  });

  const handleSubmit = () => {
    if (!sizes.size || !sizes.stock || !sizes.color)
      return toast.error(t("requiredFields"));

    const existingSizeColor = productDetails.find(
      (item) => item.size === sizes.size && item.color === sizes.color
    );

    if (existingSizeColor) {
      return toast.error(t("existingSize"));
    } else {
      setProductDetails((prev) => [...prev, sizes]);

      setSizes({
        size: "",
        stock: "",
        color: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col min-[380px]:flex-row gap-5">
        <div className="grow">
          <input
            type="text"
            value={sizes.size}
            onChange={(e) => setSizes({ ...sizes, size: e.target.value })}
            className="input border border-neutral w-full"
            placeholder={sizePlaceholder}
          />
        </div>
        <div className="grow">
          <input
            type="text"
            value={sizes.color}
            onChange={(e) => setSizes({ ...sizes, color: e.target.value })}
            className="input border border-neutral w-full"
            placeholder={colorPlaceholder}
          />
        </div>
        <div className="grow">
          <input
            type="number"
            value={sizes.stock}
            onChange={(e) => setSizes({ ...sizes, stock: e.target.value })}
            className="input border border-neutral w-full"
            placeholder={stockPlaceholder}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleSubmit()}
        className="btn btn-secondary btn-sm"
      >
        {addSizeBtnText}
      </button>
    </div>
  );
}
