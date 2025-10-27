import { styled } from "@mui/material";

import ErrorArea from "@/components/error/ErrorArea";

const Container = styled("div")(({ theme }) => ({
  minHeight: `calc(100vh - ${theme.custom.headerHeight || 64})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
}));

function ErrorPage({ hideReload, hideGoBack }) {
  return (
    <Container className="error-page">
      <ErrorArea hideReload={hideReload} hideGoBack={hideGoBack} />
    </Container>
  );
}

export default ErrorPage;
