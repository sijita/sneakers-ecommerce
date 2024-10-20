import Filters from "@/components/shop/Filters";
import Nav from "@/components/shop/Nav";

export default function layout({ children }) {
  return (
    <main>
      <Nav />
      <Filters paddingX="px-10 sm:px-[5rem]" />
      {children}
    </main>
  );
}
