"use client";
import { FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
import Newsletter from "./home/Newsletter";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const links = [
    {
      title: t("products.title"),
      links: [
        {
          title: t("products.overview"),
          url: "#",
        },
        {
          title: t("products.solutions"),
          url: "#",
        },
        {
          title: t("products.pricing"),
          url: "#",
        },
      ],
    },
    {
      title: t("company.title"),
      links: [
        {
          title: t("company.about"),
          url: "#",
        },
        {
          title: t("company.jobs"),
          url: "#",
        },
        {
          title: t("company.contact"),
          url: "#",
        },
      ],
    },
    {
      title: t("support.title"),
      links: [
        {
          title: t("support.help"),
          url: "#",
        },
        {
          title: t("support.community"),
          url: "#",
        },
      ],
    },
    {
      title: t("legal.title"),
      links: [
        {
          title: t("legal.privacy"),
          url: "#",
        },
        {
          title: t("legal.terms"),
          url: "#",
        },
        {
          title: t("legal.security"),
          url: "#",
        },
      ],
    },
  ];

  return (
    <footer className="pt-5 bg-primary border-t border-neutral">
      <Newsletter
        emailPlaceholder={t("newsletter.email")}
        subscribeBtnText={t("newsletter.subscribeBtnText")}
        title={t("newsletter.title")}
        subtitle={t("newsletter.subtitle")}
      />
      <div className="pt-12">
        <div className="container mx-auto px-10 md:px-20">
          <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
            <div className="col-span-full lg:col-span-2">
              <div className="mb-4 lg:-mt-2">
                <a
                  href="/"
                  className="text-black-800 inline-flex items-center gap-2 text-xl font-bold md:text-2xl"
                  aria-label="logo"
                >
                  eCommerce
                </a>
              </div>
              <p className="mb-6 text-gray-400 sm:pr-8">
                Filler text is dummy text which has no meaning however looks
                very similar to real text
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  target="_blank"
                  className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                >
                  <FiFacebook size={20} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                >
                  <FiInstagram size={20} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                >
                  <FiTwitter size={20} />
                </a>
              </div>
            </div>
            {links.map((link, i) => (
              <div key={i} className="col-span-2 md:col-span-1">
                <h6 className="mb-4 font-semibold text-black-800">
                  {link.title}
                </h6>
                <ul className="text-sm">
                  {link.links.map((link, i) => (
                    <li key={i} className="mb-2">
                      <a
                        href={link.url}
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral py-8 text-center text-sm text-base-200">
            © 2023 - eCommerce. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
