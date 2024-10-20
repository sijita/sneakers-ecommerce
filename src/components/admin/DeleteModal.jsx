import useDeleteModal from "@/hooks/admin/useDeleteModal";
import useDeleteProduct from "@/hooks/admin/useDeleteProduct";
import useIdProduct from "@/hooks/useIdProduct";
import MyModal from "../ui/MyModal";

export default function DeleteModal({
  title,
  deleteProductText,
  deleteBtnText,
}) {
  const { isOpen, handleDeleteModal } = useDeleteModal();
  const { id } = useIdProduct();
  const { handleDeleteProduct } = useDeleteProduct();

  return (
    <MyModal
      title={`${title}: ${id}`}
      isOpen={isOpen}
      closeModal={handleDeleteModal}
    >
      <div className="flex flex-col gap-8">
        <div className="text-lg text-left">{deleteProductText}</div>
        <button
          className="btn btn-outline border-neutral w-full"
          onClick={handleDeleteProduct}
        >
          {deleteBtnText}
        </button>
      </div>
    </MyModal>
  );
}
