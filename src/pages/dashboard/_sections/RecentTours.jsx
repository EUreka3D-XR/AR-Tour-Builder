import {
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";

import { useProjectTours } from "@/services/toursService";
import EurekaIcon from "@/components/icon/EurekaIcon";
import usePaginatedItems from "@/hooks/usePaginatedItems";
import DashboardCard from "../_common/DashboardCard";

function RecentTours({ projectId }) {
  const { data, fetchState } = useProjectTours(projectId);
  const { data: tours, meta } = usePaginatedItems({
    items: data,
    size: 4,
  });

  return (
    <DashboardCard title="Recent Tours" pagination={meta} noPadding>
      <>
        {fetchState.isLoading && <ToursSkeleton />}
        {fetchState.isSuccess && tours && <ToursList tours={tours} />}
      </>
    </DashboardCard>
  );
}

const TourListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  justifyContent: "space-between",
  padding: theme.spacing(2),
  "&:last-child": {
    borderBottom: "none",
  },
  "& .tour-header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing(1),
  },
  "& .tour-title": {
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.primary,
  },
  "& .tour-meta": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
  },
  "& .tour-meta-item": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
  },
  "& .tour-actions": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

/**
 * Helper function to format relative time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted relative time
 */
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Updated today";
  if (diffInDays === 1) return "Updated 1 day ago";
  if (diffInDays < 7) return `Updated ${diffInDays} days ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return "Updated 1 week ago";
  if (diffInWeeks < 4) return `Updated ${diffInWeeks} weeks ago`;

  return "Updated over a month ago";
};

/**
 * @param {Object} props
 * @param {Array<import("@/types/jsdoc-types").Tour>} props.tours - Array of tour objects
 * @returns
 */
function ToursList({ tours }) {
  return (
    <List disablePadding dense>
      {tours?.map((tour) => (
        <TourListItem key={tour.id} disablePadding>
          <div>
            <div className="tour-header">
              <Typography variant="h6" className="tour-title">
                {tour.title}
              </Typography>
            </div>

            <div className="tour-meta">
              <div className="tour-meta-item">
                <EurekaIcon name="poi" sx={{ fontSize: 16 }} />
                <span>{tour.totalPois || tour.pois?.length || 0} POIs</span>
              </div>
              <div className="tour-meta-item">
                <EurekaIcon name="time" sx={{ fontSize: 16 }} />
                <span>{tour.duration || "45 min"}</span>
              </div>
              <div className="tour-meta-item">
                <span>{getRelativeTime(tour.updatedAt || tour.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="tour-actions">
            <Chip
              label={tour.status === "published" ? "Published" : "Draft"}
              color={tour.status === "published" ? "success" : "warning"}
              size="small"
              variant="outlined"
            />
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <EurekaIcon name="settings" />
            </IconButton>
          </div>
        </TourListItem>
      ))}
    </List>
  );
}

function ToursSkeleton() {
  return (
    <List>
      {Array.from(Array(5)).map((_, index) => (
        <ListItem key={index}>
          <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
        </ListItem>
      ))}
    </List>
  );
}

export default RecentTours;
