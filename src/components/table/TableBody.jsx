import { useMemo } from "react";
import { TableBody as MuiTableBody, TableCell, TableRow } from "@mui/material";

import getColumnStyle from "./_utils/columnWidth";

/**
 * Props for TableBody component
 * @typedef {Object} TableBodyProps
 * @property {import('./Table').TableColumn[]} columns - Array of table column definitions
 * @property {import('./Table').TableRow[]} rows - Array of table row data
 * @property {number} pageSize - Number of rows to display per page
 */

/**
 * TableBody component that renders table rows based on columns and data
 * @param {TableBodyProps} props - TableBody props
 * @returns {React.ReactElement} Rendered table body component
 */
function TableBody({ columns, rows, pageSize }) {
  const emptyRows = useMemo(
    () => pageSize - Math.min(pageSize, rows.length),
    [pageSize, rows.length],
  );

  return (
    <MuiTableBody>
      {rows.map((row) => {
        return (
          <TableRow tabIndex={-1} key={row.id}>
            {columns.map((column) => {
              const style = getColumnStyle(column);

              return column.renderCell ? (
                <TableCell key={column.value} sx={style}>
                  {column.renderCell(row)}
                </TableCell>
              ) : (
                <TableCell key={column.value} sx={style}>
                  {row[column.value]}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          sx={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={columns.length} />
        </TableRow>
      )}
    </MuiTableBody>
  );
}

export default TableBody;
