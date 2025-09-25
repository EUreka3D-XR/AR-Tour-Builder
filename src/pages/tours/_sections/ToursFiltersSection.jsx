import { useMemo } from "react";
import { FormControl, MenuItem, Select, styled } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SearchInput from "@/components/search-input/SearchInput";
import useDashboardParams from "@/hooks/useDashboardParams";
import FiltersButton from "../_components/FiltersButton";

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
    gap: theme.spacing(1),
  },
  "& .filter-icon": {
    color: theme.palette.text.secondary,
  },
}));

const sortOptions = [
  { value: "latest", label: "Date (Newest)" },
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
function ToursFiltersSection() {
  const { filterParams, updateParams, resetParams } = useDashboardParams();

  const filters = useMemo(
    () => ({
      tourType: filterParams.tourType || "all",
      status: filterParams.status || "all",
    }),
    [filterParams],
  );

  const handleFilterChange = (key) => (event) => {
    if (event.target?.value) {
      updateParams({ [key]: event.target.value });
      return;
    }
    updateParams({ [key]: event });
  };

  const handleToggleMapView = () => {
    if (filterParams.viewMode === "map") {
      updateParams({ viewMode: "list" });
      return;
    }
    updateParams({ viewMode: "map" });
  };

  const handleResetFilters = () => {
    resetParams();
  };

  return (
    <ContainerStyled>
      <SearchInput
        placeholder="Search tours..."
        value={filterParams.searchTerm || ""}
        onChange={handleFilterChange("searchTerm")}
      />

      <FormControl size="small" className="no-shrink">
        <Select
          size="small"
          renderValue={(se) => (
            <div className="dropdown-item">
              <EurekaIcon
                name="sort"
                fontSize="small"
                className="filter-icon"
              />
              {sortOptionsMap[se]}
            </div>
          )}
          value={filterParams.sortBy || sortOptions[0].value}
          onChange={handleFilterChange("sortBy")}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FiltersButton
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilter={handleResetFilters}
      />
      <Button
        className="no-shrink"
        variant="text"
        startIcon={
          <EurekaIcon
            name={filterParams.viewMode === "map" ? "close" : "map"}
          />
        }
        onClick={handleToggleMapView}
      >
        {filterParams.viewMode === "map" ? "Close Map" : "Show on Map"}
      </Button>
    </ContainerStyled>
  );
}

export default ToursFiltersSection;
