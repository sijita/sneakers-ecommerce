import MyModal from "../ui/MyModal";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import useEditUserAccessCredentials from "@/hooks/profile/useEditUserAccessCredentials";

export default function AccessModal({
  title,
  continueBtnText,
  verifyPasswordPlaceholder,
  passwordPlaceholder,
}) {
  const {
    accesModal,
    handleAccessModal,
    setShowPassword,
    showPassword,
    verifyPassword,
    password,
    handlePassword,
  } = useEditUserAccessCredentials();

  return (
    <MyModal
      title={title}
      isOpen={accesModal}
      closeModal={() => handleAccessModal()}
    >
      <form onSubmit={verifyPassword} className="flex flex-col gap-5">
        <h3 className="text-lg">{verifyPasswordPlaceholder}</h3>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input w-full border border-neutral"
            placeholder={passwordPlaceholder}
            value={password}
            onChange={handlePassword}
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
          {continueBtnText}
        </button>
      </form>
    </MyModal>
  );
}
