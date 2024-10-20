import { useEffect, useState } from "react";
import useEditUserInfo from "./useEditUserInfo";
import { useRecoilState } from "recoil";
import {
  editAccessModalState,
  editCredentialsModalState,
} from "@/atoms/editUserInfoModalsState";
import { toast } from "react-hot-toast";
import { editPasswordState } from "@/atoms/editPasswordState";
import { useSession } from "next-auth/react";
import bcrypt from "bcryptjs-react";
import { useTranslations } from "next-intl";

export default function useEditUserAccessCredentials() {
  const t = useTranslations("Profile.accessInfo");
  const t2 = useTranslations("Loading");
  const { data: session, update } = useSession();
  const { userInfo, handleUserInfo } = useEditUserInfo();
  const [password, setPassword] = useRecoilState(editPasswordState);
  const [showPassword, setShowPassword] = useState(false);
  const [accesModal, setAccesModal] = useRecoilState(editAccessModalState);
  const [credentialsModal, setCredentialsModal] = useRecoilState(
    editCredentialsModalState
  );
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  useEffect(() => {
    if (accesModal === true) {
      setPassword("");
    }
  }, [accesModal]);

  const handleAccessModal = () => {
    setAccesModal(!accesModal);
  };

  const handleCredentialsModal = () => {
    setCredentialsModal(!credentialsModal);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const verifyPassword = async (e) => {
    e.preventDefault();

    if (!password) return toast.error(t("noPassword"));

    let loadingToastId = null;

    try {
      loadingToastId = toast.loading(t2("text"));

      const samePassword = await bcrypt.compare(password, session.user.clave);

      if (!samePassword) {
        toast.dismiss(loadingToastId);
        return toast.error(t("invalidPassword"));
      }

      toast.dismiss(loadingToastId);

      handleAccessModal();
      handleCredentialsModal();

      return toast.success(t("success"));
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(t("error"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loadingToastId = null;
    if (!password) return toast.error(t("noPassword"));
    if (!userInfo.email) return toast.error(t("noEmail"));

    if (!emailRegex.test(userInfo.email)) return toast.error(t("invalidEmail"));

    if (!passwordRegex.test(password))
      return toast.error(t("passwordCondition"));

    const decryptedPassword = await bcrypt.compare(
      password,
      session.user.clave
    );

    if (userInfo.email === session.user.email && decryptedPassword)
      return toast.error(t("noChanges"));

    try {
      loadingToastId = toast.loading(t2("text"));

      if (userInfo.email !== session.user.email) {
        await update({
          ...session,
          data: {
            id: userInfo.userId,
            email: userInfo.email,
          },
        });
      }

      await update({
        ...session,
        data: {
          id: userInfo.userId,
          clave: password,
        },
      });

      toast.dismiss(loadingToastId);
      handleCredentialsModal();
      setPassword("");

      return toast.success(t("successChanged"));
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(t("error"));
    }
  };

  return {
    verifyPassword,
    showPassword,
    setShowPassword,
    accesModal,
    handleAccessModal,
    handleUserInfo,
    userInfo,
    handleCredentialsModal,
    credentialsModal,
    password,
    handlePassword,
    handleSubmit,
  };
}
