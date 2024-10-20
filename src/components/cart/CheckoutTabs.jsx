import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import UserForm from "./UserForm";
import ShipmentForm from "./ShipmentForm";
import { useSession } from "next-auth/react";
import useCheckoutForm from "@/hooks/checkout/useCheckoutForm";
import SummaryForm from "./SummaryForm";
import { useTranslations } from "next-intl";

export default function CheckoutTabs() {
  const t = useTranslations("Cart.checkout");
  const loading = useTranslations("Loading");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { checkoutForm, setCheckoutForm } = useCheckoutForm();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setCheckoutForm({
        ...checkoutForm,
        name: session.user.nombre,
        lastname: session.user.apellido,
        email: session.user.email,
        phone: session.user.telefono,
        cc: session.user.cedula,
        department: session.user?.domicilio[0]?.ciudad.departamento.nombre,
        city: session.user?.domicilio[0]?.ciudad.id,
        address: session.user?.domicilio[0]?.direccion,
        details: session.user?.domicilio[0]?.detalles,
      });
    }
  }, []);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex flex-col sm:flex-row gap-5 w-full mt-5 px-5">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={
                selected
                  ? "btn btn-secondary flex-1 font-bold"
                  : "btn btn-outline border-neutral flex-1 font-bold"
              }
            >
              {t("contactInfo.title")}
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={
                selected
                  ? "btn btn-secondary flex-1 font-bold"
                  : "btn btn-outline border-neutral flex-1 font-bold"
              }
            >
              {t("shipmentInfo.title")}
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={
                selected
                  ? "btn btn-secondary flex-1 font-bold"
                  : "btn btn-outline border-neutral flex-1 font-bold"
              }
            >
              {t("resume.title")}
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="py-10 px-5">
        <Tab.Panel>
          <UserForm
            setSelectedIndex={setSelectedIndex}
            namePlaceholder={t("contactInfo.name")}
            lastnamePlaceholder={t("contactInfo.lastname")}
            emailPlaceholder={t("contactInfo.email")}
            ccPlaceholder={t("contactInfo.id")}
            phonePlaceholder={t("contactInfo.phone")}
            nextBtnText={t("nextBtnText")}
          />
        </Tab.Panel>
        <Tab.Panel>
          <ShipmentForm
            setSelectedIndex={setSelectedIndex}
            cityTitle={t("shipmentInfo.city")}
            departmentTitle={t("shipmentInfo.state")}
            selectPlaceholder={t("shipmentInfo.select")}
            addressTitle={t("shipmentInfo.address")}
            addressPlaceholder={t("shipmentInfo.addressPlaceholder")}
            detailsTitle={t("shipmentInfo.details")}
            detailsPlaceholder={t("shipmentInfo.detailsPlaceholder")}
            nextBtnText={t("nextBtnText")}
            loadingPlaceholder={loading("text")}
          />
        </Tab.Panel>
        <Tab.Panel>
          <SummaryForm
            finalizeBtnText={t("resume.finalizeBtnText")}
            summaryTitle={t("resume.subtitle")}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
