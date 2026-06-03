import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  styled,
} from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import SearchInput from "@/components/search-input/SearchInput";
import { useToggle } from "@/hooks/useToggle";
import { useLibraryAssets } from "@/services/libraryService";
import AssetsPresentation from "../_presentation/AssetsPresentation";

const BrowsingContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 2, 0, 4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflow: "hidden",
  "& .presentation-wrapper": {
    overflow: "auto",
    flex: 1,
  },
}));

const FilterRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  padding: theme.spacing(2, 0),
}));

const SortByFormControlStyled = styled(FormControl)(({ theme }) => ({
  flexShrink: 0,
  "& .sortby-item": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  "& .sortby-icon": {
    color: theme.palette.text.secondary,
  },
}));

function AssetsModalBrowser({ allowMultiple, selected, setSelected }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { isOpen: isListView, toggle: toggleListView } = useToggle(true);

  const sortOptions = useMemo(() => [
    { value: "title-asc", label: t("assetsModal.browser.sortOptions.titleAsc") },
    { value: "title-desc", label: t("assetsModal.browser.sortOptions.titleDesc") },
  ], [t]);

  const sortOptionsMap = useMemo(() => sortOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {}), [sortOptions]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "",
    sortBy: sortOptions[0].value,
    page: 0,
    pageSize: 25,
  });

  const apiParams = useMemo(() => ({
    searchTerm: filters.searchTerm,
    type: filters.type || undefined,
    ordering: filters.sortBy === "title-asc" ? "title" : "-title",
    page: filters.page,
    pageSize: filters.pageSize,
  }), [filters]);

  const { data, fetchState } = useLibraryAssets(projectId, apiParams);

  const totalPages = data?.total ? Math.ceil(data.total / filters.pageSize) : 0;

  const handleFilterChange = (key) => (value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
  };

  return (
    <BrowsingContent className="browsing-form">
      <FilterRow>
        <SearchInput
          value={filters.searchTerm}
          onChange={handleFilterChange("searchTerm")}
          placeholder={t("assetsModal.browser.searchPlaceholder")}
        />
        <Select
          value={filters.type}
          displayEmpty
          onChange={(e) => handleFilterChange("type")(e.target.value)}
        >
          <MenuItem value="">{t("assetsModal.browser.fileTypes.all")}</MenuItem>
          <MenuItem value="image">{t("assetsModal.browser.fileTypes.images")}</MenuItem>
          <MenuItem value="video">{t("assetsModal.browser.fileTypes.videos")}</MenuItem>
          <MenuItem value="model3d">{t("assetsModal.browser.fileTypes.models3d")}</MenuItem>
          <MenuItem value="text">{t("assetsModal.browser.fileTypes.documents")}</MenuItem>
        </Select>
        <SortByFormControlStyled size="small">
          <Select
            renderValue={(se) => (
              <div className="sortby-item">
                <EurekaIcon name="sort" fontSize="small" className="sortby-icon" />
                {sortOptionsMap[se]}
              </div>
            )}
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy")(e.target.value)}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </SortByFormControlStyled>
        <Box sx={{ width: "100px", flexShrink: 0 }} />
        <IconButton onClick={toggleListView}>
          {isListView ? (
            <EurekaIcon name="gridView" />
          ) : (
            <EurekaIcon name="list" />
          )}
        </IconButton>
      </FilterRow>
      <div className="presentation-wrapper">
        <AssetsPresentation
          isListView={isListView}
          allowMultiple={allowMultiple}
          assets={data?.items}
          fetchState={fetchState}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={filters.page + 1}
          onChange={(_, newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage - 1 }))
          }
          sx={{ display: "flex", justifyContent: "center", flexShrink: 0, py: 1 }}
        />
      )}
    </BrowsingContent>
  );
}

export default AssetsModalBrowser;
