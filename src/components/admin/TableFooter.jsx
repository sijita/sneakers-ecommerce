import React from "react";

export default function TableFooter({
  data,
  pageIndex,
  setPageIndex,
  productsCount,
  showingPlaceholder,
  pagePlaceholder,
}) {
  const setNextPage = () => {
    if (productsCount > pageIndex * 12) {
      setPageIndex(pageIndex + 1);
    }
  };

  const setPrevPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <tfoot>
      <tr>
        <th className="text-base">
          {showingPlaceholder}: {data?.length}-{productsCount}
        </th>
        <th></th>
        <th></th>
        <th></th>
        <th className="text-base">
          {pagePlaceholder}: {pageIndex}
        </th>
        <th className="text-base"></th>
        <th className="space-x-2 text-end">
          <button
            onClick={setPrevPage}
            className="btn btn-sm btn-outline border-neutral"
          >
            {"<"}
          </button>
          <button
            onClick={setNextPage}
            className="btn btn-sm btn-outline border-neutral"
          >
            {">"}
          </button>
        </th>
      </tr>
    </tfoot>
  );
}
