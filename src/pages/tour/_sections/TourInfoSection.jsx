import { styled, TextField } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import LabeledInput from "@/components/labeled-input/LabeledInput";

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
      <LabeledInput label="Tour Title">
        <TextField fullWidth />
      </LabeledInput>
      <LabeledInput label="Description">
        <TextField fullWidth multiline minRows={4} maxRows={8} />
      </LabeledInput>
      <div className="small-inputs">
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
            className="small-text-input"
          />
        </LabeledInput>
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
                  <span className="input-adornment end-adornment">km</span>
                ),
              },
            }}
            className="small-text-input"
          />
        </LabeledInput>
      </div>
    </ContainerStyled>
  );
}

export default TourInfoSection;
