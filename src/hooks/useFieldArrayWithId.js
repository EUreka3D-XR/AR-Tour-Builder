import { useFieldArray } from "react-hook-form";

/**
 * @typedef {import("react-hook-form").UseFieldArrayProps} UseFieldArrayProps
 * @typedef {import("react-hook-form").FieldValues} FieldValues
 * @param {UseFieldArrayProps} props
 * @returns
 */
export function useFieldArrayWithId(props) {
  return useFieldArray({ ...props, keyName: "listGeneratedId" });
}
