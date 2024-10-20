"use client";
import ProductDetails from "@/components/shop/ProductDetails";
import ReviewModal from "@/components/shop/ReviewModal";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NoDataDisplay from "@/components/ui/NoDataDisplay";
import useReviewModal from "@/hooks/reviews/useReviewModal";
import useIdProduct from "@/hooks/useIdProduct";
import axios from "axios";
import useSWR from "swr";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Page({ params: { locale } }) {
  const t = useTranslations("Shop.productDetails");
  const r = useTranslations("Shop.review");
  const { id } = useIdProduct();
  const { data, isLoading, error } = useSWR(`/api/products/${id}`, fetcher);
  const { isOpen, handleReviewModal } = useReviewModal();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return <ErrorDisplay />;
  }

  if (!data) {
    return <NoDataDisplay content={t("noData")} />;
  }

  const sizesStock = data?.productoTallaColor.map(
    ({ id, talla, stock, color, colorEng }) => {
      return { id, talla, stock, color: locale === "es" ? color : colorEng };
    }
  );

  return (
    <div className="container mx-auto p-10 md:p-20">
      <ReviewModal
        isOpen={isOpen}
        closeModal={handleReviewModal}
        productId={data?.id}
        title={r("title")}
        ratingPlaceholder={r("rating")}
        reviewPlaceholder={r("review")}
        saveBtnText={r("saveBtnText")}
      />
      <ProductDetails
        id={data?.id}
        name={data?.nombre}
        image={data?.imagen}
        category={data?.categoria.nombre}
        price={data?.precio}
        description={locale === "es" ? data?.descripcion : data?.descripcionEng}
        sizesStock={sizesStock}
        calificaciones={data?.calificacion}
        locale={locale}
      />
    </div>
  );
}
