import { useMemo } from "react";
import { useParams } from "react-router";
import { MenuItem, Select, styled } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
import useProjectLanguages from "@/stores/useProjectLanguages";
import useTourLanguages from "@/stores/useTourLanguages";
import { LanguageAllOptions } from "@/utils/languages";
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

function LanguageDropdown({ className }) {
  const { projectId, tourId } = useParams();
  if (tourId) {
    return <LanguageTourDropdown className={className} />;
  }
  if (projectId) {
    return <LanguageProjectDropdown className={className} />;
  }
  return <LanguageDropdownComponent className={className} />;
}

function LanguageTourDropdown({ className }) {
  const { available } = useTourLanguages();

  return (
    <LanguageDropdownComponent className={className} options={available} />
  );
}
LanguageDropdownComponent;

function LanguageProjectDropdown({ className }) {
  const { available } = useProjectLanguages();

  return (
    <LanguageDropdownComponent className={className} options={available} />
  );
}

function LanguageDropdownComponent({
  className,
  options = LanguageAllOptions,
}) {
  const finalOptions = useMemo(() => {
    return options.length > 0 ? options : LanguageAllOptions;
  }, [options]);

  const initialLocale = finalOptions[0]?.value || "en";

  const { locale, setCurrentLocale } = useFormLocale(initialLocale);

  return (
    <LabeledInput
      id="language-switcher-label"
      label="Input Language"
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
            {
              finalOptions.find((option) => option.value === currentValue)
                ?.label
            }
          </div>
        )}
        onChange={(e) => setCurrentLocale(e.target.value)}
      >
        {finalOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectStyled>
    </LabeledInput>
  );
}

export default LanguageDropdown;
