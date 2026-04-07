import { useTranslation } from "react-i18next";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

import { useProjectMembers } from "@/services/usersService";
import useNavPaths from "@/hooks/useNavPaths";
import usePaginatedItems from "@/hooks/usePaginatedItems";
import { getUserDisplayName } from "@/utils/user";
import DashboardCard from "../_common/DashboardCard";

function Members({ projectId }) {
  const { t } = useTranslation();
  const { routes } = useNavPaths();

  const { data: members, fetchState } = useProjectMembers(projectId);

  const { data: membersPaginated, meta } = usePaginatedItems({
    items: members,
    size: 5,
  });

  return (
    <DashboardCard
      title={t("dashboard.members.title")}
      pagination={meta}
      goToRoute={routes.projectMembers}
      goToLabel={t("dashboard.members.manage")}
    >
      <>
        {fetchState.isLoading && <MembersSkeleton />}
        {fetchState.isSuccess && membersPaginated && (
          <MembersList members={membersPaginated} />
        )}
      </>
    </DashboardCard>
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
      {members?.map((member) => {
        const nameResolved = getUserDisplayName(member);
        return (
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
            <ListItemText primary={nameResolved} secondary={member.role} />
          </ListItem>
        );
      })}
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
