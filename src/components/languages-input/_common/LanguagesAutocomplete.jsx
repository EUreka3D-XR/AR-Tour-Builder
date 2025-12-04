import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Autocomplete, Chip, TextField } from "@mui/material";

/**
 *
 * @param {Object} props
 * @param {string | Array<string>} props.value - Selected language options
 * @param {string | Array<string>} props.disabledValue - Language options to disable
 * @param {Array<import("@/types/jsdoc-types").Locale>} props.options - Available language options
 * @param {boolean} props.multiple - Allow multiple selections
 * @param {boolean} props.isLoading - Loading state
 * @param {function} props.onChange - Change handler
 * @returns {JSX.Element}
 */
function LanguagesAutocomplete({
  disabledValue,
  value,
  options = [],
  isLoading,
  multiple,
  error,
  helperText,
  onChange,
}) {
  const { t } = useTranslation();

  const isValueDisabled = (optionValue) => {
    if (!disabledValue) return false;
    if (Array.isArray(disabledValue)) {
      return disabledValue.includes(optionValue);
    }
    return disabledValue === optionValue;
  };

  const handleChange = (_, newValue) => {
    if (multiple && Array.isArray(newValue)) {
      // Filter out disabled values that were removed
      const newCodes = newValue.map((val) => val.value);

      // If user cleared all (newValue is empty), keep only disabled values
      if (newCodes.length === 0) {
        const disabledValues = Array.isArray(disabledValue)
          ? disabledValue
          : disabledValue
            ? [disabledValue]
            : [];
        onChange(disabledValues);
        return;
      }

      // Otherwise, ensure disabled values are always included
      const disabledValues = Array.isArray(disabledValue)
        ? disabledValue
        : disabledValue
          ? [disabledValue]
          : [];

      const mergedValues = [...new Set([...newCodes, ...disabledValues])];
      onChange(mergedValues);
      return;
    }
    onChange(newValue?.value || null);
  };

  const optionsDict = useMemo(() => {
    const dict = {};
    options.forEach((option) => {
      dict[option.value] = option;
    });
    return dict;
  }, [options]);

  const finalValue = useMemo(() => {
    if (Object.keys(optionsDict).length === 0) return multiple ? [] : null;
    if (multiple) {
      return value.map((val) => optionsDict[val]).filter(Boolean);
    }
    return optionsDict[value] || null;
  }, [value, optionsDict, multiple]);

  return (
    <Autocomplete
      value={finalValue}
      fullWidth
      multiple={multiple}
      loading={isLoading}
      disabled={isLoading}
      options={options}
      getOptionLabel={(option) => option.label}
      getOptionDisabled={(option) => {
        return isValueDisabled(option.value);
      }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          const disabled = isValueDisabled(option.value);

          return (
            <Chip
              key={key}
              label={option.label}
              {...tagProps}
              onDelete={disabled ? undefined : tagProps.onDelete}
            />
          );
        })
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            placeholder={t("language_autocomplete.placeholder.examples")}
          />
        );
      }}
      onChange={handleChange}
    />
  );
}

export default LanguagesAutocomplete;
