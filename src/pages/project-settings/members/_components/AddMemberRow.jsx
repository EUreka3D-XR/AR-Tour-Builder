import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useAddProjectMember } from "@/services/usersService";
import EurekaIcon from "@/components/icon/EurekaIcon";
import { useToggle } from "@/hooks/useToggle";
import { getUserDisplayName, getUserIdentifier } from "@/utils/user";
import MemberUserAutocomplete from "./MemberUserAutocomplete";

function AddMemberRow({ projectId, members }) {
  const { t } = useTranslation();
  const { isOpen: isAdding, toggle } = useToggle();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ px: 2, py: 1 }}
    >
      {!isAdding ? (
        <Button
          variant="text"
          startIcon={<EurekaIcon name="add" />}
          size="small"
          disableGutters
          disabled={isAdding}
          onClick={toggle}
        >
          {t("projectSettings.members.add")}
        </Button>
      ) : (
        <AddingMemberRow
          projectId={projectId}
          members={members}
          onDone={toggle}
        />
      )}
    </Stack>
  );
}

export default AddMemberRow;

const AddingMemberRow = ({ projectId, members, onDone }) => {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);
  const { mutate: add, fetchState } = useAddProjectMember(projectId);

  const handleConfirm = async () => {
    if (!selectedUser) return;
    const userIdentifier = getUserIdentifier(selectedUser);
    await add({ userIdentifier });
    onDone();
  };

  const handleCancel = () => {
    onDone();
  };

  const userDisplayName = getUserDisplayName(selectedUser);

  return selectedUser ? (
    <>
      <Typography sx={{ flexGrow: 1 }}>
        <span style={{ fontStyle: "italic" }}>
          {t("projectSettings.members.adding")}{" "}
        </span>
        <strong>{userDisplayName}</strong>
      </Typography>
      <Tooltip
        title={t("projectSettings.members.confirmAdding", {
          name: userDisplayName,
        })}
      >
        <IconButton
          size="small"
          color="primary"
          disabled={fetchState.isLoading}
          onClick={handleConfirm}
        >
          <EurekaIcon name="check" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("common.action.cancel")}>
        <IconButton size="small" onClick={handleCancel}>
          <EurekaIcon name="close" />
        </IconButton>
      </Tooltip>
    </>
  ) : (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <MemberUserAutocomplete members={members} onChange={setSelectedUser} />
      </Box>
      <Tooltip title={t("common.action.cancel")}>
        <IconButton size="small" onClick={handleCancel}>
          <EurekaIcon name="close" />
        </IconButton>
      </Tooltip>
    </>
  );
};
