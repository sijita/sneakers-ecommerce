"use client";
import useAddModal from "@/hooks/admin/useAddModal";

export default function TableNav({
  data,
  totalProductsPlaceholder,
  addProductPlaceholder,
}) {
  const { productsCount } = data;
  const { handleAddModal } = useAddModal();

  return (
    <div className="flex flex-col gap-5 mb-4">
      <div>
        <p>
          {totalProductsPlaceholder}: {productsCount}
        </p>
      </div>
      <hr className="border-neutral" />
      <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-end">
        <button
          onClick={handleAddModal}
          className="btn btn-outline border-neutral w-full sm:w-auto"
        >
          {addProductPlaceholder}
        </button>
      </div>
    </div>
  );
}
