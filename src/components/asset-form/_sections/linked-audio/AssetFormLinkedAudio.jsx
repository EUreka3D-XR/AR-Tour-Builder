import { useTranslation } from "react-i18next";
import { Divider, TextField, Typography } from "@mui/material";

import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";

function AssetFormLinkedAudio() {
  const { t } = useTranslation();
  return (
    <>
      <Divider />
      <div>
        <Typography variant="h5">
          {t("asset.form.section.linked_audio")}
        </Typography>
        <Typography variant="caption">
          {t("asset.form.help.linked_audio_description")}
        </Typography>
      </div>

      <FormInputMultilingual
        name="linkedAsset.title"
        render={({ field }) => (
          <LabeledInput
            label={t("asset.form.field.audio_title")}
            isMultilingual
          >
            <TextField
              {...field}
              placeholder={t("asset.form.placeholder.enter_audio_title")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInputMultilingual
        name="linkedAsset.contentUrl"
        render={({ field }) => (
          <LabeledInput label={t("asset.form.field.audio_url")} isMultilingual>
            <TextField
              {...field}
              placeholder={t("asset.form.placeholder.audio_url_example")}
              fullWidth
              type="url"
            />
          </LabeledInput>
        )}
      />
    </>
  );
}

export default AssetFormLinkedAudio;
