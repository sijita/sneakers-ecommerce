import Image from "next/image";

export default function OrdersList({
  orders,
  orderPlaceholder,
  sizePlaceholder,
  statusPlaceholder,
  statusPendingPlaceholder,
  statusSentPlaceholder,
  deliveredPlaceholder,
  trackingPlaceholder,
  statusPaymentPlaceholder,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
      {orders?.map((order, i) => (
        <div
          className="flex flex-col p-10 gap-5 border border-neutral rounded-md"
          key={order.id}
        >
          <div className="flex flex-col justify-between gap-5">
            <div>
              <div className="text-xl font-bold uppercase flex justify-between flex-wrap gap-3">
                <p>
                  {orderPlaceholder} #{i + 1}
                </p>
                <p>ID: #{order.id}</p>
              </div>
              <p className="text-base text-base-200">
                {new Date(order.fechaCreacion).toLocaleString("es-CO")}
              </p>
              <hr className="my-3 border-neutral" />
              <div
                className={`text-lg flex justify-between flex-wrap ${
                  order.estadoEnvio === 3 ? "text-white" : "text-base-200"
                }`}
              >
                <p className="uppercase font-bold">{statusPlaceholder}:</p>
                <p>
                  {!order.estadoEnvio
                    ? statusPaymentPlaceholder
                    : order.estadoEnvio === 1
                    ? statusPendingPlaceholder
                    : order.estadoEnvio === 2
                    ? statusSentPlaceholder
                    : deliveredPlaceholder}
                </p>
              </div>
              {(order.estadoEnvio === 2 || order.estadoEnvio === 3) &&
                order.rastreoId && (
                  <div
                    className={`text-lg flex justify-between flex-wrap ${
                      order.estadoEnvio === 3 ? "text-white" : "text-base-200"
                    }`}
                  >
                    <p className="font-bold uppercase">
                      {trackingPlaceholder}:
                    </p>
                    <p>{order.rastreoId}</p>
                  </div>
                )}
            </div>
          </div>
          <div className="flex flex-col gap-5 py-5">
            {order?.detallesOrden.map((product) => (
              <div className="flex flex-col md:flex-row gap-5" key={product.id}>
                <div className="avatar">
                  <div className="mask mask-square rounded w-20 h-20">
                    <Image
                      src={product.producto.imagen[0]}
                      alt={product.producto.nombre}
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <div className="flex gap-2 items-center justify-between flex-wrap">
                    <p className="text-lg font-bold items-center">
                      {product.producto.nombre}
                    </p>
                    <p className="text-base">
                      {product.cantidad} x ${" "}
                      {product.producto.precio.toLocaleString("es-CO")}
                    </p>
                  </div>
                  <p className="text-base-200">
                    {sizePlaceholder}: {product.talla} EU
                  </p>
                  <p className="text-base-200">Color: {product.color}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center mt-auto">
            <div className="flex w-full justify-between items-center">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-lg font-bold">
                ${order.precioTotal.toLocaleString("es-CO")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
