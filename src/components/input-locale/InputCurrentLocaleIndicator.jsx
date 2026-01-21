import clsx from "clsx";
import { styled } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
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
function InputCurrentLocaleIndicator({ className, size, alignment = "end" }) {
  const { locale } = useFormLocale();

  return (
    <ContainerStyled className={clsx(alignment, className)}>
      <FlagIcon
        key={locale}
        variant="circle"
        size={size}
        locale={locale}
        // code={locale}
        className="language-icon"
      />
    </ContainerStyled>
  );
}

export default InputCurrentLocaleIndicator;
