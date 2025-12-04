import { IconButton, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& .left-section": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    fontSize: theme.typography.subtitle1.fontSize,
  },
}));

function AssetsModalFooter({ onCancel, onImport, numberOfSelected }) {
  const { t } = useTranslation();

  return (
    <ContainerStyled className="asset-modal-footer">
      <div className="left-section">
        <IconButton onClick={onCancel}>
          <EurekaIcon name="close" color="primary" />
        </IconButton>
        <span>{numberOfSelected} {t("assetsModal.footer.selectedLabel")}</span>
      </div>
      <div className="right-section">
        <Button
          variant="filled"
          onClick={onImport}
          disabled={numberOfSelected === 0}
        >
          {t("assetsModal.footer.importButton")}
        </Button>
      </div>
    </ContainerStyled>
  );
}

export default AssetsModalFooter;
