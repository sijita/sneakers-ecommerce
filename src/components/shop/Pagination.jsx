import { useTranslations } from "next-intl";

export default function Pagination({ data, pageIndex, setPageIndex }) {
  const t = useTranslations("Pagination");
  const setNextPage = () => {
    if (data?.productsCount > pageIndex * 12) {
      setPageIndex(pageIndex + 1);
    }
  };

  const setPrevPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  const totalPages = Math.ceil(data?.productsCount / 12);
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  return (
    <>
      <button
        onClick={setPrevPage}
        className="btn btn-outline border-neutral btn-wide"
        disabled={pageIndex === 1}
      >
        {t("previous")}
      </button>
      {range(totalPages).map((page) => (
        <button
          key={page}
          onClick={() => setPageIndex(page + 1)}
          className={`btn btn-outline border-neutral btn-square ${
            pageIndex === page + 1
              ? "disabled:border-neutral disabled:text-secondary"
              : ""
          }`}
          disabled={pageIndex === page + 1}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={setNextPage}
        className="btn btn-outline border-neutral btn-wide"
        disabled={pageIndex === totalPages || totalPages === 1}
      >
        {t("next")}
      </button>
    </>
  );
}
