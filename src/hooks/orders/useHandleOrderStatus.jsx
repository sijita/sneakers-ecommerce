import axios from "axios";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function useHandleOrderStatus() {
  const t = useTranslations("Loading");
  const [status, setStatus] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e, orderId) => {
    e.preventDefault();
    let loadingToastId;

    if (!status) {
      return toast.error(t("statusError"));
    }

    try {
      loadingToastId = toast.loading(t("text"));
      const res = await axios.put(`/api/orders/${orderId}`, {
        estadoEnvio: status,
        rastreoId: trackingId,
        adminId: session?.user.id,
      });
      toast.dismiss(loadingToastId);

      mutate(`/api/orders/all?adminId=${session?.user.id}`);

      return toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  return {
    setStatus,
    setTrackingId,
    handleSubmit,
    status,
    trackingId,
  };
}
