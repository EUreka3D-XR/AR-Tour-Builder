import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  styled,
} from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import SearchInput from "@/components/search-input/SearchInput";
import { useToggle } from "@/hooks/useToggle";
import AssetsPresentation from "../_presentation/AssetsPresentation";

const BrowsingContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 2, 0, 4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflow: "hidden",
  "& .presentation-wrapper": {
    overflow: "auto",
    paddingBottom: theme.spacing(10),
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
  });

  return (
    <BrowsingContent className="browsing-form">
      <FilterRow>
        <SearchInput
          value={filters.searchTerm}
          onChange={(term) =>
            setFilters((prev) => ({ ...prev, searchTerm: term }))
          }
          placeholder={t("assetsModal.browser.searchPlaceholder")}
        />
        <Select
          value={filters.type}
          displayEmpty
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, type: e.target.value }))
          }
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
                <EurekaIcon
                  name="sort"
                  fontSize="small"
                  className="sortby-icon"
                />
                {sortOptionsMap[se]}
              </div>
            )}
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
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
          filters={filters}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </BrowsingContent>
  );
}

export default AssetsModalBrowser;
