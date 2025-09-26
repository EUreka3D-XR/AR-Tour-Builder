import { styled, TextField } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

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
      <TextField label="Tour Title" fullWidth />
      <TextField
        label="Description"
        fullWidth
        multiline
        minRows={4}
        maxRows={8}
      />
      <div className="small-inputs">
        <TextField
          label="Estimated Time (minutes)"
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
        <TextField
          label="Estimated Distance (kilometers)"
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
      </div>
    </ContainerStyled>
  );
}

export default TourInfoSection;
