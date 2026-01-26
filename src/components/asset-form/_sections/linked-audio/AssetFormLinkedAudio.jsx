import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { Divider, Stack, styled, TextField, Typography } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import { localeValue } from "@/utils/inputLocale";

const GoogleDriveHelper = styled(Typography)(({ theme }) => ({
  color: theme.palette.warning.main,
  display: "block",
  bgcolor: theme.palette.warning.light,
  borderRadius: 1,
  "& strong": {
    wordBreak: "break-all",
    cursor: "pointer",
    textDecoration: "none",
    transition: "text-decoration 0.2s",
    "&:hover": { textDecoration: "underline" },
  },
}));

function AssetFormLinkedAudio() {
  const { t } = useTranslation();
  const { setValue } = useFormContext();

  const { locale } = useFormLocale();

  const urlValue = useWatch({ name: "linkedAsset.contentUrl" });
  const urlValueLocalized = localeValue(urlValue, locale);

  const [isAudioReady, setIsAudioReady] = useState(false);

  useEffect(() => {
    setIsAudioReady(false);
  }, [urlValueLocalized]);

  // Check if it's the wrong Google Drive format
  const isGoogleDriveViewFormat = urlValueLocalized?.match(
    /https:\/\/drive\.google\.com\/file\/d\/([^\\/]+)\/view/,
  );

  // Extract FILE_ID and generate correct format
  const correctGoogleDriveUrl = isGoogleDriveViewFormat
    ? `https://drive.google.com/uc?export=download&id=${isGoogleDriveViewFormat[1]}`
    : null;

  const handleCanPlay = () => {
    setIsAudioReady(true);
  };

  const handleError = (e) => {
    console.error("Audio error:", e.target.error);
    setIsAudioReady(false); // Show player anyway
  };

  const handleCorrectUrlClick = () => {
    if (correctGoogleDriveUrl) {
      setValue(
        `linkedAsset.contentUrl.locales.${locale}`,
        correctGoogleDriveUrl,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  };

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

      <Stack spacing={2}>
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
            <div>
              <LabeledInput
                label={t("asset.form.field.audio_url")}
                isMultilingual
              >
                <TextField
                  {...field}
                  type="url"
                  placeholder={t("asset.form.placeholder.audio_url_example")}
                  helperText={
                    isGoogleDriveViewFormat && (
                      <GoogleDriveHelper variant="caption">
                        {t("asset.form.google_drive_warning")}
                        <br />
                        <strong onClick={handleCorrectUrlClick}>
                          {correctGoogleDriveUrl}
                        </strong>
                      </GoogleDriveHelper>
                    )
                  }
                  fullWidth
                />
              </LabeledInput>
            </div>
          )}
        />

        {urlValueLocalized && (
          <>
            {isAudioReady && (
              <audio
                controls
                controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
              >
                <source src={urlValueLocalized} />
              </audio>
            )}

            <audio
              style={{ display: "none" }}
              onCanPlay={handleCanPlay}
              onError={handleError}
            >
              <source src={urlValueLocalized} />
            </audio>
          </>
        )}
      </Stack>
    </>
  );
}

export default AssetFormLinkedAudio;
