import Link from "next/link";
import useSignup from "@/hooks/useSignup";
import {
  HiOutlineAtSymbol,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

export default function SignupForm({
  namePlaceholder,
  lastnamePlaceholder,
  emailPlaceholder,
  passwordPlaceholder,
  confirmPasswordPlaceholder,
  passwordCondition,
  btnText,
  loginText,
}) {
  const { handleChange, handleSubmit, showPassword, setShowPassword } =
    useSignup();

  return (
    <div className="xl:w-3/12 flex flex-col gap-10">
      <form
        onSubmit={handleSubmit()}
        onChange={handleChange()}
        className="flex flex-col gap-5"
      >
        <div className="flex gap-5">
          <input
            type="text"
            name="name"
            className="input w-full border border-neutral"
            placeholder={namePlaceholder}
          />
          <input
            type="text"
            name="lastname"
            className="input w-full border border-neutral"
            placeholder={lastnamePlaceholder}
          />
        </div>
        <div className="relative">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="input w-full border border-neutral"
            placeholder={emailPlaceholder}
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <HiOutlineAtSymbol className="text-gray-500" />
          </span>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input w-full border border-neutral"
            placeholder={passwordPlaceholder}
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            className="input w-full border border-neutral"
            placeholder={confirmPasswordPlaceholder}
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
        <span className="text-sm text-base-200">{passwordCondition}</span>
        <button type="submit" className="btn btn-secondary w-full">
          {btnText}
        </button>
      </form>
      <div>
        <hr className="" />
        <hr className="" />
        <hr className="" />
      </div>
      <div className="text-center">
        <Link
          href="/login"
          className="text-secondary font-bold hover:text-neutral"
        >
          {loginText}
        </Link>
      </div>
    </div>
  );
}
