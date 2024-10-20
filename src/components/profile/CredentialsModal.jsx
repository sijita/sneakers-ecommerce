import useEditUserAccessCredentials from "@/hooks/profile/useEditUserAccessCredentials";
import MyModal from "../ui/MyModal";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function CredentialsModal({
  title,
  saveBtnText,
  emailPlaceholder,
  passwordPlaceholder,
}) {
  const {
    credentialsModal,
    handleCredentialsModal,
    userInfo,
    showPassword,
    setShowPassword,
    handleUserInfo,
    password,
    handlePassword,
    handleSubmit,
  } = useEditUserAccessCredentials();

  return (
    <MyModal
      isOpen={credentialsModal}
      closeModal={() => handleCredentialsModal()}
      title={title}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          name="email"
          placeholder={emailPlaceholder}
          className="input border border-neutral"
          value={userInfo.email}
          onChange={handleUserInfo}
        />
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
          {saveBtnText}
        </button>
      </form>
    </MyModal>
  );
}
