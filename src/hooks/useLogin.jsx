"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function useLogin() {
  const t = useTranslations("Login");
  const t2 = useTranslations("Loading");
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  const handleChange = () => (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => async (e) => {
    e.preventDefault();

    let loadingToastId = null;

    if (!user.email || !user.password) {
      return toast.error(t("requiredFields"));
    }

    if (!emailRegex.test(user.email)) {
      return toast.error(t("invalidEmail"));
    }

    try {
      loadingToastId = toast.loading(t2("text"));
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        toast.dismiss(loadingToastId);
        return toast.error(res?.error);
      }

      if (res && !res.error) {
        toast.dismiss(loadingToastId);
        setUser({
          email: "",
          password: "",
        });
        toast.success(t("success"));
        return router.push("/");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error?.response?.data?.message || t("error"));
    }
  };

  return {
    user,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
