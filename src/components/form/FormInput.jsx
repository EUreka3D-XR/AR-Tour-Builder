import { Controller, useFormContext } from "react-hook-form";

/**
 * @param {Object} props
 * @param {(params: {
 *   field: import("react-hook-form").ControllerRenderProps<import("react-hook-form").FieldValues, any>,
 *   fieldState: import("react-hook-form").ControllerFieldState,
 *   formState: import("react-hook-form").UseFormStateReturn<import("react-hook-form").FieldValues>
 * }) => JSX.Element} props.render
 * @param {string} props.name
 * @returns {JSX.Element}
 */
function FormInput({ name, render }) {
  const { control } = useFormContext();
  return <Controller name={name} control={control} render={render} />;
}

export default FormInput;
