import { useAllLocales } from "@/services/localesService";
import LanguagesAutocomplete from "../_common/LanguagesAutocomplete";

function ProjectSupportedLanguagesInput({
  disabledValue,
  value,
  onChange,
  error,
  helperText,
}) {
  const { data, fetchState } = useAllLocales();

  return (
    <LanguagesAutocomplete
      disabledValue={disabledValue}
      value={value}
      options={data}
      multiple
      isLoading={fetchState.isLoading}
      error={error}
      helperText={helperText}
      onChange={onChange}
    />
  );
}

export default ProjectSupportedLanguagesInput;
