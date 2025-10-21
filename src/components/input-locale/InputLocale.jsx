import { useMemo } from "react";
import clsx from "clsx";
import { styled } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
import { inputLocaleName } from "@/utils/inputLocale";
import InputLocaleIndicators from "./InputLocaleIndicators";

const ContainerStyled = styled("div")({
  "& .input-wrapper": {
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
  },
  "& .indicator": {
    minHeight: "0.75rem",
    marginTop: "0.25rem",
    alignSelf: "flex-end",
  },
});

function InputLocale({ className, children, name, hasNoLocaleIndicators }) {
  const { locale } = useFormLocale();

  const hasLocaleIndicators = !hasNoLocaleIndicators;

  const inputName = useMemo(() => {
    return inputLocaleName(name, locale);
  }, [name, locale]);

  return (
    <ContainerStyled className={clsx("input-localized-wrapper", className)}>
      <div className="input-wrapper">
        {typeof children === "function"
          ? children({ name: inputName, locale })
          : children}
        {hasLocaleIndicators && (
          <InputLocaleIndicators name={name} className="indicator" />
        )}
      </div>
    </ContainerStyled>
  );
}

export default InputLocale;
