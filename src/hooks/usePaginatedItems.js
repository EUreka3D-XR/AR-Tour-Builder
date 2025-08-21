import { useMemo } from "react";

/**
 * @template T
 * @param {Object} params
 * @param {T[]} params.items
 * @param {number} params.size
 * @param {number} params.page
 * @returns {{ data: T[], meta: { page: number, pageSize: number, totalItems: number, totalPages: number, needsPagination: boolean } }}
 */
const usePaginatedItems = ({ items = [], size, page }) => {
  const meta = useMemo(() => {
    const totalItems = items.length || 0;
    const totalPages = Math.ceil(totalItems / size);
    return {
      page,
      pageSize: size,
      totalItems,
      totalPages,
      needsPagination: totalPages > 1,
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
