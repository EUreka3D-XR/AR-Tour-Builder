import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import ExpandableText from "@/components/expandable-text/ExpandableText";
import EurekaIcon from "@/components/icon/EurekaIcon";

const MAX_WIDTH = "1000px";

const Root = styled("div")({
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
});

const ContentContainer = styled("div")({
  position: "relative",
  paddingLeft: 16,
  paddingRight: 16,
  width: "100%",
  height: "100%",
  maxWidth: MAX_WIDTH,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
});

const TopBar = styled("div")(({ theme }) => ({
  height: 64,
  width: "100%",
  maxWidth: MAX_WIDTH,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row-reverse",
  zIndex: 2,
  color: theme.palette.common.white,
}));

const DisplayArea = styled("div")({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: 64,
  width: "100%",
  height: "100%",
  maxWidth: MAX_WIDTH,
});

const InfoArea = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: theme.spacing(2),
  zIndex: 3,
  color: theme.palette.common.white,
  maxWidth: MAX_WIDTH,
}));

export default function DisplayStructure({
  title,
  description,
  onClose,
  children,
}) {
  return (
    <Root>
      <ContentContainer>
        <TopBar>
          {onClose && (
            <IconButton size="large" color="inherit" onClick={onClose}>
              <EurekaIcon name="close" color="inherit" />
            </IconButton>
          )}
          {title && (
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
          )}
        </TopBar>
        <DisplayArea>{children}</DisplayArea>
        {description && (
          <InfoArea>
            <ExpandableText text={description}>{description}</ExpandableText>
          </InfoArea>
        )}
      </ContentContainer>
    </Root>
  );
}
