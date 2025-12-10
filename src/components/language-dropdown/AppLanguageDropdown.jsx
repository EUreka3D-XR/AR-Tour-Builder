import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { MenuItem, Select, styled } from "@mui/material";

import { useLocale } from "@/hooks/useLocale";
import FlagIcon from "../flags/FlagIcon";

const SelectStyled = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select[role="combobox"]': {
    display: "flex",
    alignItems: "center",
  },
  "& .dropdown-item": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  "& .dropdown-item": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

/**
 * AppLanguageDropdown component for switching the application's locale
 * Uses i18next to change the current language
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS class
 * @param {boolean} [props.hideLabels] - Whether to hide language labels in the dropdown
 * @returns {React.ReactElement} Rendered app language dropdown
 */
function AppLanguageDropdown({ className, hideLabels }) {
  const { t, i18n } = useTranslation();

  const currentLanguage = useLocale();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const languageOptions = useMemo(
    () => [
      { value: "en", label: t("app_language_dropdown.en") },
      { value: "fr", label: t("app_language_dropdown.fr") },
    ],
    [t],
  );

  return (
    <SelectStyled
      labelId="app-language-switcher-label"
      id="app-language-switcher"
      value={currentLanguage}
      className={clsx("language-select", className)}
      renderValue={(currentValue) => (
        <div className="dropdown-item">
          <FlagIcon locale={currentValue} />
          {!hideLabels &&
            languageOptions.find((option) => option.value === currentValue)
              ?.label}
        </div>
      )}
      onChange={handleLanguageChange}
    >
      {languageOptions.map((option) => (
        <MenuItemStyled key={option.value} value={option.value}>
          <div className="dropdown-item">
            <FlagIcon locale={option.value} />
            {option.label}
          </div>
        </MenuItemStyled>
      ))}
    </SelectStyled>
  );
}

export default AppLanguageDropdown;
