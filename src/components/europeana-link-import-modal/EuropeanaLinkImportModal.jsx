// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { europeanaExtractUrlSchema } from "@/validation-schemas/europeanaExtractUrlSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

// import { useEuropeanaZipUrl } from "@/services/europeanaService";
// import { useDebouncedValue } from "@/hooks/useDebounce";
import Button from "../button/Button";
import FormInput from "../form/FormInput";

function LinkImportModal({ onClose, onExtract }) {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      europeanaUrl: "",
      eurekaHubItemUrl: "",
    },
    resolver: yupResolver(europeanaExtractUrlSchema),
  });

  const {
    handleSubmit,
    reset,
    // watch,
    // setValue,
    formState: { isValid },
  } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    onExtract(data.eurekaHubItemUrl);
    handleClose();
  };

  // const europeanaUrl = watch("europeanaUrl");
  // const debouncedEuropeanaUrl = useDebouncedValue(europeanaUrl, 300);

  // const res = useEuropeanaZipUrl(debouncedEuropeanaUrl);
  // const { zipUrl, isLoading } = useEurekaZipUrl(europeanaUrl);

  // useEffect(() => {
  //   setValue("eurekaHubItemUrl", zipUrl);
  // }, [zipUrl, setValue]);

  const isLoading = false;

  return (
    <Dialog
      open
      onClose={isLoading ? undefined : handleClose}
      aria-labelledby="europeana-import-dialog-title"
      aria-describedby="europeana-import-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="europeana-import-dialog-title">
        {t("europeana_import_url_modal.title")}
      </DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText
              id="europeana-import-dialog-description"
              sx={{ mb: 2 }}
            >
              {t("europeana_import_url_modal.description")}
            </DialogContentText>
            <FormInput
              name="europeanaUrl"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Europeana URL"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isLoading}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={isLoading ? undefined : handleClose}>
              {t("common.action.cancel")}
            </Button>
            <Button
              variant="filled"
              color="primary"
              type="submit"
              isLoading={isLoading}
              isDisabled={!isValid}
            >
              {t("europeana_import_url_modal.import_action")}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

function EuropeanaLinkImportModal({ isOpen, onClose, onExtract }) {
  if (!isOpen) {
    return null;
  }
  return <LinkImportModal onClose={onClose} onExtract={onExtract} />;
}

export default EuropeanaLinkImportModal;
