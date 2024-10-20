"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Page({ params }) {
  const { token } = params;
  const router = useRouter();

  const verifyToken = async () => {
    try {
      const res = await axios.post(`/api/auth/verify/${token}`);

      router.push("/login");

      return toast.success(res.data);
    } catch (error) {
      router.push("/login");
      return toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return <LoadingSpinner />;
}
