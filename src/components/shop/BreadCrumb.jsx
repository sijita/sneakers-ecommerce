import Link from "next/link";
import { useTranslations } from "next-intl";

export default function BreadCrumb({ name }) {
  const t = useTranslations("Shop.breadcrumb");

  return (
    <div className="text-sm breadcrumbs text-base-200">
      <ul>
        <li>
          <Link href="/">{t("home")}</Link>
        </li>
        <li>
          <Link href="/shop">{t("shop")}</Link>
        </li>
        <li>{name}</li>
      </ul>
    </div>
  );
}
