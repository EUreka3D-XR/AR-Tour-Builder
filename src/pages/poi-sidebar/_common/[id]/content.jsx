import { styled } from "@mui/material";

import Spacer from "@/components/spacer/Spacer";
import ViewPoiBanner from "./_sections/ViewPoiBanner";
import ViewPoiInfo from "./_sections/ViewPoiInfo";
import ViewPoiLinks from "./_sections/ViewPoiLinks";
import ViewPoiMedia from "./_sections/ViewPoiMedia";

const ContainerStyled = styled("div")(() => ({
  label: "view-poi-sidebar-content",
}));

/**
 *
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').Poi} props.poi
 * @returns
 */
function ViewPoiSidebarContent({ poi }) {
  return (
    <ContainerStyled>
      {poi.thumbnail ? (
        <ViewPoiBanner photoUrl={poi.thumbnail} />
      ) : (
        <Spacer size={10} />
      )}
      <ViewPoiInfo poi={poi} />
      <ViewPoiLinks
        externalLinks={poi.externalLinks}
        quizLinks={poi.quizLinks}
      />
      <ViewPoiMedia mediaItems={poi.assets} />
    </ContainerStyled>
  );
}

export default ViewPoiSidebarContent;
