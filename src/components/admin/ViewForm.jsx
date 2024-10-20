import useIdProduct from "@/hooks/useIdProduct";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ViewForm() {
  const t = useTranslations("Loading");
  const { id } = useIdProduct();
  const { data: product, isLoading } = useSWR(`/api/products/${id}`, fetcher);

  if (isLoading) return toast.loading(t("text"));

  if (product) toast.dismiss();

  return (
    <div className="flex flex-col gap-5 pt-5">
      {!isLoading && (
        <>
          <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 justify-items-center gap-5 rounded-md">
            {product.imagen.slice(0, 3).map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={product.nombre}
                width={180}
                height={180}
                className="rounded-md"
              />
            ))}
          </div>
          <input
            type="text"
            className="input border border-neutral"
            value={product.nombre}
            readOnly
          />
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 ">
            {product.productoTallaColor.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 border border-neutral p-3 rounded-md flex-1"
              >
                <p>Talla: {item.talla}</p>
                <p>Stock: {item.stock}</p>
                <p>Color: {item.color}</p>
              </div>
            ))}
          </div>
          <input
            type="text"
            className="input border border-neutral"
            value={product.categoria.nombre}
            readOnly
          />
          <input
            type="text"
            className="input border border-neutral"
            value={product.marca}
            readOnly
          />
          <input
            type="text"
            className="input border border-neutral"
            value={product.precio}
            readOnly
          />
          <div className="w-full">
            <textarea
              name="descripcion"
              className="textarea border-neutral w-full text-base max-h-20"
              value={product.descripcion}
              readOnly
            ></textarea>
          </div>
        </>
      )}
    </div>
  );
}
