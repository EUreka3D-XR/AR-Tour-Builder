import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { debounce } from "@mui/material/utils";

import InputLocale from "../input-locale/InputLocale";

/**
 * @param {Object} props
 * @param {(params: {
 *   field: import("react-hook-form").ControllerRenderProps<import("react-hook-form").FieldValues, any>,
 *   fieldState: import("react-hook-form").ControllerFieldState,
 *   parentFieldState: import("react-hook-form").ControllerFieldState,
 *   formState: import("react-hook-form").UseFormStateReturn<import("react-hook-form").FieldValues>
 * }) => JSX.Element} props.render
 * @param {string} props.name
 * @param {string} props.locale
 * @returns {JSX.Element}
 */
function FormInputMultilingual({ name, render }) {
  const { control, getFieldState, formState, trigger } = useFormContext();
  const parentFieldState = getFieldState(name, formState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedTrigger = useCallback(
    debounce((fieldName) => trigger(fieldName), 300),
    [trigger],
  );

  return (
    <InputLocale name={name}>
      {({ name: localizedName }) => (
        <Controller
          name={localizedName}
          control={control}
          render={(props) =>
            render({
              ...props,
              parentFieldState,
              field: {
                ...props.field,
                onChange: (e) => {
                  props.field.onChange(e);
                  debouncedTrigger(name);
                },
              },
            })
          }
        />
      )}
    </InputLocale>
  );
}

export default FormInputMultilingual;
