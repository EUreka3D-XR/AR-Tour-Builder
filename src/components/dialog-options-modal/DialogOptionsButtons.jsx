import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Button from "../button/Button";

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {import("@/stores/dialog-modal-stores").DialogOption[]} props.options
 * @param {string} props.title
 * @param {string} props.message
 * @param {string} props.cancelText
 * @param {(value: string) => void} props.onSelect
 * @param {() => void} props.onCancel
 */
export const DialogOptionsButtons = ({
  isOpen,
  options,
  title,
  message,
  cancelText,
  onSelect,
  onCancel,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="options-buttons-dialog-title"
      aria-describedby="options-buttons-dialog-description"
    >
      <DialogTitle id="options-buttons-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="options-buttons-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Box sx={{ display: "flex", gap: 1 }}>
          {options.map((option) => (
            <Button
              key={option.value}
              variant="filled"
              onClick={() => onSelect(option.value)}
              sx={option.color ? { backgroundColor: option.color } : undefined}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </DialogActions>
    </Dialog>
  );
};
