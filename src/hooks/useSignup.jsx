"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function useSignup() {
  const t = useTranslations("API.signup");
  const t2 = useTranslations("Loading");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const onlyLettersRegex = /^[A-Za-záéíóúñÁÉÍÓÚ\s]+$/;

  const handleChange = () => (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => async (e) => {
    e.preventDefault();

    let loadingToastId = null;

    if (!user.name || !user.lastname || !user.email || !user.password) {
      return toast.error(t("requiredFields"));
    }

    if (!onlyLettersRegex.test(user.name)) {
      return toast.error(t("invalidName"));
    }

    if (!onlyLettersRegex.test(user.lastname)) {
      return toast.error(t("invalidLastname"));
    }

    if (!emailRegex.test(user.email)) {
      return toast.error(t("invalidEmail"));
    }

    if (!passwordRegex.test(user.password)) {
      return toast.error(t("invalidPassword"));
    }

    if (user.password !== user.confirmPassword) {
      return toast.error(t("invalidMatchPassword"));
    }

    try {
      loadingToastId = toast.loading(t2("text"));
      const res = await axios.post("/api/auth/signup", user);

      toast.dismiss(loadingToastId);

      setUser({
        name: "",
        lastname: "",
        email: "",
        password: "",
      });

      toast.success(res.data);

      return router.push("/login");
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  return {
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
  };
}
