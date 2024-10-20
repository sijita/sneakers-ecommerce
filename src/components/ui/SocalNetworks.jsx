"use client";
import { IoLogoWhatsapp } from "react-icons/io5";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import MyDropdown from "./MyDropdown";
import { Menu } from "@headlessui/react";
import { useTranslations } from "next-intl";

export default function SocialNetworks() {
  const t = useTranslations("Aside");
  const socialNetworks = [
    {
      name: "Whatsapp",
      icon: <IoLogoWhatsapp size={17} />,
      url: "https://wa.me/573016666666",
    },
    {
      name: "Facebook",
      icon: <BsFacebook size={15} />,
      url: "https://www.facebook.com/",
    },
    {
      name: "Instagram",
      icon: <BsInstagram size={15} />,
      url: "https://www.instagram.com/",
    },
  ];

  return (
    <aside className="z-50 absolute">
      <div className="fixed sm:bottom-10 sm:right-10 bottom-5 right-5">
        <MyDropdown
          title={t("title")}
          position="right"
          menuStyle="w-full bottom-12"
          btnStyle="btn-primary border border-neutral text-secondary"
        >
          <>
            {socialNetworks.map((networks, i) => (
              <Menu.Item key={i} className="rounded cursor-pointer">
                {({ active }) => (
                  <a
                    href={networks.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex gap-3 text-sm w-full px-4 py-2 ${
                      active ? "bg-secondary text-primary" : "text-secondary"
                    }`}
                  >
                    {networks.icon} {networks.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </>
        </MyDropdown>
      </div>
    </aside>
  );
}
