import { useFormContext } from "react-hook-form";
import { Stack } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";

function SettingsSaveRow() {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={1}
      mt={6}
    >
      <Button
        type="submit"
        variant="filled"
        isDisabled={!isDirty}
        isLoading={isSubmitting}
        startIcon={<EurekaIcon name="save" />}
      >
        Save Changes
      </Button>
    </Stack>
  );
}

export default SettingsSaveRow;
