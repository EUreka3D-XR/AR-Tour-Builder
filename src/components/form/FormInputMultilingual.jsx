import { Controller, useFormContext } from "react-hook-form";

import InputLocale from "../input-locale/InputLocale";

/**
 * @param {Object} props
 * @param {(params: {
 *   field: import("react-hook-form").ControllerRenderProps<import("react-hook-form").FieldValues, any>,
 *   fieldState: import("react-hook-form").ControllerFieldState,
 *   formState: import("react-hook-form").UseFormStateReturn<import("react-hook-form").FieldValues>
 * }) => JSX.Element} props.render
 * @param {string} props.name
 * @param {string} props.locale
 * @returns {JSX.Element}
 */
function FormInputMultilingual({ name, render }) {
  const { control } = useFormContext();
  return (
    <InputLocale name={name}>
      {({ name: localizedName }) => (
        <Controller name={localizedName} control={control} render={render} />
      )}
    </InputLocale>
  );
}

export default FormInputMultilingual;
