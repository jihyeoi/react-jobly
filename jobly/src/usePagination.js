import { useState, useMemo } from "react";

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!Array.isArray(data)) return [];

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [currentPage, itemsPerPage, data]);

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  }

  function reset() {
    setCurrentPage(1)
  }

  return { next, prev, jump, reset, currentData, currentPage, maxPage };
}

export default usePagination;