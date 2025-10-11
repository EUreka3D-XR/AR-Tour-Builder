import { useState } from "react";
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
  padding: theme.spacing(2, 2, 2, 4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflow: "hidden",
  "& .presentation-wrapper": {
    overflow: "auto",
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

const sortOptions = [
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
];

const sortOptionsMap = sortOptions.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

function AssetsModalBrowser({ allowMultiple, selected, setSelected }) {
  const { isOpen: isListView, toggle: toggleListView } = useToggle(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  return (
    <BrowsingContent className="browsing-form">
      <FilterRow>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search media assets..."
        />
        <Select
          value={selectedType}
          displayEmpty
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <MenuItem value="">All File Types</MenuItem>
          <MenuItem value="image">Images</MenuItem>
          <MenuItem value="video">Videos</MenuItem>
          <MenuItem value="3d">3D Models</MenuItem>
          <MenuItem value="text">Documents</MenuItem>
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </BrowsingContent>
  );
}

export default AssetsModalBrowser;
