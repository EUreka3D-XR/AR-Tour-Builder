import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useDeleteProjectModalState } from "@/stores/delete-project-modal-store";
import Button from "../button/Button";

export const DeleteProjectModal = () => {
  const { t } = useTranslation();
  const { isOpen, projectName, onConfirm, onCancel } = useDeleteProjectModalState();
  const [inputValue, setInputValue] = useState("");

  const CONFIRM_PHRASE = t("projectSettings.general.dangerZone.modal.confirmPhrase");

  useEffect(() => {
    if (!isOpen) setInputValue("");
  }, [isOpen]);

  const isMatch = inputValue.toLowerCase() === CONFIRM_PHRASE.toLowerCase();

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="delete-project-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="delete-project-dialog-title" sx={{ color: "error.main" }}>
        {projectName
          ? `${t("projectSettings.general.dangerZone.modal.title")} "${projectName}"?`
          : t("projectSettings.general.dangerZone.modal.title")}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DialogContentText>
          {t("projectSettings.general.dangerZone.modal.message")}
        </DialogContentText>
        <Typography variant="body2" color="text.secondary">
          {"Type "}<strong>{CONFIRM_PHRASE}</strong>{" to confirm:"}
        </Typography>
        <TextField
          autoFocus
          fullWidth
          size="small"
          placeholder={CONFIRM_PHRASE.toLowerCase()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          {t("projectSettings.general.dangerZone.modal.cancelButton")}
        </Button>
        <Button
          variant="filled"
          color="error"
          isDisabled={!isMatch}
          onClick={onConfirm}
        >
          {t("projectSettings.general.dangerZone.modal.confirmButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
