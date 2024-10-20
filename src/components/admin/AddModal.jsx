import MyModal from "../ui/MyModal";
import AddForm from "./AddForm";
import useAddModal from "@/hooks/admin/useAddModal";

export default function AddModal({
  title,
  sizePlaceholder,
  brandPlaceholder,
  categoryPlaceholder,
  pricePlaceholder,
  colorPlaceholder,
  descriptionPlaceholder,
  descriptionEnPlaceholder,
  saveBtnText,
  namePlaceholder,
  stockPlaceholder,
  addSizeBtnText,
}) {
  const { isOpen, handleAddModal } = useAddModal();

  return (
    <MyModal title={title} isOpen={isOpen} closeModal={handleAddModal}>
      <AddForm
        namePlaceholder={namePlaceholder}
        sizePlaceholder={sizePlaceholder}
        brandPlaceholder={brandPlaceholder}
        categoryPlaceholder={categoryPlaceholder}
        pricePlaceholder={pricePlaceholder}
        colorPlaceholder={colorPlaceholder}
        descriptionPlaceholder={descriptionPlaceholder}
        descriptionEnPlaceholder={descriptionEnPlaceholder}
        saveBtnText={saveBtnText}
        stockPlaceholder={stockPlaceholder}
        addSizeBtnText={addSizeBtnText}
      />
    </MyModal>
  );
}
