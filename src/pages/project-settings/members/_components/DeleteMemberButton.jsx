import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";

import { useConfirm } from "@/stores/confirmation-modal-stores";
import { useRemoveProjectMember } from "@/services/usersService";
import EurekaIcon from "@/components/icon/EurekaIcon";
import { getUserDisplayName, getUserIdentifier } from "@/utils/user";

function DeleteMemberButton({ projectId, user }) {
  const { t } = useTranslation();

  const confirm = useConfirm();
  const { mutate: remove } = useRemoveProjectMember(projectId);

  const handleDelete = async () => {
    const nameDisplayed =
      getUserDisplayName(user) ?? t("projectSettings.members.thisUser");
    await confirm({
      title: t("projectSettings.members.remove.title"),
      message: t("projectSettings.members.remove.message", {
        name: nameDisplayed,
      }),
      confirmText: t("projectSettings.members.remove.confirmText"),
      action: () => {
        const userIdentifier = getUserIdentifier(user);
        remove({ userIdentifier });
      },
    });
  };

  return (
    <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
      <EurekaIcon name="delete" />
    </IconButton>
  );
}

export default DeleteMemberButton;
