import { IconButton, styled, TextField } from "@mui/material";

import { useToggle } from "@/hooks/useToggle";
import EurekaIcon from "../icon/EurekaIcon";

const TextFieldStyled = styled(TextField)(() => ({
  label: "password-input",
}));

/**
 * PasswordInput component
 * Accepts the same props as MUI's TextField.
 * @param {import('@mui/material/TextField').TextFieldProps} props
 * @returns {JSX.Element}
 */
function PasswordInput(props) {
  const { isOpen: isPasswordVisible, toggle: togglePasswordVisibility } =
    useToggle();

  return (
    <TextFieldStyled
      {...props}
      type={isPasswordVisible ? "text" : "password"}
      slotProps={{
        input: {
          // startAdornment: (
          //   <EurekaIcon
          //     name="password"
          //     fontSize="small"
          //     className="input-adornment"
          //   />
          // ),
          endAdornment: (
            <IconButton onClick={togglePasswordVisibility} size="small">
              <EurekaIcon
                name={isPasswordVisible ? "visibilityOff" : "visibility"}
                fontSize="small"
              />
            </IconButton>
          ),
        },
      }}
    />
  );
}

export default PasswordInput;
