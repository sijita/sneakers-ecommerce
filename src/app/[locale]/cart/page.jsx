"use client";
import ProductCard from "@/components/cart/ProductCard";
import OrdenDetails from "@/components/cart/OrdenDetails";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useProductCart from "@/hooks/cart/useProductCart";
import { useTranslations } from "next-intl";

export default function Page({ params: { locale } }) {
  const t = useTranslations("Cart");
  const { cart, isLoading, error, status } = useProductCart();

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-10 items-center justify-center h-screen">
        <p className="text-center text-3xl font-bold">{t("unauthenticated")}</p>
        <Link href="/login" className="btn btn-outline border-neutral btn-wide">
          {t("login")}
        </Link>
      </div>
    );
  }

  if (isLoading || !cart) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  const noData = cart.every((data) => {
    return Object.keys(data).length === 0;
  });

  if (noData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-3xl font-bold">{t("emptyCart")}</p>
      </div>
    );
  }

  const subTotal = cart
    .map((product) => product.subtotal)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-16">
      <div className="flex flex-col flex-1 gap-8">
        {cart.map((data, i) => (
          <ProductCard
            key={i}
            id={data.id}
            name={data.producto.nombre}
            productId={data.producto.id}
            category={data.producto.categoria.nombre}
            image={data.producto.imagen[0]}
            price={data.producto.precio}
            size={data.talla}
            color={data.color}
            quantity={data.cantidad}
            locale={locale}
          />
        ))}
      </div>
      <OrdenDetails
        subtotal={subTotal}
        shipping={20000}
        total={subTotal + 20000}
      />
    </div>
  );
}
