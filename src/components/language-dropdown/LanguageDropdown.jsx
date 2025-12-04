import { MenuItem, Select, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import useFormLocale from "@/stores/useFormLocale";
import { useAvailableLocalesProvider } from "@/providers/locales/AvailableLocalesContext";
import FlagIcon from "../flags/FlagIcon";
import LabeledInput from "../labeled-input/LabeledInput";

const SelectStyled = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select[role="combobox"]': {
    display: "flex",
    alignItems: "center",
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

function LanguageDropdown({ className, label, hideLabels }) {
  const { available } = useAvailableLocalesProvider();

  return (
    <LanguageDropdownComponent
      className={className}
      label={label}
      hideLabels={hideLabels}
      options={available}
    />
  );
}

// function LanguageTourDropdown({ className }) {
//   const { available } = useTourLanguages();

//   return (
//     <LanguageDropdownComponent className={className} options={available} />
//   );
// }

// function LanguageProjectDropdown({ className }) {
//   const { available } = useProjectLanguages();

//   return (
//     <LanguageDropdownComponent className={className} options={available} />
//   );
// }

function LanguageDropdownComponent({
  className,
  label,
  hideLabels,
  options = [],
}) {
  const { t } = useTranslation();
  const initialLocale = options[0]?.value || "en";

  const { locale, setCurrentLocale } = useFormLocale(initialLocale);
  const defaultLabel = label || t("language_dropdown.label.input_language");

  return (
    <LabeledInput
      id="language-switcher-label"
      label={defaultLabel}
      labelPlacement="left"
      labelIcon="language"
      className={className}
    >
      <SelectStyled
        labelId="language-switcher-label"
        id="language-switcher"
        value={locale}
        className="language-select"
        renderValue={(currentValue) => (
          <div className="dropdown-item">
            <FlagIcon locale={currentValue} />
            {!hideLabels &&
              options.find((option) => option.value === currentValue)?.label}
          </div>
        )}
        onChange={(e) => setCurrentLocale(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectStyled>
    </LabeledInput>
  );
}

export default LanguageDropdown;
