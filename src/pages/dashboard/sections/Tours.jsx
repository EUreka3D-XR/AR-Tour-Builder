import { useProjectTours } from "@/services/toursService";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Skeleton,
} from "@mui/material";

import usePaginatedItems from "@/hooks/usePaginatedItems";

function Tours({ projectId }) {
  const { data, fetchState } = useProjectTours(projectId);
  const { data: tours, meta } = usePaginatedItems({
    items: data,
    size: 5,
  });

  return (
    <Card>
      <CardHeader title="Recente Tours" />
      <Divider />
      <CardContent>
        {fetchState.isLoading && <ToursSkeleton />}
        {fetchState.isSuccess && tours && <ToursList tours={tours} />}
      </CardContent>
      {meta.needsPagination && (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Pagination
            page={meta.page}
            count={meta.totalPages}
            shape="rounded"
            onChange={(_, value) => meta.setPage(value)}
          />
        </CardActions>
      )}
    </Card>
  );
}

/**
 * @param {Object} props
 * @param {Array<import("@/types/jsdoc-types").Tour>} props.tours - Array of tour objects
 * @returns
 */
function ToursList({ tours }) {
  return (
    <List>
      {tours?.map((tour) => (
        <ListItem
          key={tour.id}
          // secondaryAction={
          //   <IconButton edge="end" aria-label="delete">
          //     <DeleteIcon />
          //   </IconButton>
          // }
        >
          <ListItemText primary={tour.title} />
        </ListItem>
      ))}
    </List>
  );
}

function ToursSkeleton() {
  return (
    <List>
      {Array.from(Array(5)).map((_, index) => (
        <ListItem key={index}>
          <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
        </ListItem>
      ))}
    </List>
  );
}

export default Tours;
