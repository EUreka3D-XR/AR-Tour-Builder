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
    title = "Are you sure?",
    message = "Please confirm your action.",
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = options;

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
