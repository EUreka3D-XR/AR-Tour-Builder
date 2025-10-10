import { MenuItem, Select, styled } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";
import LabeledInput from "../labeled-input/LabeledInput";

const LanguageOptions = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "French",
  },
];

const SelectStyled = styled(Select)(({ theme }) => ({
  "& .dropdown-item": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  "& .filter-icon": {
    color: theme.palette.text.secondary,
  },
}));

function LanguageDropdown({ className }) {
  return (
    <LabeledInput
      id="language-switcher-label"
      label="Input Language"
      labelPlacement="left"
      className={className}
    >
      <SelectStyled
        labelId="language-switcher-label"
        id="language-switcher"
        value="en"
        renderValue={(se) => (
          <div className="dropdown-item">
            <EurekaIcon
              name="language"
              fontSize="small"
              className="filter-icon"
            />
            {LanguageOptions.find((option) => option.value === se)?.label}
          </div>
        )}
        className="language-select"
        onChange={() => {}}
      >
        {LanguageOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectStyled>
    </LabeledInput>
  );
}

export default LanguageDropdown;
