import { adminPageIndexState } from "@/atoms/adminPageIndexState";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { mutate } from "swr";
import { toast } from "react-hot-toast";
import { orderState } from "@/atoms/orderState";
import { filtersState } from "@/atoms/filtersState";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { productDetailsState } from "@/atoms/productDetailsState";

export default function useAddForm() {
  const t = useTranslations("Admin.product");
  const t2 = useTranslations("Loading");
  const { data: session } = useSession();
  const orderBy = useRecoilValue(orderState);
  const filters = useRecoilValue(filtersState);
  const pageIndex = useRecoilValue(adminPageIndexState);
  const [productDetails, setProductDetails] =
    useRecoilState(productDetailsState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loadingToastId;

    const formData = new FormData();
    formData.append("nombre", e.target.nombre.value);
    formData.append("categoria", e.target.categoria.value);
    formData.append("marca", e.target.marca.value);
    formData.append("precio", e.target.precio.value);
    const imagenFiles = Array.from(e.target.imagen.files);
    imagenFiles.forEach((file) => formData.append("imagen", file));
    formData.append("descripcion", e.target.descripcion.value);
    formData.append("tallas", JSON.stringify(productDetails));
    formData.append("adminId", session.user.id);
    formData.append("descripcionEng", e.target.descripcionEng.value);

    try {
      if (
        e.target.imagen.files.length === 0 ||
        e.target.nombre.value === "" ||
        !productDetails.length ||
        e.target.categoria.value === "0" ||
        e.target.marca.value === "" ||
        e.target.precio.value === "" ||
        e.target.descripcion.value === "" ||
        e.target.descripcionEng.value === ""
      )
        return toast.error(t("requiredFields"));

      loadingToastId = toast.loading(t2("text"));

      const newProduct = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      e.target.reset();
      setProductDetails([]);

      toast.dismiss(loadingToastId);

      mutate(
        `/api/products?cursor=${pageIndex}&order=${orderBy}&color=${filters.color}&brand=${filters.brand}&size=${filters.size}&search=${filters.search}`
      );
      mutate(`/api/products/all`);

      return toast.success(newProduct.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  return {
    handleSubmit,
    productDetails,
    setProductDetails,
  };
}
