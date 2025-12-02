import { FormProvider, useForm } from "react-hook-form";
import { Box, Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  minWidth: "400px",
  maxWidth: "450px",
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)",
  border: `1px solid ${theme.palette.divider}`,
}));

function AuthFormBox({ children, onSubmit, defaultValues }) {
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <StyledPaper elevation={3}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}></form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {children}
        </Box>
      </FormProvider>
    </StyledPaper>
  );
}

export default AuthFormBox;
