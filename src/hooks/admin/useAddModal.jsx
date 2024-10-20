import { addModalState } from "@/atoms/addModalState";
import { sizesState } from "@/atoms/sizesState";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function useAddModal() {
  const [isOpen, setIsOpen] = useRecoilState(addModalState);
  const resetSizes = useResetRecoilState(sizesState);

  const handleAddModal = () => {
    resetSizes([]);
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleAddModal,
  };
}
