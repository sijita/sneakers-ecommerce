"use client";
import AddModal from "@/components/admin/AddModal";
import DeleteModal from "@/components/admin/DeleteModal";
import EditModal from "@/components/admin/EditModal";
import ProductsTable from "@/components/admin/ProductsTable";
import ViewModal from "@/components/admin/ViewModal";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Admin.products");
  const a = useTranslations("Admin.product");

  return (
    <section>
      <AddModal
        title={a("addProductTitle")}
        brandPlaceholder={a("brand")}
        categoryPlaceholder={a("category")}
        colorPlaceholder={a("color")}
        descriptionPlaceholder={a("description")}
        descriptionEnPlaceholder={a("descriptionEn")}
        pricePlaceholder={a("price")}
        saveBtnText={a("saveBtnText")}
        sizePlaceholder={a("size")}
        namePlaceholder={a("name")}
        stockPlaceholder={a("stock")}
        addSizeBtnText={a("addSizeBtnText")}
      />
      <ViewModal />
      <DeleteModal
        title={a("deleteProductTitle")}
        deleteProductText={a("deleteProductText")}
        deleteBtnText={a("deleteBtnText")}
      />
      <EditModal
        title={a("editProductTitle")}
        brandPlaceholder={a("brand")}
        categoryPlaceholder={a("category")}
        colorPlaceholder={a("color")}
        descriptionPlaceholder={a("description")}
        descriptionEnPlaceholder={a("descriptionEn")}
        pricePlaceholder={a("price")}
        editBtnText={a("editBtnText")}
        sizePlaceholder={a("size")}
        namePlaceholder={a("name")}
        addSizeBtnText={a("addSizeBtnText")}
        stockPlaceholder={a("stock")}
      />
      <ProductsTable
        productPlaceholder={t("product")}
        categoryPlaceholder={t("category")}
        stockPlaceholder={t("stock")}
        sizePlaceholder={t("size")}
        pricePlaceholder={t("price")}
        actionsPlaceholder={t("actions")}
        showingPlaceholder={t("showing")}
        pagePlaceholder={t("page")}
        addProductPlaceholder={t("addProduct")}
        totalProductsPlaceholder={t("totalProducts")}
      />
    </section>
  );
}
