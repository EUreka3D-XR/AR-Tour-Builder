import { styled } from "@mui/material";

import UrlItem from "@/components/url-item/UrlItem";
import NotFoundText from "../_common/NotFoundText";
import SectionTitle from "../_common/SectionTitle";

const HorizontalUrlList = styled("div")(({ theme }) => ({
  label: "horizontal-url-list",
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",

  marginBottom: theme.spacing(2),
}));

/**
 *
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').ExternalLink[]} [props.externalLinks=[]]
 * @param {import('@/types/jsdoc-types').ExternalLink[]} [props.quizLinks=[]]
 * @returns
 */
function ViewPoiLinks({ externalLinks = [], quizLinks = [] }) {
  const showQuizLinks = quizLinks && quizLinks.length > 0;
  const showExternalLinks = externalLinks && externalLinks.length > 0;
  return (
    <div className="poi-links-section">
      <SectionTitle>Quiz Links</SectionTitle>
      <HorizontalUrlList>
        {showQuizLinks ? (
          quizLinks.map((link) => (
            <UrlItem key={link.url} url={link.url} title={link.title} />
          ))
        ) : (
          <NotFoundText>No quiz links available.</NotFoundText>
        )}
      </HorizontalUrlList>
      <SectionTitle>External Links</SectionTitle>
      <HorizontalUrlList>
        {showExternalLinks ? (
          externalLinks.map((link) => (
            <UrlItem key={link.url} url={link.url} title={link.title} />
          ))
        ) : (
          <NotFoundText>No external links available.</NotFoundText>
        )}
      </HorizontalUrlList>
    </div>
  );
}

export default ViewPoiLinks;
