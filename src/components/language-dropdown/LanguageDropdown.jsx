import { MenuItem, Select, styled } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
import useAvailableLocales from "@/hooks/useAvailableLocales";
import LanguageIcon from "../icon/LanguageIcon";
import LabeledInput from "../labeled-input/LabeledInput";

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

function LanguageDropdown({ className, label, hideLabels }) {
  const { available } = useAvailableLocales();

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
  label = "Input Language",
  hideLabels,
  options = [],
}) {
  const initialLocale = options[0]?.value || "en";

  const { locale, setCurrentLocale } = useFormLocale(initialLocale);

  return (
    <LabeledInput
      id="language-switcher-label"
      label={label}
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
            <LanguageIcon code={currentValue} />
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
