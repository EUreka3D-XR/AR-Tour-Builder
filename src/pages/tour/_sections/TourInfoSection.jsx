import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { styled, TextField } from "@mui/material";

import Button from "@/components/button/Button";
import FormInput from "@/components/form/FormInput";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import LanguageRow from "@/components/language-dropdown/LanguageRow";
import NumberInput from "@/components/number-input/NumberInput";

const ContainerStyled = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& .inputs-area": {
    padding: theme.spacing(3),
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(5),
    "& .small-inputs": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: theme.spacing(2),
      "& .small-text-input": {
        "& input": {
          textAlign: "end",
        },
        "& .input-adornment": {
          color: theme.palette.text.secondary,
          "&.end-adornment": {
            paddingLeft: theme.spacing(1),
          },
        },
      },
    },
  },
  "& .bottom-actions": {
    flexShrink: 0,
    display: "flex",
    justifyContent: "flex-end",
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
  },
}));

function TourInfoSection() {
  const { t } = useTranslation();
  const { tourId } = useParams();
  const isNew = !tourId;

  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <ContainerStyled>
      <div className="inputs-area">
        <LanguageRow>
          <LanguageDropdown />
        </LanguageRow>
        <FormInputMultilingual
          name="title"
          render={({ field }) => (
            <LabeledInput label={t("tour.info.tourTitle")} isMultilingual>
              <TextField fullWidth {...field} />
            </LabeledInput>
          )}
        />
        <FormInputMultilingual
          name="description"
          render={({ field }) => (
            <LabeledInput label={t("tour.info.description")} isMultilingual>
              <TextField
                fullWidth
                multiline
                minRows={4}
                maxRows={8}
                {...field}
              />
            </LabeledInput>
          )}
        />

        <div className="small-inputs">
          <FormInput
            name="duration"
            render={({ field }) => (
              <LabeledInput label={t("tour.info.estimatedTime")}>
                <NumberInput
                  {...field}
                  fullWidth
                  min={0}
                  iconName="time"
                  endAdornmentText={t("tour.info.estimatedTimeUnit")}
                  className="small-text-input"
                />
              </LabeledInput>
            )}
          />
          <FormInput
            name="distance"
            render={({ field }) => (
              <LabeledInput label={t("tour.info.estimatedDistance")}>
                <NumberInput
                  {...field}
                  fullWidth
                  min={0}
                  iconName="route"
                  endAdornmentText={t("tour.info.estimatedDistanceUnit")}
                  className="small-text-input"
                />
              </LabeledInput>
            )}
          />
        </div>
      </div>
      {isNew && (
        <div className="bottom-actions">
          <Button variant="filled" type="submit" isLoading={isSubmitting}>
            {t("tour.info.createButton")}
          </Button>
        </div>
      )}
    </ContainerStyled>
  );
}

export default TourInfoSection;
