import React from "react";
import { useRecoilState } from "recoil";
import { editModalState } from "@/atoms/editModalState";

export default function useEditModal() {
  const [isOpen, setIsOpen] = useRecoilState(editModalState);

  const handleEditModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleEditModal,
  }
}
