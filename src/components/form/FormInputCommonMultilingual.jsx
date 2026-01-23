import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { debounce } from "@mui/material/utils";

import InputLocale from "../input-locale/InputLocale";

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {(params: {
 *   field: import("react-hook-form").ControllerRenderProps<import("react-hook-form").FieldValues, any>,
 *   fieldState: import("react-hook-form").ControllerFieldState,
 *   parentFieldState: import("react-hook-form").ControllerFieldState,
 *   formState: import("react-hook-form").UseFormStateReturn<import("react-hook-form").FieldValues>
 * }) => JSX.Element} props.render
 * @returns {JSX.Element}
 */
function FormInputCommonMultilingual({ name, render }) {
  const { control, setValue, getValues, getFieldState, formState, trigger } =
    useFormContext();
  const parentFieldState = getFieldState(name, formState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedTrigger = useCallback(
    debounce((fieldName) => trigger(fieldName), 300),
    [trigger],
  );

  const updateAllLocalesWithSingleValue = (input) => {
    const value = input?.target ? input.target.value : input;
    const allLocalesValues = getValues(name)?.locales ?? {};
    const updatedValues = {
      locales: Object.keys(allLocalesValues).reduce((acc, locale) => {
        acc[locale] = value;
        return acc;
      }, {}),
    };

    setValue(name, updatedValues, {
      shouldDirty: true,
      shouldTouch: true,
    });
    debouncedTrigger(name);
  };

  return (
    <InputLocale name={name} hideLocaleIndicators>
      {({ name: localizedName }) => (
        <Controller
          name={localizedName}
          control={control}
          render={({ field, ...rest }) =>
            render({
              ...rest,
              parentFieldState,
              field: { ...field, onChange: updateAllLocalesWithSingleValue },
            })
          }
        />
      )}
    </InputLocale>
  );
}

export default FormInputCommonMultilingual;
