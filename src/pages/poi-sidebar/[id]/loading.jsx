import { Skeleton, Stack } from "@mui/material";

import Spacer from "@/components/spacer/Spacer";

function ViewPoiSidebarLoading() {
  return (
    <div className="poi-sidebar-content content-loading">
      <Skeleton height={256} />
      <Spacer size={4} />
      <div className="poi-info-section">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Skeleton height={40} width="30%" />
          <Skeleton height={40} width="30%" />
        </Stack>
        <Spacer size={4} />
        <Skeleton height={100} />
      </div>
      <Spacer size={10} />
      <div className="poi-links-section">
        <Stack direction="row" spacing={2}>
          <Skeleton width="25%" height={40} />
          <Skeleton width="25%" height={40} />
          <Skeleton width="25%" height={40} />
        </Stack>
        <Spacer size={4} />
        <Stack direction="row" spacing={2}>
          <Skeleton width="25%" height={40} />
          <Skeleton width="25%" height={40} />
          <Skeleton width="25%" height={40} />
        </Stack>
      </div>
      <Spacer size={10} />
      <div className="poi-media-section">
        <Stack spacing={2}>
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Stack>
      </div>
    </div>
  );
}

export default ViewPoiSidebarLoading;
