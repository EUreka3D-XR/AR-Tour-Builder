import { useMemo } from "react";
import clsx from "clsx";
import { styled } from "@mui/material";

import FlagIcon from "../flags/FlagIcon";

const ContainerStyled = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginTop: "0.25rem",
  "&.left, &.start, &.flex-start": {
    justifyContent: "flex-start",
  },
  "&.center": {
    justifyContent: "center",
  },
  "&.right, &.end, &.flex-end": {
    justifyContent: "flex-end",
  },
});

/**
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {import("@/types/jsdoc-types").LocalesField} props.value - Name of the input field to watch
 * @param {('flex-start'|'center'|'flex-end'|'start'|'end'|'left'|'right')} [props.alignment='flex-start'] - Alignment of the icons container
 * @param {('small'|'normal'|'large')} [props.size='normal'] - Size of the language icons
 * @returns
 */
function InputLocaleIndicators({ className, value, size, alignment = "end" }) {
  // subscribe to just the locales object for this input

  const existingLocales = useMemo(() => {
    const locales = value?.locales || {};

    return Object.entries(locales)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      )
      .map(([key]) => key)
      .sort();
  }, [value]);

  return (
    <ContainerStyled className={clsx(alignment, className)}>
      {existingLocales.map((locale) => (
        <FlagIcon
          key={locale}
          variant="circle"
          size={size}
          locale={locale}
          // code={locale}
          className="language-icon"
        />
      ))}
    </ContainerStyled>
  );
}

export default InputLocaleIndicators;
