import { checkoutModalState } from "@/atoms/checkoutModalState";
import { useRecoilState } from "recoil";

export default function useCheckoutModal() {
  const [isOpen, setIsOpen] = useRecoilState(checkoutModalState);

  const handleCheckoutModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleCheckoutModal,
  };
}
