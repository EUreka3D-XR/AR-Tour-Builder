import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useConfirmationState } from "@/stores/confirmation-modal-stores";
import Button from "../button/Button";

export const ConfirmationModal = () => {
  const { t } = useTranslation();
  const { isOpen, isLoading, options, onConfirm, onCancel } =
    useConfirmationState();

  if (!options) return null;

  const {
    title: optionsTitle,
    message: optionsMessage,
    confirmText: optionsConfirmText,
    cancelText: optionsCancelText,
  } = options;

  const title = optionsTitle || t("modal.confirmation.default_title");
  const message = optionsMessage || t("modal.confirmation.default_message");
  const confirmText = optionsConfirmText || t("modal.confirmation.confirm_button");
  const cancelText = optionsCancelText || t("modal.confirmation.cancel_button");

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={isLoading ? undefined : onCancel}>{cancelText}</Button>
        <Button
          variant="filled"
          color="error"
          autoFocus
          isLoading={isLoading}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
