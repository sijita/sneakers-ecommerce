import useCreateOrder from "@/hooks/orders/useCreateOrder";
import useLocations from "@/hooks/useLocations";
import { AiOutlineWhatsApp } from "react-icons/ai";
import {
  HiOutlinePhone,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineX,
} from "react-icons/hi";

export default function SummaryForm({ summaryTitle, finalizeBtnText }) {
  const { departments } = useLocations();
  const { createOrder, checkoutForm, cart, total } = useCreateOrder();

  const city = departments
    ?.find((department) => department.nombre === checkoutForm.department)
    ?.ciudad.find((city) => city.id === parseInt(checkoutForm.city)).nombre;

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-xl font-bold">{summaryTitle}:</h2>
      <div className="flex flex-col gap-5 md:flex-row justify-between">
        <div className="flex gap-5 items-center">
          <HiOutlineUser size={25} />
          <div className="flex flex-col">
            <p>
              {checkoutForm.name} {checkoutForm.lastname}
            </p>
            <p>C.C: {checkoutForm.cc}</p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <HiOutlinePhone size={25} /> {checkoutForm.phone}
        </div>
        <div className="flex gap-5 items-center">
          <HiOutlineTruck size={25} />
          <div className="flex flex-col">
            <p>
              {city} - {checkoutForm.department}
            </p>
            <p>{checkoutForm.address}</p>
            <p>{checkoutForm.details}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {cart.map((product) => (
          <div className="flex flex-col gap-2" key={product.id}>
            <div className="flex gap-2 justify-between flex-wrap">
              <div className="flex gap-3 items-center flex-wrap">
                <p className="text-xl font-extrabold flex items-center gap-2">
                  {product.cantidad}
                  <HiOutlineX size={15} />
                </p>
                <p className="text-lg font-bold">{product.producto.nombre}</p>-
                <p className="text-lg font-bold">{product.talla} EU</p>
              </div>
              <div>
                <p className="text-lg font-bold">
                  $ {product.subtotal.toLocaleString("es-CO")}
                </p>
              </div>
            </div>
            <hr className="opacity-30" />
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between">
          <p className="text-lg font-extrabold">Total:</p>
          <p className="text-lg font-bold">$ {total.toLocaleString("es-CO")}</p>
        </div>
      </div>
      <button
        className="btn bg-green-500 hover:bg-green-500/75 transition-all border-none text-lg w-full text-white"
        onClick={() => {
          createOrder();
        }}
      >
        {finalizeBtnText}
        <AiOutlineWhatsApp size={21} className="ml-2" />
      </button>
    </div>
  );
}
