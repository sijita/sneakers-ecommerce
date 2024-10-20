import { useRecoilState } from "recoil";
import { deleteAccountModalState } from "../../atoms/deleteAccountModalState";
import bcrypt from "bcryptjs-react";
import { useSession, signOut } from "next-auth/react";
import { editPasswordState } from "@/atoms/editPasswordState";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";

export default function useDeleteAccount() {
  const t = useTranslations("API.deleteAccount");
  const t2 = useTranslations("Loading");
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useRecoilState(
    deleteAccountModalState
  );
  const [password, setPassword] = useRecoilState(editPasswordState);

  const handleDeleteAccountModal = () => {
    setDeleteAccountModal(!deleteAccountModal);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loadingToastId = null;

    if (!password) return toast.error(t("noPassword"));

    try {
      const samePassword = await bcrypt.compare(password, session.user.clave);

      if (!samePassword) return toast.error(t("invalidPassword"));

      loadingToastId = toast.loading(t2("text"));
      const res = await axios.delete(`/api/delete-account/${session.user.id}`);

      toast.dismiss(loadingToastId);
      toast.success(res.data);

      return signOut();
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  return {
    handleDeleteAccountModal,
    deleteAccountModal,
    handleChangePassword,
    handleSubmit,
    showPassword,
    setShowPassword,
  };
}
