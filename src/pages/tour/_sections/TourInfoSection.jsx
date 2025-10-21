import { styled, TextField } from "@mui/material";

import FormInput from "@/components/form/FormInput";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import EurekaIcon from "@/components/icon/EurekaIcon";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import LanguageRow from "@/components/language-dropdown/LanguageRow";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
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
}));

function TourInfoSection() {
  return (
    <ContainerStyled>
      <LanguageRow>
        <LanguageDropdown />
      </LanguageRow>
      <FormInputMultilingual
        name="title"
        locale="en"
        render={({ field }) => (
          <LabeledInput label="Tour Title">
            <TextField fullWidth {...field} />
          </LabeledInput>
        )}
      />
      <FormInputMultilingual
        name="description"
        locale="en"
        render={({ field }) => (
          <LabeledInput label="Description">
            <TextField fullWidth multiline minRows={4} maxRows={8} {...field} />
          </LabeledInput>
        )}
      />
      <div className="small-inputs">
        <FormInput
          name="duration"
          render={({ field }) => (
            <LabeledInput label="Estimated Time (minutes)">
              <TextField
                fullWidth
                type="number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <EurekaIcon
                        name="time"
                        fontSize="small"
                        className="input-adornment"
                      />
                    ),
                    endAdornment: (
                      <span className="input-adornment end-adornment">min</span>
                    ),
                  },
                }}
                {...field}
                className="small-text-input"
              />
            </LabeledInput>
          )}
        />
        <FormInput
          name="distance"
          render={({ field }) => (
            <LabeledInput label="Estimated Distance (kilometers)">
              <TextField
                fullWidth
                type="number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <EurekaIcon
                        name="route"
                        fontSize="small"
                        className="input-adornment"
                      />
                    ),
                    endAdornment: (
                      <span className="input-adornment end-adornment">min</span>
                    ),
                  },
                }}
                {...field}
                className="small-text-input"
              />
            </LabeledInput>
          )}
        />
      </div>
    </ContainerStyled>
  );
}

export default TourInfoSection;
