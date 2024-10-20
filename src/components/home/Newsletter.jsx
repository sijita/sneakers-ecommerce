export default function Newsletter({
  title,
  subtitle,
  emailPlaceholder,
  subscribeBtnText,
}) {
  return (
    <section className="container mx-auto px-10 md:px-20">
      <div className="flex flex-col items-center justify-between gap-2 border-b border-neutral py-6 md:flex-row">
        <div className="mb-3 text-center md:mb-0 md:text-left">
          <span className="font-bold uppercase tracking-widest">{title}</span>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        <form className="flex w-full gap-2 md:max-w-md">
          <input
            placeholder={emailPlaceholder}
            className="w-full flex-1 input border-neutral"
          />
          <button className="btn btn-outline border-neutral font-bold flex items-center gap-3">
            {subscribeBtnText}
          </button>
        </form>
      </div>
    </section>
  );
}
