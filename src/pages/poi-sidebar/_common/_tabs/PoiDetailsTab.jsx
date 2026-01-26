import { useTranslation } from "react-i18next";
import { styled, TextField } from "@mui/material";

import FormInput from "@/components/form/FormInput";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import ImageInput from "@/components/image-input/ImageInput";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import NumberInput from "@/components/number-input/NumberInput";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  "& .language-selector": {
    alignSelf: "flex-end",
  },
}));
function PoiDetailsTab() {
  const { t } = useTranslation();

  return (
    <ContainerStyled>
      <LanguageDropdown className="language-selector" />
      <FormInputMultilingual
        name="title"
        render={({ field, parentFieldState }) => {
          return (
            <LabeledInput
              label={t("poiSidebar.detailsTab.title")}
              isMultilingual
            >
              <TextField
                {...field}
                placeholder={t("poiSidebar.detailsTab.titlePlaceholder")}
                error={!!parentFieldState.error}
                helperText={parentFieldState.error?.message}
                fullWidth
              />
            </LabeledInput>
          );
        }}
      />
      <FormInputMultilingual
        name="description"
        render={({ field, parentFieldState }) => (
          <LabeledInput
            label={t("poiSidebar.detailsTab.description")}
            isMultilingual
          >
            <TextField
              {...field}
              placeholder={t("poiSidebar.detailsTab.descriptionPlaceholder")}
              error={!!parentFieldState.error}
              helperText={parentFieldState.error?.message}
              fullWidth
              multiline
              minRows={4}
              maxRows={10}
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="radius"
        render={({ field, fieldState }) => (
          <LabeledInput label={t("poiSidebar.detailsTab.poiRadius")}>
            <NumberInput
              {...field}
              min={5}
              max={100}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              placeholder={t("poiSidebar.detailsTab.radiusPlaceholder")}
              iconName="radius"
              endAdornmentText="m"
              sx={{ width: "200px" }}
            />
          </LabeledInput>
        )}
      />
      {/* <FormInput
        name="thumbnail"
        render={({ field }) => ( */}
      <LabeledInput label={t("poiSidebar.detailsTab.coverPhoto")}>
        <ImageInput
          placeholderText={t("poiSidebar.detailsTab.coverPhotoPlaceholder")}
          maxFileSize={5}
        />
      </LabeledInput>
      {/* )}
      /> */}
    </ContainerStyled>
  );
}

export default PoiDetailsTab;
