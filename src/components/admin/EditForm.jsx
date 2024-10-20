"use client";
import useEditForm from "@/hooks/admin/useEditForm";
import InputComp from "./InputComp";
import SelectComp from "./SelectComp";
import SizeStockForm from "./SizeStockForm";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import ImageEditForm from "./ImageEditForm";
import SizesStock from "./SizesStock";

export default function EditForm({
  brandPlaceholder,
  categoryPlaceholder,
  colorPlaceholder,
  descriptionPlaceholder,
  descriptionEnPlaceholder,
  pricePlaceholder,
  editBtnText,
  sizePlaceholder,
  namePlaceholder,
  stockPlaceholder,
  addSizeBtnText,
}) {
  const {
    handleSubmit,
    product,
    setProduct,
    isLoading,
    productDetails,
    setProductDetails,
  } = useEditForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {!isLoading && (
        <>
          <SelectComp
            name="categoria"
            value={product.estado || ""}
            onChange={(e) => setProduct({ ...product, estado: e.target.value })}
          >
            <option value="0">Desactivado</option>
            <option value="1">Activado</option>
          </SelectComp>
          <ImageEditForm
            images={product.imagenes}
            setImages={setProduct}
            product={product}
          />
          <InputComp
            name="nombre"
            type="text"
            placeholder={namePlaceholder}
            value={product.nombre || ""}
            onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
          />
          <div className="w-full flex flex-col gap-5">
            <SizeStockForm
              sizePlaceholder={sizePlaceholder}
              stockPlaceholder={stockPlaceholder}
              addSizeBtnText={addSizeBtnText}
              colorPlaceholder={colorPlaceholder}
            />
            <SizesStock
              colorPlaceholder={colorPlaceholder}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              sizePlaceholder={sizePlaceholder}
              stockPlaceholder={stockPlaceholder}
            />
          </div>
          <SelectComp
            name="categoria"
            value={product.categoriaId || ""}
            onChange={(e) =>
              setProduct({ ...product, categoriaId: e.target.value })
            }
          >
            <option value="0">{categoryPlaceholder}</option>
            <option value="1">Hombre</option>
            <option value="2">Mujer</option>
            <option value="3">Niño</option>
          </SelectComp>
          <InputComp
            name="marca"
            type="text"
            placeholder={brandPlaceholder}
            value={product.marca || ""}
            onChange={(e) => setProduct({ ...product, marca: e.target.value })}
          />
          <InputComp
            name="precio"
            type="number"
            placeholder={pricePlaceholder}
            value={product.precio || ""}
            onChange={(e) => setProduct({ ...product, precio: e.target.value })}
          />
          <div className="w-full">
            <textarea
              name="descripcion"
              className="textarea border-neutral w-full text-base max-h-20"
              placeholder={descriptionPlaceholder}
              value={product.descripcion || ""}
              onChange={(e) =>
                setProduct({ ...product, descripcion: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <textarea
              name="descripcionEng"
              className="textarea border-neutral w-full text-base max-h-20"
              placeholder={descriptionEnPlaceholder}
              value={product.descripcionEng || ""}
              onChange={(e) =>
                setProduct({ ...product, descripcionEng: e.target.value })
              }
            />
          </div>
          <button className="btn btn-outline border-neutral w-full">
            {editBtnText}
          </button>
        </>
      )}
    </form>
  );
}
