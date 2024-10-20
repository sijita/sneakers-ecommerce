import useViewModal from "@/hooks/admin/useViewModal";
import MyModal from "../ui/MyModal";
import ViewForm from "./ViewForm";

export default function ViewModal() {
  const { isOpen, handleViewModal } = useViewModal();
  return (
    <MyModal title="Ver producto" isOpen={isOpen} closeModal={handleViewModal}>
      <ViewForm />
    </MyModal>
  );
}
