import { HiOutlineAtSymbol } from "react-icons/hi";
import useRecoverPassword from "@/hooks/recover/useRecoverPassword";

export default function RecoverMailForm({ emailPlaceholder, saveBtnText }) {
  const { handleSubmitVerifyEmail, handleVerifyEmailChange, email } =
    useRecoverPassword();

  return (
    <form onSubmit={handleSubmitVerifyEmail()} className="flex flex-col gap-5 ">
      <div>
        <div className="relative">
          <input
            type="email"
            name="email"
            className="input w-full border border-neutral"
            placeholder={emailPlaceholder}
            value={email}
            onChange={handleVerifyEmailChange()}
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <HiOutlineAtSymbol className="text-gray-500" />
          </span>
        </div>
      </div>
      <button className="btn btn-secondary w-full">{saveBtnText}</button>
    </form>
  );
}
