import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function useRecoverPassword() {
  const t = useTranslations("Profile.recoverPassword");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const handleVerifyEmailChange = () => (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitVerifyEmail = () => async (e) => {
    e.preventDefault();
    let loadingToastId;

    if (!email || !emailRegex.test(email)) {
      return toast.error(t("invalidEmail"));
    }

    try {
      loadingToastId = toast.loading(t("loadingEmail"));
      const res = await axios.post("/api/recover", { email });
      toast.dismiss(loadingToastId);
      setEmail("");

      router.push("/login");

      return toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  const handlePasswordChange = () => (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmitRecoverPassword = (token) => async (e) => {
    e.preventDefault();

    if (password.password !== password.confirmPassword) {
      return toast.error(t("passwordsDontMatch"));
    }

    if (!password.password || !passwordRegex.test(password.password)) {
      return toast.error(t("invalidPassword"));
    }

    let loadingToastId;

    try {
      loadingToastId = toast.loading(t("loadingPassword"));
      const res = await axios.put(`/api/recover/${token}`, {
        password: password.password,
        confirmPassword: password.confirmPassword,
      });
      toast.dismiss(loadingToastId);

      setPassword({ password: "", confirmPassword: "" });
      router.replace("/login");

      return toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.response.data.error);
    }
  };

  return {
    handlePasswordChange,
    handleSubmitRecoverPassword,
    handleVerifyEmailChange,
    handleSubmitVerifyEmail,
    showPassword,
    setShowPassword,
    email,
    password,
  };
}
