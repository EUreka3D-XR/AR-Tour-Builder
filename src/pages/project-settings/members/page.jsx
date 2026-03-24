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
import AddMemberRow from "./_components/AddMemberRow";
import DeleteMemberButton from "./_components/DeleteMemberButton";

function ProjectMembersPage() {
  const { t } = useTranslation();
  const { project } = useOutletContext();
  const { data: members, fetchState } = useProjectMembers(project?.id);
  // const [isAdding, setIsAdding] = useState(false);

  if (!project) {
    return null;
  }

  console.log(project);

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Box sx={{ pl: 2, pt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t("projectSettings.members.title")}
        </Typography>
      </Box>
      <AddMemberRow
        projectId={project.id}
        group={project.group}
        members={members}
      />
      <br />
      {fetchState.isLoading && <MembersSkeleton />}
      {fetchState.isSuccess && (
        <MembersList
          members={members}
          group={project.group}
          projectId={project.id}
        />
      )}
    </Box>
  );
}

function MembersList({ members, group, projectId }) {
  return (
    <List dense disablePadding>
      {members?.map((member, index) => {
        const nameResolved =
          member.name || member.username || member.email || "Unknown User";
        return (
          <Box key={member.id}>
            <ListItem
              sx={{ bgcolor: index % 2 === 0 ? "background.paper" : "grey.50" }}
              secondaryAction={
                <DeleteMemberButton
                  group={group}
                  user={member}
                  projectId={projectId}
                />
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
