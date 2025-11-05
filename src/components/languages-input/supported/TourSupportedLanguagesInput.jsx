import useProjectLanguages from "@/stores/useProjectLanguages";
import LanguagesAutocomplete from "../_common/LanguagesAutocomplete";

function TourSupportedLanguagesInput({ value, onChange }) {
  const { available } = useProjectLanguages();
  return (
    <LanguagesAutocomplete
      value={value}
      options={available}
      multiple
      onChange={onChange}
    />
  );
}

export default TourSupportedLanguagesInput;
