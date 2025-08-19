import { Avatar, styled, Typography } from "@mui/material";

import Banner from "@/components/banner/Banner";

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
 * @param {string} props.logo - The logo image URL
 * @param {string} props.cover - The cover image URL
 * @param {string} props.title - The title text
 * @param {string} props.description - The description text
 * @returns {JSX.Element}
 */
function ProjectBanner({ logo, cover, title, description }) {
  return (
    <Banner src={cover}>
      <ContainerStyled>
        <div className="info-wrapper">
          <Avatar src={logo} alt={logo} className="project-logo" />
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
