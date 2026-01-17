import ToggleGroup from "../toggle-group/ToggleGroup";

/**
 * @typedef {import('../toggle-group/ToggleGroup').ToggleOption} ToggleOption
 */
/**
 * @typedef {ToggleOption & { actAsChecked: boolean }} SwitchToggleOption
 */
/** */
/**
 * @typedef {Object} SwitchToggleProps
 * @property {boolean} value
 * @property {(value: boolean) => void} onChange
 * @property {SwitchToggleOption[]} [options]
 */

const SWITCH_VALUES = {
  REJECT: "reject",
  ACCEPT: "accept",
};

const SWITCH_OPTIONS = [
  {
    iconName: "close",
    ariaLabel: "Reject",
    value: SWITCH_VALUES.REJECT,
    actAsChecked: false,
  },
  {
    iconName: "check",
    ariaLabel: "Accept",
    value: SWITCH_VALUES.ACCEPT,
    actAsChecked: true,
  },
];

/**
 *
 * @param {SwitchToggleProps} props
 * @returns {JSX.Element}
 */
function SwitchToggle({ value, onChange, options = SWITCH_OPTIONS }) {
  const acceptValue =
    options.find((opt) => opt.actAsChecked)?.value || SWITCH_VALUES.ACCEPT;
  const rejectValue =
    options.find((opt) => !opt.actAsChecked)?.value || SWITCH_VALUES.REJECT;

  const toggleValue = value ? acceptValue : rejectValue;

  const handleChange = (newValue) => {
    if (!newValue) {
      onChange(false);
      return;
    }

    const booleanValue = newValue === acceptValue;
    onChange(booleanValue);
  };

  return (
    <ToggleGroup
      value={toggleValue}
      onChange={handleChange}
      options={options}
    />
  );
}

export default SwitchToggle;
