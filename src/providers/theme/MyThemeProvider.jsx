import { useMemo } from "react";
import PropTypes from "prop-types";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

function MyThemeProvider({ children }) {
  const theme = useMemo(() => {
    return createTheme({
      custom: {
        headerHeight: "3.5rem",
      },
      typography: {
        // fontFamily: "Poppins, Noto Sans, serif",
        h1: {
          fontSize: "3.5rem",
        },
        h2: {
          fontSize: "2.75rem",
        },
        h3: {
          fontSize: "2rem",
        },
        h4: {
          fontSize: "1.5rem",
        },
        h5: {
          fontSize: "1.25rem",
        },
        h6: {
          fontSize: "1rem",
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            variant: "outlined",
            loadingPosition: "end",
          },
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            input: {
              fontSize: "0.875rem",
            },
            notchedOutline: ({ theme }) => ({
              borderColor: theme.palette.grey[400], // your custom default
              transition: theme.transitions.create(
                ["border-color", "background-color"],
                { duration: theme.transitions.duration.short },
              ),
            }),
          },
        },
        MuiTextField: {
          defaultProps: {
            fullWidth: true,
            size: "small",
          },
        },
        MuiIcon: {
          defaultProps: {
            baseClassName: "material-icons-outlined",
          },
        },
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MyThemeProvider;

MyThemeProvider.propTypes = {
  children: PropTypes.node,
};
