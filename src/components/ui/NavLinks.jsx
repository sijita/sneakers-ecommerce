import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ route, title, onClick }) {
  const pathname = usePathname();
  return (
    <Link
      className={`text-lg transition duration-100 hover:text-secondary uppercase ${
        pathname.endsWith(route) || (pathname === "/en" && route === "/")
          ? `text-secondary font-bold border-b-2 border-secondary`
          : "text-base-200 font-medium"
      }`}
      href={route}
      onClick={onClick}
    >
      {title}
    </Link>
  );
}
