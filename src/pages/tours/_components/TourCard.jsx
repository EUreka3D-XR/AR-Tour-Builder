import { useNavigate } from "react-router";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import Image from "@/components/image/Image";
import useNavPaths from "@/hooks/useNavPaths";

const CardStyled = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxHeight: "250px",
  borderRadius: theme.spacing(2),
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    transform: "translateY(-2px)",
  },
  "& .card-media": {
    height: "100px",
    flexShrink: 0,
    borderRadius: theme.spacing(1, 0, 0, 1),
  },
  "& .card-content": {
    flex: 1,
    p: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  "& .tour-title-section": {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  "& .tour-title": {
    flex: 1,
    fontWeight: 600,
  },
  "& .tour-type": {
    fontWeight: 600,
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
  },
  "& .stats-row": {
    display: "flex",
    gap: theme.spacing(2), //
    marginBottom: theme.spacing(2),
    "& .stat-item": {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(0.5),
      color: theme.palette.text.secondary,
      "&.success": {
        color: theme.palette.success.light,
        fontWeight: 500,
      },
    },
    "& .stat-icon": {
      fontSize: 18,
    },
  },
  "& .tour-description": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },
  "&.full-width": {
    flexDirection: "row",
    height: "180px",
    maxWidth: "1000px",
    "& .card-media": {
      height: "100%",
      width: "240px",
      "& img": {
        height: "100%",
        width: "100%",
        objectFit: "cover",
      },
    },
    "& .stats-row": {
      gap: theme.spacing(3),
    },
  },
}));

/**
 * Tour card component displaying tour information
 * @typedef {Object} TourCardProps
 * @property {import("@/types/jsdoc-types").Tour} tour - Tour data object
 * @property {boolean} [isFullWidth] - Whether the card should be full width
 */

/**
 * TourCard component for displaying individual tour information
 * @param {TourCardProps} props - TourCard props
 * @returns {React.ReactElement} Rendered tour card component
 */
function TourCard({ tour, isFullWidth }) {
  const navigate = useNavigate();
  const { routes } = useNavPaths();

  const handleCardClick = () => {
    navigate(routes.tours.one(tour.id));
  };

  return (
    <CardStyled
      className={clsx("card-tour", { "full-width": isFullWidth })}
      onClick={handleCardClick}
    >
      <CardMedia className="card-media">
        <Image src={tour.thumbnail} alt={tour.title} />
      </CardMedia>

      <CardContent className="card-content">
        <div className="tour-title-section">
          <Typography variant="h5" component="h3" className="card-title">
            {tour.title}
          </Typography>
        </div>

        {/* Tour Stats */}
        <div className="stats-row">
          <Chip
            label={tour.isGuided ? "Guided" : "Free roam"}
            size="small"
            className={clsx("tour-type")}
          />

          <div className="stat-item">
            <EurekaIcon name="poi" variant="filled" className="stat-icon" />
            <Typography variant="body2">{tour.poisCount} </Typography>
          </div>

          <div className="stat-item">
            <EurekaIcon name="time" className="stat-icon" />
            <Typography variant="body2">{tour.duration}&apos;</Typography>
          </div>

          <div className="stat-item">
            <EurekaIcon name="route" className="stat-icon" />
            <Typography variant="body2">{tour.distance / 1000}km</Typography>
          </div>

          {tour.status === "published" && (
            <div className="stat-item success">
              <EurekaIcon name="checkCircle" className="stat-icon" />
              <Typography variant="body2">Published</Typography>
            </div>
          )}
        </div>

        {/* Description */}
        <Typography variant="body2" className="tour-description">
          {tour.description}
        </Typography>
      </CardContent>
    </CardStyled>
  );
}

/**
 * TourCardSkeleton component for loading state
 * @returns {React.ReactElement} Rendered tour card skeleton component
 */
function TourCardSkeleton({ isFullWidth }) {
  return (
    <CardStyled
      className={clsx("card-tour-skeleton", { "full-width": isFullWidth })}
    >
      {/* Tour Image Skeleton */}
      <Skeleton variant="rectangular" className="card-media" />
      {/* Tour Content Skeleton */}
      <CardContent className="card-content">
        {/* Header with title and guided badge skeleton */}
        <div className="tour-title-section">
          <Skeleton
            variant="text"
            sx={{
              flex: 1,
              fontSize: "1.5rem",
              height: 40,
            }}
          />
        </div>

        {/* Tour Stats Skeleton */}
        <div className="stats-row">
          <div className="stat-item">
            <Skeleton variant="circular" width={18} height={18} />
            <Skeleton variant="text" width={50} height={20} />
          </div>

          <div className="stat-item">
            <Skeleton variant="circular" width={18} height={18} />
            <Skeleton variant="text" width={45} height={20} />
          </div>

          <div className="stat-item">
            <Skeleton variant="circular" width={18} height={18} />
            <Skeleton variant="text" width={40} height={20} />
          </div>
        </div>

        {/* Description Skeleton */}
        <div>
          <Skeleton variant="text" sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="80%" />
        </div>
      </CardContent>
    </CardStyled>
  );
}

TourCard.Skeleton = TourCardSkeleton;

export default TourCard;
