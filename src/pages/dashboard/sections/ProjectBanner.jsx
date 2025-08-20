import { Avatar, Badge, styled, Typography } from "@mui/material";

import Banner from "@/components/banner/Banner";

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
    padding: theme.spacing(4, 4),
    display: "flex",
    alignItems: "flex-end",
    gap: theme.spacing(4),
    "& .project-logo": {
      height: theme.spacing(16),
      width: theme.spacing(16),
    },
    "& .project-info": {
      color: "white",
      textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
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
  const { thumbnail, coverPhoto, title, description, status } = project;

  const isPublished = status === "published";

  return (
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
          </div>
        </div>
        <div className="actions-wrapper"></div>
      </ContainerStyled>
    </Banner>
  );
}

export default ProjectBanner;
