import useEditUserInfo from "@/hooks/profile/useEditUserInfo";
import MyModal from "../ui/MyModal";

export default function ContactModal({ phonePlaceholder, saveBtnText, title }) {
  const {
    handleUserInfo,
    handleSubmit,
    userInfo,
    handleEditContact,
    contactModal,
  } = useEditUserInfo();
  return (
    <MyModal
      title={title}
      isOpen={contactModal}
      closeModal={() => handleEditContact()}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="sr-only" htmlFor="telefono">
          Teléfono
        </label>
        <input
          className="input border border-neutral"
          type="number"
          name="phone"
          placeholder={phonePlaceholder}
          value={userInfo.phone}
          onChange={handleUserInfo}
        />
        <button className="btn btn-outline border-neutral">
          {saveBtnText}
        </button>
      </form>
    </MyModal>
  );
}
