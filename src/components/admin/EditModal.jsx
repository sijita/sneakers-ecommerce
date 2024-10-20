import EditForm from "./EditForm";
import useEditModal from "@/hooks/admin/useEditModal";
import MyModal from "../ui/MyModal";

export default function EditModal({
  title,
  brandPlaceholder,
  categoryPlaceholder,
  colorPlaceholder,
  descriptionPlaceholder,
  descriptionEnPlaceholder,
  pricePlaceholder,
  editBtnText,
  sizePlaceholder,
  namePlaceholder,
  addSizeBtnText,
  stockPlaceholder,
}) {
  const { isOpen, handleEditModal } = useEditModal();

  return (
    <MyModal title={title} isOpen={isOpen} closeModal={handleEditModal}>
      <EditForm
        brandPlaceholder={brandPlaceholder}
        categoryPlaceholder={categoryPlaceholder}
        colorPlaceholder={colorPlaceholder}
        descriptionPlaceholder={descriptionPlaceholder}
        descriptionEnPlaceholder={descriptionEnPlaceholder}
        pricePlaceholder={pricePlaceholder}
        editBtnText={editBtnText}
        sizePlaceholder={sizePlaceholder}
        namePlaceholder={namePlaceholder}
        addSizeBtnText={addSizeBtnText}
        stockPlaceholder={stockPlaceholder}
      />
    </MyModal>
  );
}
