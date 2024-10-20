import { deleteModalState } from "@/atoms/deleteModalState";
import { useRecoilState } from "recoil";

export default function useDeleteModal() {
  const [isOpen, setIsOpen] = useRecoilState(deleteModalState);

  const handleDeleteModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleDeleteModal,
  };
}
