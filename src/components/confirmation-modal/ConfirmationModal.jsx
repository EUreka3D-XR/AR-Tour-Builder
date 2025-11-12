import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useConfirmationState } from "@/stores/useConfirmStore";
import Button from "../button/Button";

export const ConfirmationModal = () => {
  const { isOpen, isLoading, options, onConfirm, onCancel } =
    useConfirmationState();

  if (!options) return null;

  const {
    title: optionsTitle,
    message: optionsMessage,
    confirmText: optionsConfirmText,
    cancelText: optionsCancelText,
  } = options;

  const title = optionsTitle || "Confirm Action";
  const message = optionsMessage || "Are you sure you want to proceed?";
  const confirmText = optionsConfirmText || "Confirm";
  const cancelText = optionsCancelText || "Cancel";

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
