import clsx from "clsx";
import { styled } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
import { useAvailableLocalesProvider } from "@/providers/locales/AvailableLocalesContext";
import { inputLocaleName } from "@/utils/inputLocale";
import InputCurrentLocaleIndicator from "./InputCurrentLocaleIndicator";

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
    alignSelf: "flex-end",
  },
});

function InputLocale({ className, children, name, hideLocaleIndicators }) {
  const { locale } = useFormLocale();
  const { available } = useAvailableLocalesProvider();

  const hasLocaleIndicators = !hideLocaleIndicators;

  // const localizedValue = useWatch({ name });

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
            <InputCurrentLocaleIndicator className="indicator" />
          )}
        </div>
      ))}
    </ContainerStyled>
  );
}

export default InputLocale;
