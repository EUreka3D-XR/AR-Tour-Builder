import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import Button from "../button/Button";

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {import("@/stores/dialog-modal-stores").DialogOption[]} props.options
 * @param {string} props.title
 * @param {string} [props.message]
 * @param {string} props.cancelText
 * @param {string} props.confirmText
 * @param {(value: string) => void} props.onSelect
 * @param {() => void} props.onCancel
 */
export const DialogOptionsList = ({
  isOpen,
  options,
  title,
  message,
  cancelText,
  confirmText,
  onSelect,
  onCancel,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  console.log();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedValue) {
      onSelect(selectedValue);
      setSelectedValue("");
    }
  };

  const handleCancel = () => {
    setSelectedValue("");
    onCancel();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="options-list-dialog-title"
      aria-describedby="options-list-dialog-description"
    >
      <DialogTitle id="options-list-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {message && (
          <DialogContentText
            id="options-list-dialog-description"
            sx={{ mb: 2 }}
          >
            {message}
          </DialogContentText>
        )}
        <RadioGroup value={selectedValue} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio size="small" />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{cancelText}</Button>
        <Button
          variant="filled"
          isDisabled={!selectedValue}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
