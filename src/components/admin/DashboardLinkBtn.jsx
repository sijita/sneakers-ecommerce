import Link from "next/link";

export default function DashboardLinkBtn({ href, title }) {
  return (
    <Link
      href={href}
      className="btn btn-outline border-neutral font-normal"
    >
      <p className="lg:text-lg flex gap-10 items-center">{title}</p>
    </Link>
  );
}
