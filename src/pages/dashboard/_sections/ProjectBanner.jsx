import { Avatar, Badge, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Banner from "@/components/banner/Banner";
import EurekaIcon from "@/components/icon/EurekaIcon";
import DashboardCard from "../_common/DashboardCard";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ContainerStyled = styled("div")(({ theme }) => ({
  "& .info-wrapper": {
    padding: theme.spacing(2, 4),
    display: "flex",
    alignItems: "flex-end",
    gap: theme.spacing(4),
    "& .project-logo": {
      height: theme.spacing(16),
      width: theme.spacing(16),
      marginBottom: theme.spacing(2),
    },
    "& .project-info": {
      color: "white",
      textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
    },
    "& .stats-info": {
      marginTop: theme.spacing(2),
      display: "flex",
      gap: theme.spacing(2),
      "& .stat": {
        display: "flex",
        alignItems: "center",
        color: theme.palette.grey[300],
        gap: theme.spacing(0.5),
        "& *": {
          fontSize: "1em",
        },
      },
    },
  },
}));

/**
 * ProjectBanner component
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").Project} props.project - The project object
 * @returns {JSX.Element}
 */
function ProjectBanner({ project = {} }) {
  const { t } = useTranslation();
  const {
    thumbnail,
    coverPhoto,
    title,
    description,
    status,
    tours,
    totalMembers,
    totalPois,
    // totalAssets,
  } = project;

  const isPublished = status === "published";

  return (
    <DashboardCard noPadding>
      <Banner src={coverPhoto}>
        <ContainerStyled>
          <div className="info-wrapper">
            {isPublished ? (
              <StyledBadge
                badgeContent=" "
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar src={thumbnail} alt={title} className="project-logo" />
              </StyledBadge>
            ) : (
              <Avatar src={thumbnail} alt={title} className="project-logo" />
            )}
            <div className="project-info">
              <Typography variant="h2">{title}</Typography>
              <Typography>{description}</Typography>
              <div className="stats-info">
                <div className="stat">
                  <EurekaIcon name="tour" />
                  <span>{tours?.length} {t("dashboard.projectBanner.tours")}</span>
                </div>
                <div className="stat">
                  <EurekaIcon name="poi" />
                  <span>{totalPois} {t("dashboard.projectBanner.pois")}</span>
                </div>
                {/* <div className="stat">
                  <EurekaIcon name="media" />
                  <span>{totalAssets} Assets</span>
                </div> */}
                <div className="stat">
                  <EurekaIcon name="users" />
                  <span>{totalMembers} {t("dashboard.projectBanner.members")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="actions-wrapper"></div>
        </ContainerStyled>
      </Banner>
    </DashboardCard>
  );
}

export default ProjectBanner;
