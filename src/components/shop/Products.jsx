import ProductCard from "./ProductCard";

export default function Products({ data, locale }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 justify-between w-full">
      {data?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.nombre}
          price={product.precio.toLocaleString("es-CO")}
          image={product.imagen[0]}
          category={product.categoria.nombre}
          locale={locale}
        />
      ))}
    </div>
  );
}
