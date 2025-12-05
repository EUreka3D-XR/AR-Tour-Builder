import { useState } from "react";
import clsx from "clsx";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Badge, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import FiltersPopper from "./FiltersPopper";

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

function FiltersButton({ onFilterChange, onResetFilter, filters }) {
  const { t } = useTranslation();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const isFilterOpen = Boolean(filterAnchorEl);
  const activeFiltersCount = Object.values(filters).filter(
    (value, index) => value !== ["all", "all"][index],
  ).length;
  const hasActiveFilters = activeFiltersCount > 0;

  const handleFilterClick = (event) => {
    setFilterAnchorEl(filterAnchorEl ? null : event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <>
      <FilterButtonStyled
        startIcon={
          <Badge badgeContent={activeFiltersCount} color="primary">
            <EurekaIcon
              name="filter"
              fontSize="small"
              className="filter-icon"
            />
          </Badge>
        }
        endIcon={<KeyboardArrowDown />}
        disableGutters
        className={clsx("no-shrink", { active: hasActiveFilters })}
        onClick={handleFilterClick}
      >
        {t("tours.filters.filter")}
      </FilterButtonStyled>
      <FiltersPopper
        filters={filters}
        isOpen={isFilterOpen}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        onChange={onFilterChange}
        onReset={onResetFilter}
      />
    </>
  );
}

export default FiltersButton;
