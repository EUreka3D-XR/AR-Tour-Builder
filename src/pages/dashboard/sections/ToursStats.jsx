import {
  Card,
  CardHeader,
  Divider,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";

// Mock data for Top Visited Tours
const mockToursStats = [
  {
    id: 1,
    name: "Roman Forum Tour",
    views: 1245,
    popularity: 43.7,
    completion: 82.3,
  },
  {
    id: 2,
    name: "Ancient Pottery Collection",
    views: 892,
    popularity: 31.3,
    completion: 74.1,
  },
  {
    id: 3,
    name: "Medieval Castle Walk",
    views: 710,
    popularity: 24.9,
    completion: 68.5,
  },
];

const ToursContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 3),
}));

const TourItemStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  "& .top-row": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .title": {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2),
      fontWeight: 500,
      "& .seq": {
        backgroundColor: "#dbeafe",
        color: theme.palette.primary.main,
        borderRadius: "50%",
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.875rem",
        fontWeight: 600,
      },
    },
  },
  "& .bottom-row": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(2),
    "& .stat-item": {
      marginTop: theme.spacing(1),
      "& .stat-title": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      "& .stat-line": {
        borderRadius: theme.spacing(1),
        height: theme.spacing(1),
      },
    },
  },
}));

function ToursStats() {
  return (
    <Card>
      <CardHeader title="Top Visited Tours" />
      <Divider />
      <ToursContainer>
        {mockToursStats.map((stats, index) => (
          <TourItemStyled key={stats.id}>
            <div className="top-row">
              <div className="title">
                <span className="seq">{index + 1}</span>
                <span className="name">{stats.name}</span>
              </div>
              <span className="views">{stats.views} views</span>
            </div>
            <div className="bottom-row">
              <div className="stat-item">
                <div className="stat-title">
                  <Typography variant="body2" color="textSecondary">
                    Popularity
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stats.popularity}%
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={stats.completion}
                  className="stat-line"
                />
              </div>
              <div className="stat-item">
                <div className="stat-title">
                  <Typography variant="body2" color="textSecondary">
                    Completion
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stats.completion}%
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={stats.completion}
                  color="secondary"
                  className="stat-line"
                />
              </div>
            </div>
          </TourItemStyled>
        ))}
      </ToursContainer>
    </Card>
  );
}

export default ToursStats;
