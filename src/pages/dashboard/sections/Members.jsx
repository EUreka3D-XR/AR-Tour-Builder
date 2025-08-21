import { useState } from "react";
import { useProjectMembers } from "@/services/usersService";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Skeleton,
} from "@mui/material";

import usePaginatedItems from "@/hooks/usePaginatedItems";

function Members({ projectId }) {
  const { data: members, fetchState } = useProjectMembers(projectId);

  const [page, setPage] = useState(1);
  const { data: membersPaginated, meta } = usePaginatedItems({
    items: members,
    size: 5,
    page,
  });

  return (
    <Card>
      <CardHeader title="Members" />
      <Divider />
      <CardContent>
        {fetchState.isLoading && <MembersSkeleton />}
        {fetchState.isSuccess && membersPaginated && (
          <MembersList members={membersPaginated} />
        )}
      </CardContent>
      {meta.needsPagination && (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Pagination
            page={page}
            count={meta.totalPages}
            shape="rounded"
            onChange={(_, value) => setPage(value)}
          />
        </CardActions>
      )}
    </Card>
  );
}

/**
 * @param {Object} props
 * @param {Array<import("@/types/jsdoc-types").User>} props.members - Array of member objects
 * @returns
 */
function MembersList({ members }) {
  return (
    <List dense>
      {members?.map((member) => (
        <ListItem
          key={member.id}
          // secondaryAction={
          //   <IconButton edge="end" aria-label="delete">
          //     <DeleteIcon />
          //   </IconButton>
          // }
        >
          <ListItemAvatar>
            <Avatar src={member.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={member.firstName + " " + member.lastName}
            secondary={member.role}
          />
        </ListItem>
      ))}
    </List>
  );
}

function MembersSkeleton() {
  return (
    <List>
      {Array.from(Array(5)).map((_, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
        </ListItem>
      ))}
    </List>
  );
}

export default Members;
