import { useAllLocales } from "@/services/localesService";
import LanguagesAutocomplete from "../_common/LanguagesAutocomplete";

function ProjectSupportedLanguagesInput({ value, onChange }) {
  const { data, fetchState } = useAllLocales();

  return (
    <LanguagesAutocomplete
      value={value}
      options={data}
      multiple
      isLoading={fetchState.isLoading}
      onChange={onChange}
    />
  );
}

export default ProjectSupportedLanguagesInput;
