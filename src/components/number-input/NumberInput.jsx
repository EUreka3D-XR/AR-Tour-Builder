import { styled, TextField } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  label: "number-input",
  "& input": {
    textAlign: "end",
  },
  "& .input-adornment": {
    color: theme.palette.text.secondary,
    "&.end-adornment": {
      paddingLeft: theme.spacing(1),
    },
  },
}));

/**
 * NumberInput component
 * Accepts the same props as MUI's TextField.
 * @param {import('@mui/material/TextField').TextFieldProps & { iconName?: string, endAdornmentText?: string, onChange?: (value: number) => void }} props
 * @returns {JSX.Element}
 */
function NumberInput({ iconName, endAdornmentText, onChange, ...props }) {
  const handleChange = (e) => {
    onChange(e.target.valueAsNumber);
  };

  return (
    <TextFieldStyled
      {...props}
      type="number"
      slotProps={{
        input: {
          startAdornment: iconName ? (
            <EurekaIcon
              name={iconName}
              fontSize="small"
              className="input-adornment"
            />
          ) : null,
          endAdornment: endAdornmentText ? (
            <span className="input-adornment end-adornment">
              {endAdornmentText}
            </span>
          ) : null,
        },
      }}
      onChange={handleChange}
    />
  );
}

export default NumberInput;
