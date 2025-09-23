import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

/**
 * Props for TableHeader component
 * @typedef {Object} TableHeaderProps
 * @property {import('./Table').TableColumn[]} [columns=[]] - Array of table column definitions
 * @property {import('./Table').SortOrder} order - Current sort order ('asc' or 'desc')
 * @property {string} orderBy - Current column being sorted by
 * @property {Function} onRequestSort - Handler for sort requests (event, property)
 */

/**
 * TableHeader component that renders sortable table headers
 * @param {TableHeaderProps} props - TableHeader props
 * @returns {React.ReactElement} Rendered table header component
 */
function TableHeader({ columns = [], order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.value}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={
              headCell.disableSorting
                ? false
                : orderBy === headCell.value
                  ? order
                  : false
            }
            sx={{ fontWeight: 600, minWidth: headCell.width }}
          >
            {!headCell.disableSorting ? (
              <TableSortLabel
                active={orderBy === headCell.value}
                direction={orderBy === headCell.value ? order : "asc"}
                onClick={createSortHandler(headCell.label)}
              >
                {headCell.label}
                {orderBy === headCell.value ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
