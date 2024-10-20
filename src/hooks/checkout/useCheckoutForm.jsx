import { useRecoilState } from "recoil";
import { checkoutState } from "@/atoms/checkoutState";

export default function useCheckoutForm() {
  const [checkoutForm, setCheckoutForm] = useRecoilState(checkoutState);

  return {
    checkoutForm,
    setCheckoutForm,
  };
}
