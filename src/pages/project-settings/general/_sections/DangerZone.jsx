import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useDeleteProject } from "@/services/projectsService";
import { useDeleteProjectModal } from "@/stores/delete-project-modal-store";
import Button from "@/components/button/Button";

function DangerZone({ projectName }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const openModal = useDeleteProjectModal();
  const { mutate: deleteProject } = useDeleteProject(projectId);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = await openModal(projectName);
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteProject({});
      navigate("/projects");
    } finally {
      setIsDeleting(false);
    }
  };

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
              {t("projectSettings.general.dangerZone.deleteProject.label")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("projectSettings.general.dangerZone.deleteProject.description")}
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            color="error"
            isLoading={isDeleting}
            onClick={handleDelete}
          >
            {t("projectSettings.general.dangerZone.deleteProject.button")}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default DangerZone;
