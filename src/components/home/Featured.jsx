"use client";
import Carousel from "nuka-carousel";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import ProductCard from "./ProductCard";
import Titles from "../ui/Titles";
import useWindowSize from "../../hooks/useWindowSize";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Featured({ title }) {
  const { windowWidth } = useWindowSize();
  const { data, error, isLoading } = useSWR(`/api/products/featured`, fetcher);

  if (isLoading || !data || error || !data?.topProducts?.length) {
    return null;
  }

  const slidesToShow =
    windowWidth >= 1024 && data.topProducts.length >= 3
      ? 3
      : windowWidth >= 768 && data.topProducts.length >= 2
      ? 2
      : 1;

  return (
    <section className="container mx-auto p-10 md:p-20">
      <div className="flex justify-center items-center gap-20 flex-col">
        <Titles size="text-3xl" title={title} />
        <div className="w-full">
          <Carousel
            defaultControlsConfig={{
              nextButtonStyle: {
                backgroundColor: "black",
                opacity: 1,
                borderRadius: "10%",
              },
              prevButtonStyle: {
                backgroundColor: "black",
                opacity: 1,
                borderRadius: "10%",
              },
              nextButtonText: <HiOutlineChevronRight className="text-2xl" />,
              prevButtonText: <HiOutlineChevronLeft className="text-2xl" />,
              pagingDotsClassName: "hidden",
            }}
            wrapAround
            cellSpacing={20}
            autoplay
            slidesToShow={slidesToShow}
          >
            {data?.topProducts.map(
              ({ id, nombre, precio, imagen, categoria, calificacion }) => (
                <ProductCard
                  key={id}
                  id={id}
                  name={nombre}
                  price={precio}
                  category={categoria.nombre}
                  rating={Math.round(
                    calificacion.reduce(
                      (acc, item) => acc + item.puntuacion,
                      0
                    ) / calificacion.length
                  )}
                  image={imagen[0]}
                />
              )
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
