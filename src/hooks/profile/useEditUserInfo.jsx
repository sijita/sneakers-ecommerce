import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  editContactModalState,
  editDomicileModalState,
} from "@/atoms/editUserInfoModalsState";
import { useTranslations } from "next-intl";

export default function useEditUserInfo() {
  const t2 = useTranslations("Loading");
  const t = useTranslations("Profile.editUser");
  const { data: session, update } = useSession();
  const [contactModal, setContactModal] = useRecoilState(editContactModalState);
  const [domicileModal, setDomicileModal] = useRecoilState(
    editDomicileModalState
  );

  const [userInfo, setUserInfo] = useState({
    userId: session?.user.id,
    email: session?.user.email,
    phone: session?.user?.telefono,
    cc: session?.user?.cedula,
    domicileId: session?.user?.domicilio[0]?.id,
    department: session?.user?.domicilio[0]?.ciudad.departamento.nombre,
    cityId: session?.user?.domicilio[0]?.ciudad.id,
    address: session?.user?.domicilio[0]?.direccion,
    details: session?.user?.domicilio[0]?.detalles,
  });

  const handleEditContact = () => {
    setContactModal(!contactModal);
  };

  const handleEditDomicile = () => {
    setDomicileModal(!domicileModal);
  };

  const handleUserInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loadingToastId = null;

    if (
      !userInfo.email ||
      !userInfo.cc ||
      !userInfo.phone ||
      !userInfo.address ||
      !userInfo.details ||
      !userInfo.cityId
    ) {
      return toast.error(t("requiredFields"));
    }

    if (
      userInfo.phone === session?.user?.telefono &&
      userInfo.address === session?.user?.domicilio[0]?.direccion &&
      userInfo.details === session?.user?.domicilio[0]?.detalles &&
      userInfo.cityId === session?.user?.domicilio[0]?.ciudad.id
    ) {
      return toast.error(t("noChanges"));
    }

    try {
      loadingToastId = toast.loading(t2("text"));

      if (userInfo.phone !== session?.user?.telefono) {
        await update({
          ...session,
          data: {
            id: session.user.id,
            telefono: userInfo.phone,
          },
        });
      }

      if (
        userInfo.address !== session?.user?.domicilio[0]?.direccion ||
        userInfo.details !== session?.user?.domicilio[0]?.detalles ||
        userInfo.cityId !== session?.user?.domicilio[0]?.ciudad.id
      ) {
        await update({
          ...session,
          data: {
            id: session?.user.id,
            domicilioId: userInfo.domicileId,
            direccion: userInfo.address,
            detalles: userInfo.details,
            ciudadId: userInfo.cityId,
          },
        });
      }

      toast.dismiss(loadingToastId);
      contactModal && handleEditContact();
      domicileModal && handleEditDomicile();

      return toast.success(t("success"));
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(t("error"));
    }
  };

  return {
    contactModal,
    handleEditContact,
    handleUserInfo,
    handleSubmit,
    userInfo,
    handleEditDomicile,
    domicileModal,
    setUserInfo,
  };
}
