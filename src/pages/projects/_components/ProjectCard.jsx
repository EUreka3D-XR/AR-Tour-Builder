import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  styled,
  Typography,
} from "@mui/material";

import { paths } from "@/utils/paths";

/**
 * @typedef {import('@/types/jsdoc-types').Project} Project
 */

const ProjectCardStyled = styled(Card)({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },
});

const StatsContainer = styled(Box)({
  display: "flex",
  gap: "0.5rem",
  marginTop: "1rem",
  flexWrap: "wrap",
});

const StatChip = styled(Chip)({
  fontSize: "0.75rem",
  height: "24px",
});

const LastUpdated = styled(Typography)({
  color: "#666",
  fontSize: "0.8rem",
  marginTop: "0.5rem",
});

/**
 * Renders a single project card
 * @param {Object} props
 * @param {Project} props.project - The project data to display
 * @returns {JSX.Element}
 */
function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(paths.projects.one(project.id));
  };

  return (
    <ProjectCardStyled onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="200"
        image={project.thumbnail}
        alt={project.title}
      />
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          {project.description}
        </Typography>
        <StatsContainer>
          <StatChip
            label={`${project.totalTours} Tours`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <StatChip
            label={`${project.totalPois} POIs`}
            size="small"
            color="secondary"
            variant="outlined"
          />
          <StatChip
            label={`${project.totalAssets} Assets`}
            size="small"
            color="default"
            variant="outlined"
          />
        </StatsContainer>
        <LastUpdated>
          Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
        </LastUpdated>
      </CardContent>
    </ProjectCardStyled>
  );
}

export default ProjectCard;
