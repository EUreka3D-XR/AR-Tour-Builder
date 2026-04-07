import { useOutletContext } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

import { useProjectMembers } from "@/services/usersService";
import { getUserDisplayName } from "@/utils/user";
import AddMemberRow from "./_components/AddMemberRow";
import DeleteMemberButton from "./_components/DeleteMemberButton";

function ProjectMembersPage() {
  const { t } = useTranslation();
  const { project } = useOutletContext();
  const { data: members, fetchState } = useProjectMembers(project?.id);

  if (!project) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Box sx={{ pl: 2, pt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t("projectSettings.members.title")}
        </Typography>
      </Box>
      <AddMemberRow projectId={project.id} members={members} />
      <br />
      {fetchState.isLoading && <MembersSkeleton />}
      {fetchState.isSuccess && (
        <MembersList
          members={members}
          group={project.group}
          project={project}
        />
      )}
    </Box>
  );
}

function MembersList({ members, group, project }) {
  const checkIfOwner = (user) => {
    return project?.createdBy?.id === user.id;
  };
  return (
    <List dense disablePadding>
      {members?.map((member, index) => {
        const nameResolved = getUserDisplayName(member);
        return (
          <Box key={member.id}>
            <ListItem
              sx={{ bgcolor: index % 2 === 0 ? "background.paper" : "grey.50" }}
              secondaryAction={
                members?.length > 1 &&
                !checkIfOwner(member) && (
                  <DeleteMemberButton
                    group={group}
                    user={member}
                    projectId={project.id}
                  />
                )
              }
            >
              <ListItemAvatar>
                <Avatar src={member.avatar} />
              </ListItemAvatar>
              <ListItemText primary={nameResolved} secondary={member.role} />
            </ListItem>
            <Divider component="li" />
          </Box>
        );
      })}
    </List>
  );
}

function MembersSkeleton() {
  return (
    <List dense>
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

export default ProjectMembersPage;
