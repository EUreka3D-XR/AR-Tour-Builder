import { useCallback } from "react";
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
 * @property {boolean} [numeric] - Whether the column contains numeric data
 * @property {boolean} [disableSorting] - Whether sorting is disabled for the column
 * @property {string} [align] - Text alignment for the column ('left'|'center'|'right')
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
export default function Table({
  pageSizeOptions = [10, 25, 50],
  onRequestSort,
  onChangePage,
  onChangePageSize,
  pageSize = 10,
  page,
  order,
  orderBy,
  rows,
  columns,
}) {
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
    <div>
      <MuiTableContainer>
        <MuiTable>
          <TableHeader
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
          />
          <TableBody columns={columns} rows={rows} pageSize={pageSize} />
        </MuiTable>
      </MuiTableContainer>
      <MuiTablePagination
        rowsPerPageOptions={pageSizeOptions}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={page >= 0 ? page : 0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePageSize}
      />
    </div>
  );
}
