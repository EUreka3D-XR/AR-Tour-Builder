import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled, TextField } from "@mui/material";

import { useDebouncedEffect } from "@/hooks/useDebounce";
import EurekaIcon from "../icon/EurekaIcon";

const SearchInputUnstyled = ({
  onChange,
  placeholder,
  className,
  value = "",
  isDisabled,
}) => {
  const { t } = useTranslation();
  const isInitialized = useRef(false);

  const [finalValue, setFinalValue] = useState(value);

  useDebouncedEffect(
    () => {
      if (!isInitialized.current) {
        isInitialized.current = true;
        return;
      }
      if (typeof onChange === "function") {
        onChange(finalValue);
      }
    },
    [finalValue],
    300,
  );

  useEffect(() => {
    setFinalValue(value);
  }, [value]);

  const handleChange = (event) => {
    setFinalValue(event.target.value);
  };

  return (
    <TextField
      name="search-input"
      placeholder={placeholder || t("Components.Searchbar")}
      value={finalValue}
      onChange={handleChange}
      disabled={isDisabled}
      className={className}
      slotProps={{
        input: {
          startAdornment: (
            <EurekaIcon
              name="search"
              color="text.secondary"
              sx={{ marginRight: 1 }}
            />
          ),
        },
      }}
    />
  );
};

const SearchInput = styled(SearchInputUnstyled)({});
export default SearchInput;
