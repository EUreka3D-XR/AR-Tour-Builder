import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Divider, Stack, Typography } from "@mui/material";

import { useConfirm } from "@/stores/confirmation-modal-stores";
import { useDeleteProjectModal } from "@/stores/delete-project-modal-store";
import { useProfile } from "@/services/profileService";
import { useDeleteProject } from "@/services/projectsService";
import { useRemoveProjectMember } from "@/services/usersService";
import Button from "@/components/button/Button";
import { getUserIdentifier } from "@/utils/user";

function DangerZone({ projectName, project }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: user } = useProfile();

  const isOwner = project?.createdBy?.id === user?.id;

  const openDeleteModal = useDeleteProjectModal();
  const confirm = useConfirm();
  const { mutate: deleteProject } = useDeleteProject(projectId);
  const { mutate: removeMember } = useRemoveProjectMember(projectId);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = await openDeleteModal(projectName);
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await deleteProject({});
      navigate("/projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    await confirm({
      title: t("projectSettings.general.dangerZone.leaveProject.modal.title"),
      message: t(
        "projectSettings.general.dangerZone.leaveProject.modal.message",
        {
          projectName,
        },
      ),
      confirmText: t(
        "projectSettings.general.dangerZone.leaveProject.modal.confirmButton",
      ),
      action: async () => {
        const userIdentifier = getUserIdentifier(user);
        await removeMember({ userIdentifier });
        navigate("/projects");
      },
    });
  };

  const label = isOwner
    ? t("projectSettings.general.dangerZone.deleteProject.label")
    : t("projectSettings.general.dangerZone.leaveProject.label");

  const description = isOwner
    ? t("projectSettings.general.dangerZone.deleteProject.description")
    : t("projectSettings.general.dangerZone.leaveProject.description");

  const buttonLabel = isOwner
    ? t("projectSettings.general.dangerZone.deleteProject.button")
    : t("projectSettings.general.dangerZone.leaveProject.button");

  const handleAction = isOwner ? handleDelete : handleLeave;

  return (
    <>
      <Divider sx={{ mt: 4 }} />
      <Stack gap={1} sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="error">
          {t("projectSettings.general.dangerZone.title")}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            border: "1px solid",
            borderColor: "error.main",
            borderRadius: 1,
            px: 3,
            py: 2,
          }}
        >
          <Stack gap={0.5}>
            <Typography variant="body2" fontWeight={500}>
              {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            color="error"
            isLoading={isLoading}
            onClick={handleAction}
          >
            {buttonLabel}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default DangerZone;
