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
import { useTranslation } from "react-i18next";

import EurekaIcon from "@/components/icon/EurekaIcon";
import Image from "@/components/image/Image";

const CardStyled = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxHeight: "250px",
  borderRadius: theme.spacing(2),
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  "&.highlighted:not(.full-width)": {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    transform: "translateY(-2px)",
    "& .tour-title-section": {
      "& .open-tour-icon": {
        opacity: 1,
      },
    },
  },
  "&:hover:not(.highlighted)": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    transform: "translateY(-2px)",
    "& .tour-title-section": {
      "& .open-tour-icon": {
        opacity: 1,
      },
    },
  },
  "& .card-media": {
    height: "100px",
    flexShrink: 0,
    borderRadius: theme.spacing(1, 0, 0, 1),
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
  "& .card-content": {
    flex: 1,
    padding: theme.spacing(1, 2),
    display: "flex",
    flexDirection: "column",
  },
  "& .tour-title-section": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    "& .open-tour-icon": {
      color: theme.palette.text.secondary,
      opacity: 0,
      transition: "opacity 0.2s ease-in-out",
    },
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
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
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
    "&:hover": {
      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      transform: "translateY(-2px)",
      "& .tour-title-section": {
        "& .open-tour-icon": {
          opacity: 1,
        },
      },
    },
    "& .card-media": {
      height: "100%",
      width: "240px",
      "& img": {
        height: "100%",
        width: "100%",
        objectFit: "cover",
      },
    },
    "& .card-content": {
      padding: theme.spacing(3),
    },
    "& .tour-title-section": {
      marginBottom: theme.spacing(2),
    },
    "& .stats-row": {
      marginBottom: theme.spacing(2),
      gap: theme.spacing(3),
    },
  },
}));

/**
 * Tour card component displaying tour information
 * @typedef {Object} TourCardProps
 * @property {import("@/types/jsdoc-types").Tour} tour - Tour data object
 * @property {boolean} [isFullWidth] - Whether the card should be full width
 * @property {(tourId: string) => void} [onTourClick] - Callback when the tour card is clicked; receives a string param named "tourId"
 */

/**
 * TourCard component for displaying individual tour information
 * @param {TourCardProps} props - TourCard props
 * @returns {React.ReactElement} Rendered tour card component
 */
function TourCard({ tour, isFullWidth, isHighlighted, onTourClick }) {
  const { t } = useTranslation();
  const handleCardClick = () => {
    onTourClick?.(tour.id);
    // navigate(routes.tours.one(tour.id));
  };

  return (
    <CardStyled
      className={clsx("card-tour", {
        highlighted: isHighlighted,
        "full-width": isFullWidth,
      })}
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
          {isFullWidth && (
            <EurekaIcon name="openInNew" className="open-tour-icon" />
          )}
        </div>

        {/* Tour Stats */}
        <div className="stats-row">
          <Chip
            label={tour.isGuided ? t("tours.card.guided") : t("tours.card.freeRoam")}
            size="small"
            className={clsx("tour-type")}
          />

          <div className="stat-item">
            <EurekaIcon name="poi" variant="filled" className="stat-icon" />
            <Typography variant="body2">{tour.totalPois} </Typography>
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
              {isFullWidth && (
                <Typography variant="body2">{t("tours.card.published")}</Typography>
              )}
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
