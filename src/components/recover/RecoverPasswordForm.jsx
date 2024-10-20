import useRecoverPassword from "@/hooks/recover/useRecoverPassword";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function RecoverPasswordForm({
  token,
  passwordPlaceholder,
  confirmPasswordPlaceholder,
  saveBtnText,
  conditionsText,
}) {
  const {
    showPassword,
    setShowPassword,
    handlePasswordChange,
    handleSubmitRecoverPassword,
    password,
  } = useRecoverPassword();

  return (
    <form
      onSubmit={handleSubmitRecoverPassword(token)}
      className="flex flex-col gap-5 "
    >
      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input w-full border border-neutral"
            placeholder={passwordPlaceholder}
            value={password.password}
            onChange={handlePasswordChange()}
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
      </div>
      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            className="input w-full border border-neutral"
            placeholder={confirmPasswordPlaceholder}
            value={password.confirmPassword}
            onChange={handlePasswordChange()}
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
      </div>
      <span className="text-sm text-base-200">{conditionsText}</span>
      <button className="btn btn-secondary w-full">{saveBtnText}</button>
    </form>
  );
}
