import useAddForm from "@/hooks/admin/useAddForm";
import InputComp from "./InputComp";
import SelectComp from "./SelectComp";
import SizeStockForm from "./SizeStockForm";
import { HiTrash } from "react-icons/hi";

export default function AddForm({
  namePlaceholder,
  sizePlaceholder,
  categoryPlaceholder,
  brandPlaceholder,
  pricePlaceholder,
  colorPlaceholder,
  descriptionPlaceholder,
  descriptionEnPlaceholder,
  saveBtnText,
  stockPlaceholder,
  addSizeBtnText,
}) {
  const { handleSubmit, productDetails, setProductDetails } = useAddForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-5">
      <div className="w-full">
        <input
          name="imagen"
          type="file"
          accept="image/*"
          className="file-input border border-neutral file-input-sm w-full file-input-secondary"
          multiple
        />
      </div>
      <InputComp type="text" placeholder={namePlaceholder} name="nombre" />
      <div className="w-full flex flex-col gap-5">
        <SizeStockForm
          sizePlaceholder={sizePlaceholder}
          stockPlaceholder={stockPlaceholder}
          addSizeBtnText={addSizeBtnText}
          colorPlaceholder={colorPlaceholder}
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {productDetails.map(({ size, stock, color }, index) => (
            <li
              key={index}
              className="px-3 py-2 rounded-md border border-neutral flex gap-3 items-center justify-between"
            >
              <div>
                <p>Talla: {size}</p>
                <p>Color: {color}</p>
                <p>Stock: {stock}</p>
              </div>
              <button
                className="btn btn-secondary btn-xs btn-square"
                onClick={() =>
                  setProductDetails(
                    productDetails.filter((item, i) => i !== index)
                  )
                }
              >
                <HiTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <SelectComp name="categoria">
        <option value="0">{categoryPlaceholder}</option>
        <option value="1">Hombre</option>
        <option value="2">Mujer</option>
        <option value="3">Niño</option>
      </SelectComp>
      <InputComp type="text" placeholder={brandPlaceholder} name="marca" />
      <InputComp type="number" placeholder={pricePlaceholder} name="precio" />
      <div className="w-full">
        <textarea
          name="descripcion"
          className="textarea border-neutral w-full text-base max-h-20"
          placeholder={descriptionPlaceholder}
        ></textarea>
      </div>
      <div className="w-full">
        <textarea
          name="descripcionEng"
          className="textarea border-neutral w-full text-base max-h-20"
          placeholder={descriptionEnPlaceholder}
        ></textarea>
      </div>
      <button className="btn btn-outline border-neutral w-full">
        {saveBtnText}
      </button>
    </form>
  );
}
