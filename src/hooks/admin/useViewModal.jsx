import { useRecoilState } from "recoil";
import { viewModalState } from "@/atoms/viewModalState";

export default function useViewModal() {
  const [isOpen, setIsOpen] = useRecoilState(viewModalState);

  const handleViewModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleViewModal,
  };
}
