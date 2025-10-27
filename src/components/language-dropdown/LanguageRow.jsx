import { Stack } from "@mui/material";

function LanguageRow({ children }) {
  return (
    <Stack direction="row" justifyContent="flex-end">
      {children}
    </Stack>
  );
}

export default LanguageRow;
