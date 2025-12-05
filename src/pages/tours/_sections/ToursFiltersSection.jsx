import { useMemo } from "react";
import { Divider, FormControl, MenuItem, Select, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

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
 * @param {string} props.firstTourId - ID of the first tour in the list
 * @returns {React.ReactElement} Rendered tours filters section
 */
function ToursFiltersSection({ defaultTourId }) {
  const { t } = useTranslation();
  const { filterParams, updateParams, resetParams } = useDashboardParams();

  const sortOptions = useMemo(
    () => [
      { value: "latest", label: t("tours.filters.sort.latest") },
      { value: "oldest", label: t("tours.filters.sort.oldest") },
      { value: "title-asc", label: t("tours.filters.sort.titleAsc") },
      { value: "title-desc", label: t("tours.filters.sort.titleDesc") },
      { value: "duration-short", label: t("tours.filters.sort.durationShort") },
      { value: "duration-long", label: t("tours.filters.sort.durationLong") },
    ],
    [t],
  );

  const sortOptionsMap = useMemo(
    () =>
      sortOptions.reduce((acc, option) => {
        acc[option.value] = option.label;
        return acc;
      }, {}),
    [sortOptions],
  );

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
      updateParams({ viewMode: "list", tourId: null });
      return;
    }
    updateParams({ viewMode: "map", tourId: defaultTourId });
  };

  const handleResetFilters = () => {
    resetParams();
  };

  return (
    <ContainerStyled>
      <SearchInput
        placeholder={t("tours.filters.searchPlaceholder")}
        value={filterParams.searchTerm || ""}
        onChange={handleFilterChange("searchTerm")}
      />

      <FormControl size="small" className="no-shrink">
        <Select
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
      <Divider orientation="vertical" flexItem className="no-shrink" />
      <Button
        className="no-shrink"
        variant="text"
        disableGutters
        startIcon={
          <EurekaIcon
            name={filterParams.viewMode === "map" ? "close" : "map"}
          />
        }
        onClick={handleToggleMapView}
      >
        {filterParams.viewMode === "map"
          ? t("tours.filters.closeMap")
          : t("tours.filters.showOnMap")}
      </Button>
    </ContainerStyled>
  );
}

export default ToursFiltersSection;
