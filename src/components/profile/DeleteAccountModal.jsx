import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import MyModal from "../ui/MyModal";
import useDeleteAccount from "@/hooks/profile/useDeleteAccount";

export default function DeleteAccountModal({
  title,
  subtitle,
  deleteBtnText,
  recomendation,
  passwordPlaceholder,
}) {
  const {
    handleDeleteAccountModal,
    deleteAccountModal,
    handleChangePassword,
    handleSubmit,
    showPassword,
    setShowPassword,
  } = useDeleteAccount();
  return (
    <MyModal
      isOpen={deleteAccountModal}
      closeModal={() => handleDeleteAccountModal()}
      title={title}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h3 className="text-lg font-bold">{subtitle}</h3>
        <p>{recomendation}</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input w-full border border-neutral"
            placeholder={passwordPlaceholder}
            onChange={handleChangePassword}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 end-0 grid place-content-center px-4"
          >
            {showPassword ? (
              <HiOutlineEye className="text-gray-500" />
            ) : (
              <HiOutlineEyeOff className="text-gray-500" />
            )}
          </button>
        </div>
        <button className="btn btn-outline border-neutral">
          {deleteBtnText}
        </button>
      </form>
    </MyModal>
  );
}
