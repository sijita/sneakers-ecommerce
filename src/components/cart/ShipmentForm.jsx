import useCheckoutForm from "@/hooks/checkout/useCheckoutForm";
import { HiArrowSmRight } from "react-icons/hi";
import useLocations from "@/hooks/useLocations";

export default function ShipmentForm({
  setSelectedIndex,
  departmentTitle,
  cityTitle,
  addressTitle,
  addressPlaceholder,
  detailsTitle,
  detailsPlaceholder,
  selectPlaceholder,
  loadingPlaceholder,
}) {
  const { departments, isLoading } = useLocations();
  const { checkoutForm, setCheckoutForm } = useCheckoutForm();

  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="department" className="block text-base">
            {departmentTitle}
          </label>
          <select
            value={checkoutForm.department}
            onChange={(e) =>
              setCheckoutForm({
                ...checkoutForm,
                department: e.target.value,
                city: "",
              })
            }
            className={`select w-full border border-neutral text-secondary text-base ${
              checkoutForm.department && "text-secondary"
            }`}
          >
            <option className="text-base-200 text-base" value="">
              {selectPlaceholder}
            </option>
            {!isLoading ? (
              departments?.map((department) => (
                <option
                  className="text-secondary text-base"
                  key={department.id}
                  value={department.nombre}
                >
                  {department.nombre}
                </option>
              ))
            ) : (
              <option className="text-secondary text-base">
                {loadingPlaceholder}...
              </option>
            )}
          </select>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="ciudad" className="block text-base">
            {cityTitle}
          </label>
          <select
            value={checkoutForm.city}
            onChange={(e) =>
              setCheckoutForm({
                ...checkoutForm,
                city: e.target.value,
              })
            }
            className={`select w-full border border-neutral text-base text-secondary ${
              checkoutForm.city && "text-secondary"
            }`}
          >
            <option className="text-base-200 text-base" value="">
              {selectPlaceholder}
            </option>
            {checkoutForm.department &&
              departments
                ?.find(
                  (department) => department.nombre === checkoutForm.department
                )
                .ciudad.map((ciudad) => (
                  <option
                    className="text-secondary text-base"
                    key={ciudad.id}
                    value={ciudad.id}
                  >
                    {ciudad.nombre}
                  </option>
                ))}
          </select>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <label htmlFor="direccion" className="block text-base">
          {addressTitle}
        </label>
        <input
          type="text"
          name="direccion"
          placeholder={addressPlaceholder}
          className="input border border-neutral w-full"
          value={checkoutForm.address}
          onChange={(e) =>
            setCheckoutForm({
              ...checkoutForm,
              address: e.target.value,
            })
          }
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <label htmlFor="detalles" className="block text-base">
          {detailsTitle}
        </label>
        <textarea
          placeholder={detailsPlaceholder}
          className="textarea border border-neutral w-full placeholder:text-base text-base"
          value={checkoutForm.details}
          onChange={(e) =>
            setCheckoutForm({
              ...checkoutForm,
              details: e.target.value,
            })
          }
        />
      </div>
      <button
        className="btn btn-outline border-neutral mt-5"
        onClick={() => setSelectedIndex(2)}
      >
        Continuar <HiArrowSmRight />
      </button>
    </form>
  );
}
