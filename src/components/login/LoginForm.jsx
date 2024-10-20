import Link from "next/link";
import {
  HiOutlineAtSymbol,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import useLogin from "@/hooks/useLogin";

export default function LoginForm({
  emailPlaceholder,
  passwordPlaceholder,
  btnText,
  signupText,
  recoverText,
}) {
  const { showPassword, setShowPassword, handleChange, handleSubmit } =
    useLogin();

  return (
    <div className="xl:w-3/12 w-11/12 md:w-9/12 lg:w-7/12 flex flex-col gap-10">
      <form
        onChange={handleChange()}
        onSubmit={handleSubmit()}
        className="flex flex-col gap-5 "
      >
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
          <label htmlFor="password" className="sr-only">
            Password
          </label>
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
        <button type="submit" className="btn btn-secondary w-full">
          {btnText}
        </button>
      </form>
      <div>
        <hr className="" />
        <hr className="" />
        <hr className="" />
      </div>
      <div className="flex justify-center sm:justify-between gap-5 flex-wrap">
        <Link
          href="/recover"
          className="text-base-200 font-semibold hover:text-neutral"
        >
          {recoverText}
        </Link>
        <Link
          href="/signup"
          className="text-secondary font-bold hover:text-neutral"
        >
          {signupText}
        </Link>
      </div>
    </div>
  );
}
