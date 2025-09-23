import { useState } from "react";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SearchInput from "@/components/search-input/SearchInput";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  "& .filter-row": {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "space-between",
    "& .type-input": {
      minWidth: "120px",
    },
    "& .sort-input": {
      minWidth: "150px",
    },
    "& .item-no-shrink": {
      flexShrink: 0,
    },
  },
  "& .filter-pills": {
    marginTop: theme.spacing(2),
    display: "flex",
    gap: theme.spacing(1),
    overflowX: "auto",
    paddingBottom: theme.spacing(1),
  },
}));

const typeOptions = [
  { value: "all", label: "All" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "3d", label: "3D Model" },
  { value: "text", label: "Text" },
];

function LibraryFiltersSection() {
  const [typeFilter, setTypeFilter] = useState("all");

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleDelete = (value) => {
    if (value === "all") {
      setTypeFilter("all");
    }
  };

  return (
    <ContainerStyled className="filters-section">
      <div className="filter-row">
        <SearchInput label="Search assets" />
        <FormControl size="small" className="type-input item-no-shrink">
          <InputLabel id="type-filter-label">Type</InputLabel>
          <Select
            labelId="type-filter-label"
            id="type-filter"
            value={typeFilter}
            label="Type"
            onChange={handleTypeChange}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          startIcon={<EurekaIcon name="add" />}
          variant="filled"
          className="item-no-shrink"
        >
          Add New Asset
        </Button>
      </div>
      <div className="filter-pills">
        {typeOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            onDelete={() => handleDelete(option.value)}
          />
        ))}
      </div>
    </ContainerStyled>
  );
}

export default LibraryFiltersSection;
