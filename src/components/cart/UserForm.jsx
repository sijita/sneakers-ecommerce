import useCheckoutForm from "@/hooks/checkout/useCheckoutForm";
import { HiArrowSmRight } from "react-icons/hi";

export default function UserForm({
  setSelectedIndex,
  namePlaceholder,
  lastnamePlaceholder,
  emailPlaceholder,
  ccPlaceholder,
  phonePlaceholder,
  nextBtnText,
}) {
  const { checkoutForm, setCheckoutForm } = useCheckoutForm();

  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="name" className="block text-base">
            {namePlaceholder}
          </label>
          <input
            type="text"
            name="name"
            placeholder="John"
            className="input border border-neutral w-full"
            value={checkoutForm.name}
            onChange={(e) =>
              setCheckoutForm({
                ...checkoutForm,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="lastname" className="block text-base">
            {lastnamePlaceholder}
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Doe"
            className="input border border-neutral w-full"
            value={checkoutForm.lastname}
            onChange={(e) =>
              setCheckoutForm({
                ...checkoutForm,
                lastname: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <label htmlFor="email" className="block text-base">
          {emailPlaceholder}
        </label>
        <input
          type="email"
          name="email"
          placeholder="jhondoe@mail.com"
          className="input border border-neutral w-full"
          value={checkoutForm.email}
          onChange={(e) =>
            setCheckoutForm({
              ...checkoutForm,
              email: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="cc" className="block text-base">
            {ccPlaceholder}
          </label>
          <input
            type="number"
            name="cc"
            placeholder="C.C"
            className="input border border-neutral w-full"
            value={checkoutForm.cc}
            onChange={(e) =>
              setCheckoutForm({
                ...checkoutForm,
                cc: e.target.value,
              })
            }
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="phone" className="block text-base">
            {phonePlaceholder}
          </label>
          <input
            type="number"
            name="phone"
            placeholder="Teléfono"
            className="input border border-neutral w-full"
            value={checkoutForm.phone}
            onChange={(e) =>
              setCheckoutForm({
                ...checkoutForm,
                phone: e.target.value,
              })
            }
          />
        </div>
      </div>
      <button
        className="btn btn-outline border-neutral mt-5"
        onClick={() => setSelectedIndex(1)}
      >
        {nextBtnText} <HiArrowSmRight />
      </button>
    </form>
  );
}
