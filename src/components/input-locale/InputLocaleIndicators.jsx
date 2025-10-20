import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { styled } from "@mui/material";

import LanguageIcon from "../icon/LanguageIcon";

const ContainerStyled = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginTop: "1rem",
});

/**
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} props.name - Name of the input field to watch
 * @param {('small'|'normal'|'large')} [props.size='normal'] - Size of the language icons
 * @returns
 */
function InputLocaleIndicators({ className, name, size }) {
  const { control } = useFormContext();

  // subscribe to just the locales object for this input
  const localizedValue = useWatch({ control, name });

  const existingLocales = useMemo(() => {
    const locales = localizedValue?.locales || {};

    return Object.entries(locales)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      )
      .map(([key]) => key)
      .sort();
  }, [localizedValue]);

  return (
    <ContainerStyled className={className}>
      {existingLocales.map((locale) => (
        <LanguageIcon
          key={locale}
          variant="round"
          size={size}
          code={locale}
          className="language-icon"
        />
      ))}
    </ContainerStyled>
  );
}

export default InputLocaleIndicators;
