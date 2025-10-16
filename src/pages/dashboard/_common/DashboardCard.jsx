import clsx from "clsx";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Pagination,
  styled,
} from "@mui/material";

const CardHeaderStyled = styled(CardHeader)({
  fontWeight: 600,
});

const CardContentStyled = styled(CardContent)({
  "&.no-padding": {
    padding: 0,
  },
});

function DashboardCard({ children, title, pagination, noPadding, className }) {
  return (
    <Card className={className}>
      {title && (
        <>
          <CardHeaderStyled title={title} className="dash-card-header" />
          <Divider />
        </>
      )}
      <CardContentStyled
        className={clsx("dash-card-content", {
          "no-padding": noPadding,
        })}
      >
        {children}
      </CardContentStyled>
      {pagination?.needsPagination && (
        <CardActions
          className="dash-card-footer"
          sx={{ justifyContent: "flex-end" }}
        >
          <Pagination
            page={pagination.page}
            count={pagination.totalPages}
            shape="rounded"
            onChange={(_, value) => pagination.setPage(value)}
          />
        </CardActions>
      )}
    </Card>
  );
}

export default DashboardCard;
