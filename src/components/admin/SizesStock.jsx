import { HiTrash } from "react-icons/hi";

export default function SizesStock({
  productDetails,
  setProductDetails,
  sizePlaceholder,
  stockPlaceholder,
  colorPlaceholder,
}) {
  return (
    <ul className="grid grid-cols-1 gap-5">
      {productDetails.map(({ id, size, stock, color }, index) => (
        <li
          key={index}
          className="flex justify-between items-center gap-5 border border-neutral p-3 rounded-md"
        >
          <div className="flex flex-col min-[380px]:flex-row gap-5">
            <input
              type="text"
              value={size}
              className="input border border-neutral w-full input-sm"
              placeholder={sizePlaceholder}
              onChange={(e) =>
                setProductDetails((prev) =>
                  prev.map((item) =>
                    item.id
                      ? item.id === id
                        ? { ...item, size: e.target.value }
                        : item
                      : item.size === size && item.color === color
                      ? { ...item, size: e.target.value }
                      : item
                  )
                )
              }
            />
            <input
              type="text"
              value={color}
              className="input border border-neutral w-full input-sm"
              placeholder={colorPlaceholder}
              onChange={(e) =>
                setProductDetails((prev) =>
                  prev.map((item) =>
                    item.id
                      ? item.id === id
                        ? { ...item, color: e.target.value }
                        : item
                      : item.size === size && item.color === color
                      ? { ...item, color: e.target.value }
                      : item
                  )
                )
              }
            />
            <input
              type="number"
              value={stock}
              className="input border border-neutral w-full input-sm"
              placeholder={stockPlaceholder}
              onChange={(e) =>
                setProductDetails((prev) =>
                  prev.map((item) =>
                    item.id
                      ? item.id === id
                        ? { ...item, stock: e.target.value }
                        : item
                      : item.size === size && item.color === color
                      ? { ...item, stock: e.target.value }
                      : item
                  )
                )
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-xs btn-square"
              onClick={() =>
                setProductDetails((prev) =>
                  prev.filter((item) =>
                    item.id
                      ? item.id !== id
                      : item.size !== size && item.color !== color
                  )
                )
              }
            >
              <HiTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
