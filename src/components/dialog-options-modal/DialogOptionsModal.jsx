import { useTranslation } from "react-i18next";

import { useOptionsDialogState } from "@/stores/dialog-modal-stores";
import { DialogOptionsButtons } from "./DialogOptionsButtons";
import { DialogOptionsList } from "./DialogOptionsList";

export const DialogOptionsModal = () => {
  const { t } = useTranslation();
  const { isOpen, options, onSelect, onCancel } = useOptionsDialogState();

  if (!options) return null;

  const {
    title: optionsTitle,
    message: optionsMessage,
    variant = "buttons",
    options: dialogOptions = [],
    cancelText: optionsCancelText,
    confirmText: optionsConfirmText,
  } = options;

  const title = optionsTitle || t("modal.options.default_title");
  const message = optionsMessage || t("modal.options.default_message");
  const cancelText = optionsCancelText || t("common.action.cancel");
  const confirmText = optionsConfirmText || t("modal.options.confirm_button");

  if (variant === "list") {
    return (
      <DialogOptionsList
        isOpen={isOpen}
        options={dialogOptions}
        title={title}
        message={message}
        cancelText={cancelText}
        confirmText={confirmText}
        onSelect={onSelect}
        onCancel={onCancel}
      />
    );
  }

  return (
    <DialogOptionsButtons
      isOpen={isOpen}
      options={dialogOptions}
      title={title}
      message={message}
      cancelText={cancelText}
      onSelect={onSelect}
      onCancel={onCancel}
    />
  );
};
