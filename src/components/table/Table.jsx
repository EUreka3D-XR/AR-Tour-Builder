import { useCallback, useMemo } from "react";
import { styled } from "@mui/material";
import MuiTable from "@mui/material/Table";
import MuiTableContainer from "@mui/material/TableContainer";
import MuiTablePagination from "@mui/material/TablePagination";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

/**
 * Sort order types
 * @typedef {'asc'|'desc'} SortOrder
 */

/**
 * Table column definition
 * @typedef {Object} TableColumn
 * @property {string} value - Unique value for the column
 * @property {string} label - Display label for the column header
 * @property {number|string} [width] - Width of the column (e.g., '100px' or 100)
 * @property {number|string} [minWidth] - Minimum width of the column (e.g., '100px' or 100)
 * @property {number|string} [maxWidth] - Maximum width of the column (e.g., '100px' or 100)
 * @property {boolean} [numeric] - Whether the column contains numeric data
 * @property {boolean} [disableSorting] - Whether sorting is disabled for the column
 * @property {string} [align] - Text alignment for the column ('left'|'center'|'right')
 * @property {Function} [renderCell] - Custom cell rendering function (row) => ReactNode
 * @property {boolean} [wrap] - Whether to wrap text in the column
 */

/**
 * Table row data - generic object with string keys
 * @typedef {Object.<string, any>} TableRow
 */

/**
 * Props for Table component
 * @typedef {Object} TableProps
 * @property {number[]} [pageSizeOptions=[10, 25, 50]] - Options for rows per page dropdown
 * @property {Function} onRequestSort - Handler for sort requests (column, order)
 * @property {Function} onChangePage - Handler for page changes
 * @property {Function} onChangeRowsPerPage - Handler for rows per page changes
 * @property {number} pageSize - Current number of rows per page
 * @property {number} page - Current page number (0-indexed)
 * @property {SortOrder} order - Current sort order
 * @property {string} orderBy - Current sort column id
 * @property {TableRow[]} rows - Array of table row data
 * @property {TableColumn[]} columns - Array of table column definitions
 */

/**
 * Enhanced table component with sorting and pagination
 * @param {TableProps} props - Table props
 * @returns {React.ReactElement} Rendered table component
 */

const ContainerStyled = styled("div")(() => ({
  label: "table-wrapper",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  "& .expanded-table": {
    flex: 1,
  },
  "& .pagination-footer": {
    flexShrink: 0,
  },
}));

export default function Table({
  pageSizeOptions = [10, 25, 50],
  onRequestSort,
  onChangePage,
  onChangePageSize,
  pageSize = 10,
  page,
  total,
  order,
  orderBy,
  rows,
  columns,
}) {
  const rowsPaged = useMemo(() => {
    if (!Array.isArray(rows)) return [];
    return rows.slice(page * pageSize, (page + 1) * pageSize);
  }, [rows, page, pageSize]);

  const handleChangePage = useCallback(
    (_, newPage) => {
      onChangePage(newPage);
    },
    [onChangePage],
  );

  const handleChangePageSize = useCallback(
    (event) => {
      onChangePageSize(event?.target?.value || pageSize);
    },
    [onChangePageSize, pageSize],
  );

  return (
    <ContainerStyled>
      <MuiTableContainer className="expanded-table">
        <MuiTable stickyHeader>
          <TableHeader
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
          />
          <TableBody columns={columns} rows={rowsPaged} pageSize={pageSize} />
        </MuiTable>
      </MuiTableContainer>
      <MuiTablePagination
        rowsPerPageOptions={pageSizeOptions}
        component="div"
        count={total}
        rowsPerPage={pageSize}
        page={page >= 0 ? page : 0}
        className="pagination-footer"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePageSize}
      />
    </ContainerStyled>
  );
}
