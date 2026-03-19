import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

import Button from "../button/Button";
import { useReadModel3DTransform } from "./utils";

export default function SaveActionButtons({ onSave, onCancel }) {
  const { t } = useTranslation();
  const { position, rotation, scale } = useReadModel3DTransform();

  const handleSave = () => {
    onSave?.({ position, rotation, scale });
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={handleCancel}>{t("model_viewer.actions.cancel")}</Button>
      <Button variant="filled" onClick={handleSave}>
        {t("model_viewer.actions.save")}
      </Button>
    </Stack>
  );
}
