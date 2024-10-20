import { adminPageIndexState } from "@/atoms/adminPageIndexState";
import { useRecoilValue } from "recoil";
import useDeleteModal from "./useDeleteModal";
import axios from "axios";
import { mutate } from "swr";
import { productIdState } from "@/atoms/productIdState";
import { toast } from "react-hot-toast";
import { orderState } from "@/atoms/orderState";
import { filtersState } from "@/atoms/filtersState";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function useDeleteProduct() {
  const t = useTranslations("Loading");
  const { data: session } = useSession();
  const { handleDeleteModal } = useDeleteModal();
  const pageIndex = useRecoilValue(adminPageIndexState);
  const id = useRecoilValue(productIdState);
  const orderBy = useRecoilValue(orderState);
  const filters = useRecoilValue(filtersState);

  const handleDeleteProduct = async () => {
    let loadingToastId = null;

    try {
      loadingToastId = toast.loading(t("text"));
      const deletedProduct = await axios.delete(
        `/api/products/${id}?adminId=${session?.user?.id}`
      );

      toast.dismiss(loadingToastId);

      mutate(
        `/api/products?cursor=${pageIndex}&order=${orderBy}&color=${filters.color}&brand=${filters.brand}&size=${filters.size}&search=${filters.search}`
      );
      mutate(`/api/products/all`);
      handleDeleteModal();
      return toast.success(deletedProduct.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };
  return {
    handleDeleteProduct,
  };
}
