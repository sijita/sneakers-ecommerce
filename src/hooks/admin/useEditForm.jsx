import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productState } from "@/atoms/productState";
import useEditModal from "./useEditModal";
import axios from "axios";
import { adminPageIndexState } from "@/atoms/adminPageIndexState";
import { mutate } from "swr";
import useIdProduct from "../useIdProduct";
import { toast } from "react-hot-toast";
import { orderState } from "@/atoms/orderState";
import { filtersState } from "@/atoms/filtersState";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import { productDetailsState } from "@/atoms/productDetailsState";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useEditForm() {
  const t = useTranslations("Admin.product");
  const t2 = useTranslations("Loading");
  const [productDetails, setProductDetails] =
    useRecoilState(productDetailsState);
  const { id, setId } = useIdProduct();
  const { data, isLoading } = useSWR(`/api/products/${id}`, fetcher);
  const { data: session } = useSession();
  const [product, setProduct] = useRecoilState(productState);
  const { isOpen } = useEditModal();
  const pageIndex = useRecoilValue(adminPageIndexState);
  const orderBy = useRecoilValue(orderState);
  const filters = useRecoilValue(filtersState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    product?.nuevasImagenes?.forEach((file) =>
      formData.append("imagenes", file)
    );

    formData.append("nombre", product.nombre);
    formData.append("estado", product.estado);
    formData.append("categoriaId", product.categoriaId);
    formData.append("marca", product.marca);
    formData.append("precio", product.precio);
    formData.append("descripcion", product.descripcion);
    formData.append("descripcionEng", product.descripcionEng);
    formData.append("tallas", JSON.stringify(productDetails));
    formData.append("adminId", session.user.id);
    formData.append("imagenesExistentes", JSON.stringify(product.imagenes));

    if (
      !product.nombre ||
      !product.categoriaId ||
      !product.marca ||
      !product.precio ||
      !product.descripcion ||
      !productDetails.length ||
      !product.descripcionEng
    ) {
      return toast.error(t("requiredFields"));
    }

    let loadingToastId;

    try {
      loadingToastId = toast.loading(t2("text"));
      const res = await axios.put(`/api/products/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.dismiss(loadingToastId);

      mutate(`/api/products/${product.id}`);
      mutate(
        `/api/products?cursor=${pageIndex}&order=${orderBy}&color=${filters.color}&brand=${filters.brand}&size=${filters.size}&search=${filters.search}`
      );
      mutate(`/api/cart`);
      mutate(`/api/products/all`);

      return toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    toast.loading(t2("text"));
    if (data) {
      toast.dismiss();
      setProduct({
        id: data.id,
        estado: data.estado,
        nombre: data.nombre,
        categoriaId: data.categoriaId,
        marca: data.marca,
        precio: data.precio,
        descripcion: data.descripcion,
        descripcionEng: data.descripcionEng,
        imagenes: data.imagen,
      });
    }

    data?.productoTallaColor.map(({ id, color, colorEng, talla, stock }) => {
      if (
        !productDetails?.find(
          (item) =>
            item?.id === id ||
            (item?.size === talla && item?.color === `${color}, ${colorEng}`)
        )
      ) {
        setProductDetails((prev) => [
          ...prev,
          { id, size: talla, stock, color: `${color}, ${colorEng}` },
        ]);
      }
    });

    return () => toast.dismiss();
  }, [data]);

  useEffect(() => {
    if (!isOpen) {
      setId(0);
      setProductDetails([]);
    }
  }, [isOpen]);

  return {
    isLoading,
    handleSubmit,
    product,
    setProduct,
    data,
    productDetails,
    setProductDetails,
  };
}
