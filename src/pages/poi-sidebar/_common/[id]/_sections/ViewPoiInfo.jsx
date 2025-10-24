import { IconButton, Stack, styled, Typography } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import useNavPaths from "@/hooks/useNavPaths";
import { formatCoordinates } from "@/utils/locationFormatters";
import SectionTitle from "../_common/SectionTitle";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
}));

function ViewPoiInfo({ poi }) {
  const { routes, navigate } = useNavPaths();

  const handleEdit = () => {
    navigate(routes.pois.edit(poi.id));
  };

  const handleDelete = () => {
    // TODO: - Delete
    navigate(routes.pois.index);
  };

  return (
    <div className="poi-info-section">
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight="600">
            {poi.title}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <LanguageDropdown label="View in" hideLabels />
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButtonStyled onClick={handleEdit}>
                <EurekaIcon name="edit" fontSize="small" />
              </IconButtonStyled>
              <IconButtonStyled onClick={handleDelete}>
                <EurekaIcon name="delete" fontSize="small" />
              </IconButtonStyled>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <EurekaIcon name="poi" sx={{ color: "text.secondary" }} />
          <div>
            <Typography color="textSecondary">Location</Typography>
            <Typography color="textSecondary">
              {formatCoordinates(poi.coordinates)}
            </Typography>
          </div>
        </Stack>
        <div className="poi-description">
          <SectionTitle>Description</SectionTitle>
          <Typography>{poi.description}</Typography>
        </div>
      </Stack>
    </div>
  );
}

export default ViewPoiInfo;
