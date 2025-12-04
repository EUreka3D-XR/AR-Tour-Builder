import { useMemo } from "react";
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
  const handleChange = (_, newValue) => {
    if (multiple && Array.isArray(newValue)) {
      const localesCodes = newValue.map((val) => val.value);
      onChange(localesCodes);
      return;
    }
    onChange(newValue.value);
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
      return value.map((val) => optionsDict[val]);
    }
    return optionsDict[value];
  }, [value, optionsDict, multiple]);

  const isValueDisabled = (optionValue) => {
    if (!disabledValue) return false;
    if (Array.isArray(disabledValue)) {
      return disabledValue.includes(optionValue);
    }
    return disabledValue === optionValue;
  };

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
            placeholder="e.g., English, French, Spanish"
          />
        );
      }}
      onChange={handleChange}
    />
  );
}

export default LanguagesAutocomplete;
