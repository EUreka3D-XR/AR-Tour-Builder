import { useState } from "react";
import clsx from "clsx";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { FormControl, MenuItem, Select, styled } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SearchInput from "@/components/search-input/SearchInput";
import FiltersPopper from "../_components/FiltersPopper";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "stretch",
  paddingRight: theme.spacing(2),
  "& .no-shrink": {
    flexShrink: 0,
  },
  "& .dropdown-item": {
    display: "flex",
    alignItems: "center",
  },
  "& .filter-icon": {
    color: theme.palette.text.secondary,
  },
}));

const FilterButtonStyled = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  color: theme.palette.text.primary,
  borderRadius: theme.spacing(0.5),
  "&:hover": {
    backgroundColor: "white",
    borderColor: theme.palette.text.primary,
  },
  "&.active": {
    borderColor: theme.palette.text.primary,
  },
}));

const sortOptions = [
  { value: "newest", label: "Date (Newest)" },
  { value: "oldest", label: "Date (Oldest)" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "duration-short", label: "Duration (Shortest)" },
  { value: "duration-long", label: "Duration (Longest)" },
];

const sortOptionsMap = sortOptions.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

/**
 * Props for ToursFiltersSection component
 * @typedef {Object} ToursFiltersSectionProps
 * @property {Function} [onFilterChange] - Callback when filters change
 * @property {Function} [onSortChange] - Callback when sort changes
 * @property {Function} [onSearchChange] - Callback when search changes
 */

/**
 * ToursFiltersSection component for filtering and searching tours
 * @param {ToursFiltersSectionProps} props - ToursFiltersSection props
 * @returns {React.ReactElement} Rendered tours filters section
 */
function ToursFiltersSection({ onFilterChange, onSortChange, onSearchChange }) {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    tourType: "all",
    status: "all",
  });
  const [sortBy, setSortBy] = useState("newest");

  const isFilterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(filterAnchorEl ? null : event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSortBy(newSort);
    onSortChange?.(newSort);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      tourType: "all",
      status: "all",
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value, index) => value !== ["all", "all"][index],
  );

  return (
    <ContainerStyled>
      <SearchInput placeholder="Search tours..." onChange={onSearchChange} />

      {/* Sort Dropdown */}
      <FormControl size="small" className="no-shrink">
        <Select
          size="small"
          renderValue={(se) => (
            <div className="dropdown-item">
              <EurekaIcon
                name="sort"
                fontSize="small"
                className="filter-icon"
                sx={{ mr: 1 }}
              />
              {sortOptionsMap[se]}
            </div>
          )}
          value={sortBy}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filter Button */}
      <FilterButtonStyled
        onClick={handleFilterClick}
        className={clsx("no-shrink", { active: hasActiveFilters })}
        startIcon={<EurekaIcon name="filter" className="filter-icon" />}
        endIcon={<KeyboardArrowDown />}
      >
        Filter
      </FilterButtonStyled>
      <Button
        className="no-shrink"
        variant="text"
        startIcon={<EurekaIcon name="map" />}
      >
        Show on Map
      </Button>

      {/* Filter Dropdown */}
      <FiltersPopper
        filters={filters}
        isOpen={isFilterOpen}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />
    </ContainerStyled>
  );
}

export default ToursFiltersSection;
