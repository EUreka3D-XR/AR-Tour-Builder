import { Skeleton, styled } from "@mui/material";

const ContainerStyled = styled("div")(({ theme }) => ({
  paddingBottom: theme.spacing(8),
  "& .dash-section": {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),

    "&.dash-grid": {
      display: "grid",
      gap: theme.spacing(4),
      "&.equal": {
        gridTemplateColumns: "1fr 1fr",
      },
      "&.one-two-thirds": {
        gridTemplateColumns: "1fr 2fr",
      },
    },
  },
}));

function DashboardLoadingPage() {
  return (
    <ContainerStyled>
      <div className="dash-section">
        <Skeleton variant="rounded" height={300} width="100%" />
      </div>
      <div className="dash-section dash-grid one-two-thirds">
        <Skeleton variant="rounded" height={400} width="100%" />
        <Skeleton variant="rounded" height={400} width="100%" />
      </div>
      <div className="dash-section dash-grid equal">
        <Skeleton variant="rounded" height={400} width="100%" />
        <Skeleton variant="rounded" height={400} width="100%" />
      </div>
    </ContainerStyled>
  );
}

export default DashboardLoadingPage;
