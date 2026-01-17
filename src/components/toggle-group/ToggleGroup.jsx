import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";

/**
 * @typedef {Object} ToggleOption
 * @property {string} [iconName] - Optional icon name
 * @property {string} [label] - Optional label text
 * @property {string|number} value - The value of the option
 * @property {string} [ariaLabel] - Optional aria label for accessibility
 */

/**
 *
 * @param {Object} props
 * @param {string|number} props.value - The currently selected value
 * @param {boolean} [props.multiple=false] - Whether multiple selections are allowed
 * @param {function(string|number): void} props.onChange - Callback function when selection changes
 * @param {ToggleOption[]} props.options - Array of toggle options
 * @returns
 */
function ToggleGroup({ value, onChange, multiple = false, options = [] }) {
  const handleChange = (_, newValue) => {
    onChange(newValue);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive={!multiple}
      onChange={handleChange}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          aria-label={option.ariaLabel || option.label || option.value}
        >
          {option.iconName && <EurekaIcon name={option.iconName} />}
          {option.label && <span>{option.label}</span>}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleGroup;
