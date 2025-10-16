import { Chip, FormControl, MenuItem, Select, styled } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SearchInput from "@/components/search-input/SearchInput";
import useDashboardParams from "../../../hooks/useDashboardParams";

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
  { value: "all", label: "All Types" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "3d", label: "3D Model" },
  { value: "text", label: "Document" },
];

function LibraryFiltersSection() {
  const { filterParams, updateParams } = useDashboardParams();

  const handleParamsChange = (key) => (event) => {
    if (event.target?.value) {
      updateParams({ [key]: event.target.value });
      return;
    }
    updateParams({ [key]: event });
  };

  const handleDelete = (key) => () => {
    updateParams({ [key]: null });
  };

  return (
    <ContainerStyled className="filters-section">
      <div className="filter-row">
        <SearchInput
          label="Search assets"
          value={filterParams.searchTerm || ""}
          onChange={handleParamsChange("searchTerm")}
        />
        <FormControl size="small" className="type-input item-no-shrink">
          <Select
            id="type-filter"
            value={filterParams.type || "all"}
            onChange={handleParamsChange("type")}
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
        {filterParams.type && (
          <Chip
            key={filterParams.type}
            label={
              typeOptions.find((option) => option.value === filterParams.type)
                ?.label
            }
            onDelete={handleDelete("type")}
          />
        )}
        {filterParams.searchTerm && (
          <Chip
            key={filterParams.searchTerm}
            label={filterParams.searchTerm}
            onDelete={handleDelete("searchTerm")}
          />
        )}
      </div>
    </ContainerStyled>
  );
}

export default LibraryFiltersSection;
