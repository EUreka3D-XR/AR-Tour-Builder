import { useMemo, useState } from "react";

/**
 * @template T
 * @param {Object} params
 * @param {T[]} params.items
 * @param {number} params.size
 * @param {number} params.page
 * @returns {{ data: T[], meta: { page: number, pageSize: number, totalItems: number, totalPages: number, needsPagination: boolean, setPage: (page: number) => void } }}
 */
const usePaginatedItems = ({ items = [], size, initialPage = 1 }) => {
  const [page, setPage] = useState(initialPage);
  const meta = useMemo(() => {
    const totalItems = items.length || 0;
    const totalPages = Math.ceil(totalItems / size);
    return {
      page,
      pageSize: size,
      totalItems,
      totalPages,
      needsPagination: totalPages > 1,
      setPage,
    };
  }, [items, size, page]);

  const start = (page - 1) * size;
  const end = start + size;

  return {
    data: items.slice(start, end),
    meta,
  };
};

export default usePaginatedItems;
