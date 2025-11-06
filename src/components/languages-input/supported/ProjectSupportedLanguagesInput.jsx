import { useAllLocales } from "@/services/localesService";
import LanguagesAutocomplete from "../_common/LanguagesAutocomplete";

function ProjectSupportedLanguagesInput({
  value,
  onChange,
  error,
  helperText,
}) {
  const { data, fetchState } = useAllLocales();

  return (
    <LanguagesAutocomplete
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
