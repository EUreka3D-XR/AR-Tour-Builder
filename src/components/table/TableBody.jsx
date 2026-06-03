import { TableBody as MuiTableBody, TableCell, TableRow } from "@mui/material";

import getColumnStyle from "./_utils/columnWidth";

/**
 * Props for TableBody component
 * @typedef {Object} TableBodyProps
 * @property {import('./Table').TableColumn[]} columns - Array of table column definitions
 * @property {import('./Table').TableRow[]} rows - Array of table row data
 * @property {number} pageSize - Number of rows to display per page
 * @property {string} [className] - Optional additional class name for the table body
 */

/**
 * TableBody component that renders table rows based on columns and data
 * @param {TableBodyProps} props - TableBody props
 * @returns {React.ReactElement} Rendered table body component
 */
function TableBody({ columns, rows, className }) {
  return (
    <MuiTableBody className={className}>
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
    </MuiTableBody>
  );
}

export default TableBody;
