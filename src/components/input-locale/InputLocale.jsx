import clsx from "clsx";
import { styled } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
import useAvailableLocales from "@/hooks/useAvailableLocales";
import { inputLocaleName } from "@/utils/inputLocale";
import InputLocaleIndicators from "./InputLocaleIndicators";

const ContainerStyled = styled("div")({
  "& .input-wrapper": {
    display: "none",
    "&.show": {
      display: "flex",
      alignItems: "stretch",
      flexDirection: "column",
    },
  },
  "& .indicator": {
    minHeight: "1rem",
    marginTop: "0.25rem",
    alignSelf: "flex-end",
  },
});

function InputLocale({ className, children, name, hasNoLocaleIndicators }) {
  const { locale } = useFormLocale();
  const { available } = useAvailableLocales();

  const hasLocaleIndicators = !hasNoLocaleIndicators;

  console.log(locale, available);
  return (
    <ContainerStyled className={clsx("input-localized-wrapper", className)}>
      {available.map((loc) => (
        <div
          key={loc.value}
          className={clsx("input-wrapper", { show: loc.value === locale })}
        >
          {typeof children === "function"
            ? children({ name: inputLocaleName(name, loc.value), locale })
            : children}
          {hasLocaleIndicators && (
            <InputLocaleIndicators name={name} className="indicator" />
          )}
        </div>
      ))}
    </ContainerStyled>
  );
}

export default InputLocale;
