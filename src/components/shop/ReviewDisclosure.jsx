import { Disclosure, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import Reviews from "./Reviews";
import { useTranslations } from "next-intl";

export default function ReviewDisclosure({
  id,
  name,
  calificaciones,
  averageRating,
}) {
  const t = useTranslations("Shop.productDetails.reviews");
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="btn btn-outline border-neutral">
            {t("title")}
            <HiChevronDown
              size={20}
              className={open ? "rotate-180 transform" : ""}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel static>
              <Reviews
                reviews={calificaciones}
                averageRating={averageRating}
                name={name}
                productId={id}
                title={t("title")}
                basedOn={t("basedOn", { total: calificaciones?.length })}
                writeReviewBtnText={t("writeReviewBtnText")}
              />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
