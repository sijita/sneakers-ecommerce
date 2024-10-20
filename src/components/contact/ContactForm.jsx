export default function ContactForm({
  subtitle,
  text,
  fullnamePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  btnText,
}) {
  return (
    <section className="relative">
      <div className="container px-5 mx-auto flex flex-col lg:flex-row gap-10 justify-center">
        <div className="xl:w-2/3 bg-gray-300 rounded-lg overflow-hidden p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
            src="https://maps.google.com/maps?q=Neiva&t=&z=14&ie=UTF8&iwloc=&output=embed"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
          <div className="bg-white relative flex flex-col gap-3 p-6 rounded shadow-md">
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
              ADDRESS: 1234 Division St, San Francisco, CA 94103, USA
            </h2>
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
              EMAIL: example@email.com
            </h2>
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
              PHONE: 123-456-7890
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-5 xl:w-1/3 lg:w-1/3">
          <h2 className="text-2xl mb-1 font-bold">{subtitle}</h2>
          <p className="text-base-200 text-lg">{text}</p>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="sr-only">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full input border border-neutral"
              placeholder={fullnamePlaceholder}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full input border border-neutral"
              placeholder={emailPlaceholder}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="sr-only">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full textarea border border-neutral text-base max-h-28"
              placeholder={messagePlaceholder}
            ></textarea>
          </div>
          <button className="btn btn-secondary">{btnText}</button>
        </div>
      </div>
    </section>
  );
}
