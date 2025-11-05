import { useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";

/**
 *
 * @param {Object} props
 * @param {string} props.value - Selected language options
 * @param {Array<import("@/types/jsdoc-types").Locale>} props.options - Available language options
 * @param {boolean} props.multiple - Allow multiple selections
 * @param {boolean} props.isLoading - Loading state
 * @param {function} props.onChange - Change handler
 * @returns {JSX.Element}
 */
function LanguagesAutocomplete({
  value,
  options = [],
  isLoading,
  multiple,
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

  return (
    <Autocomplete
      value={finalValue}
      fullWidth
      multiple={multiple}
      loading={isLoading}
      disabled={isLoading}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} placeholder="e.g., English, French, Spanish" />
      )}
      onChange={handleChange}
    />
  );
}

export default LanguagesAutocomplete;
