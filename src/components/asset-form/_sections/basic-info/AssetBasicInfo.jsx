import { useTranslation } from "react-i18next";
import { Checkbox, TextField, Typography } from "@mui/material";

import FormInput from "@/components/form/FormInput";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import { FormControlLabelStyled } from "../../_common/CommonFormComponents";

function AssetBasicInfo({ isPoiAsset = false }) {
  const { t } = useTranslation();

  return (
    <>
      <FormInputMultilingual
        name="title"
        render={({ field }) => (
          <LabeledInput label={t("asset.form.field.title")} isMultilingual>
            <TextField
              {...field}
              placeholder={t("asset.form.placeholder.enter_media_title")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInputMultilingual
        name="description"
        render={({ field }) => (
          <LabeledInput
            label={t("asset.form.field.description")}
            isMultilingual
          >
            <TextField
              {...field}
              placeholder={t("asset.form.placeholder.enter_media_description")}
              fullWidth
              multiline
              minRows={4}
              maxRows={10}
            />
          </LabeledInput>
        )}
      />
      {isPoiAsset && (
        <FormInput
          name="priority"
          render={({ field }) => (
            <FormControlLabelStyled
              control={
                <Checkbox
                  checked={field.value === "high"}
                  onChange={(e) =>
                    field.onChange(e.target.checked ? "high" : "normal")
                  }
                />
              }
              label={
                <div className="checkbox-label">
                  <Typography variant="body2">
                    {t("asset.form.field.primary")}
                  </Typography>
                  <Typography variant="caption">
                    {t("asset.form.help.primary_description")}
                  </Typography>
                </div>
              }
            />
          )}
        />
      )}
    </>
  );
}

export default AssetBasicInfo;
