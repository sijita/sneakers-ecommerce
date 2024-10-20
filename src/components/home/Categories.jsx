import CategoryCard from "./CategoryCard";

export default function Categories({
  firstCategory,
  secondCategory,
  thirdCategory,
  btnText,
}) {
  const categories = [
    {
      src: "/kids.webp",
      alt: firstCategory,
      title: firstCategory,
      link: "/shop/kids",
    },
    {
      src: "/man.webp",
      alt: secondCategory,
      title: secondCategory,
      link: "/shop/man",
    },
    {
      src: "/woman.webp",
      alt: thirdCategory,
      title: thirdCategory,
      link: "/shop/woman",
    },
  ];

  return (
    <section className="container mx-auto p-10 md:p-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
        {categories.map(({ src, alt, title, link }, i) => (
          <CategoryCard
            key={i}
            src={src}
            alt={alt}
            title={title}
            link={link}
            btnText={btnText}
          />
        ))}
      </div>
    </section>
  );
}
