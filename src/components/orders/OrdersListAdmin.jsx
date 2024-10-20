import Image from "next/image";
import { useTranslations } from "next-intl";
import OrdersUpdateForm from "./OrdersUpdateForm";

export default function OrdersListAdmin({ ordersAdmin }) {
  const t = useTranslations("Orders");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
      {ordersAdmin?.map((order) => (
        <div
          className="flex flex-col p-10 gap-5 border border-neutral rounded-md"
          key={order.id}
        >
          <div className="flex justify-between gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-xl font-bold">ID: #{order.id}</p>
            </div>
            <p className="text-base text-base-200">
              {new Date(order.fechaCreacion).toLocaleString("es-CO")}
            </p>
          </div>
          <div className="flex flex-col gap-5 py-5">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 flex-wrap">
              <p className="text-lg">
                <span className="font-bold">{t("products.client")}:</span>{" "}
                {order.usuario.nombre} {order.usuario.apellido}
              </p>
              <p className="text-lg">
                <span className="font-bold">C.C:</span> {order.usuario.cedula}
              </p>
              <p className="text-lg">
                <span className="font-bold">{t("products.phone")}:</span>{" "}
                {order.usuario.telefono}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <p className="text-lg">
                <span className="font-bold">{t("products.address")}:</span>{" "}
                {order.domicilio.direccion}
              </p>
              <p className="text-lg">
                <span className="font-bold">{t("products.city")}:</span>{" "}
                {order.domicilio.ciudad.nombre} -{" "}
                {order.domicilio.ciudad.departamento.nombre}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-lg font-bold">{t("products.title")}:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {order.detallesOrden.map((item) => (
                  <li
                    className="flex flex-col xl:flex-row xl:items-center gap-5 border border-neutral p-5 rounded-md"
                    key={item.id}
                  >
                    <div className="avatar">
                      <div className="mask mask-square rounded w-20 h-20">
                        <Image
                          src={item.producto.imagen[0]}
                          alt={item.producto.nombre}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">{item.producto.nombre}</p>
                      <p className="font-semibold">{item.color}</p>
                      <p>
                        <span className="font-semibold">{item.talla}</span> EU
                      </p>
                      <p>
                        <span className="font-semibold">{item.cantidad}</span> u
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <OrdersUpdateForm order={order} />
          <div className="flex w-full justify-between">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold">
              $ {order.precioTotal.toLocaleString("es-CO")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
