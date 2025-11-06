import ProjectSupportedLanguagesInput from "./ProjectSupportedLanguagesInput";
import TourSupportedLanguagesInput from "./TourSupportedLanguagesInput";

/**
 *
 * @param {Object} props
 * @param {Array<import("@/types/jsdoc-types").Locale>} props.value
 * @param {function} props.onChange
 * @param {"project" | "tour"} props.scope
 * @returns
 */
function SupportedLanguagesInput({
  value,
  onChange,
  error,
  helperText,
  scope,
}) {
  if (scope === "tour") {
    return <TourSupportedLanguagesInput value={value} onChange={onChange} />;
  }
  return (
    <ProjectSupportedLanguagesInput
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
    />
  );
}

export default SupportedLanguagesInput;
