"use client";
import AccessModal from "@/components/profile/AccessModal";
import ContactModal from "@/components/profile/ContactModal";
import CredentialsModal from "@/components/profile/CredentialsModal";
import DeleteAccountModal from "@/components/profile/DeleteAccountModal";
import DomicileModal from "@/components/profile/DomicileModal";
import InfoSection from "@/components/profile/InfoSection";
import UserInfoCard from "@/components/profile/UserInfoCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useDeleteAccount from "@/hooks/profile/useDeleteAccount";
import useEditUserAccessCredentials from "@/hooks/profile/useEditUserAccessCredentials";
import useEditUserInfo from "@/hooks/profile/useEditUserInfo";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Profile");
  const loading = useTranslations("Loading");
  const { data: session, status } = useSession();
  const { handleEditDomicile, handleEditContact } = useEditUserInfo();
  const { handleAccessModal } = useEditUserAccessCredentials();
  const { handleDeleteAccountModal } = useDeleteAccount();

  if (status === "loading") return <LoadingSpinner />;

  return (
    <>
      <ContactModal
        title={t("contactInfo.editTitle")}
        saveBtnText={t("saveBtnText")}
        phonePlaceholder={t("contactInfo.phone")}
      />
      <DomicileModal
        title={t("domicileInfo.editTitle")}
        saveBtnText={t("domicileInfo.saveBtnText")}
        addressPlaceholder={t("domicileInfo.address")}
        detailsPlaceholder={t("domicileInfo.details")}
        selectPlaceholder={t("domicileInfo.select")}
        loadingPlaceholder={loading("Text")}
      />
      <AccessModal
        title={t("accessInfo.editTitle")}
        continueBtnText={t("continueBtnText")}
        verifyPasswordPlaceholder={t("accessInfo.verifyPassword")}
        passwordPlaceholder={t("accessInfo.password")}
      />
      <CredentialsModal
        title={t("accessInfo.editTitle")}
        saveBtnText={t("saveBtnText")}
        emailPlaceholder={t("accessInfo.email")}
        passwordPlaceholder={t("accessInfo.password")}
      />
      <DeleteAccountModal 
        title={t("deleteAccount.title")} 
        subtitle={t("deleteAccount.subtitle")}
        deleteBtnText={t("deleteAccount.deleteBtnText")}
        recomendation={t("deleteAccount.text")}
        passwordPlaceholder={t("accessInfo.password")}
      />
      <div className="flex flex-col gap-5 lg:flex-row justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">
            {t("greetings", {
              name: session.user.nombre,
              lastname: session.user.apellido,
            })}
          </p>
          <p className="text-lg text-base-200">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <button
            onClick={() => handleDeleteAccountModal()}
            className="btn btn-outline border-neutral"
          >
            {t("deleteAccount.title")}
          </button>
          <button onClick={() => signOut()} className="btn btn-secondary">
            {t("logout")}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <InfoSection
          onClick={() => handleEditContact()}
          title={t("contactInfo.title")}
          editBtnText={t("editBtnText")}
        >
          <UserInfoCard
            title={t("contactInfo.phone")}
            data={session.user?.telefono ? session.user.telefono : "N/A"}
          />
        </InfoSection>
        <InfoSection
          onClick={() => handleEditDomicile()}
          title={t("domicileInfo.title")}
          editBtnText={t("editBtnText")}
        >
          <UserInfoCard
            title={t("domicileInfo.address")}
            data={
              session.user.domicilio[0]?.direccion
                ? session.user.domicilio[0].direccion
                : "N/A"
            }
          />
          <UserInfoCard
            title={t("domicileInfo.details")}
            data={
              session.user.domicilio[0]?.detalles
                ? session.user.domicilio[0].detalles
                : "N/A"
            }
          />
          <UserInfoCard
            title={t("domicileInfo.city")}
            data={
              session.user.domicilio[0]?.ciudad &&
              session.user.domicilio[0].ciudad?.departamento
                ? `${session.user.domicilio[0].ciudad.nombre} ${session.user.domicilio[0].ciudad.departamento.nombre}`
                : "N/A"
            }
          />
        </InfoSection>
        <InfoSection
          onClick={() => handleAccessModal()}
          title={t("accessInfo.title")}
          editBtnText={t("editBtnText")}
        >
          <UserInfoCard
            title={t("accessInfo.email")}
            data={session.user.email}
          />
          <UserInfoCard title={t("accessInfo.password")} data="********" />
        </InfoSection>
      </div>
    </>
  );
}
