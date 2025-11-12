import { Skeleton, Stack } from "@mui/material";

function SidebarSkeleton() {
  return (
    <Stack spacing={10} padding={3}>
      <Skeleton height={80} />
      <Skeleton height={400} />
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Skeleton height={40} width="50%" />
        <Skeleton height={40} width="50%" />
      </Stack>
      <Stack alignItems="flex-end">
        <Skeleton height={50} width="200px" />
      </Stack>
    </Stack>
  );
}

export default SidebarSkeleton;
