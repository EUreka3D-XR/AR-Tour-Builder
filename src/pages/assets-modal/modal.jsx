import { useState } from "react";
import { Divider, Modal, styled } from "@mui/material";

import AssetsModalContent from "./_sections/AssetsModalContent";
import AssetsModalHeader from "./_sections/AssetsModalHeader";
import AssetsModalSourcesRow from "./_sections/AssetsModalSourcesRow";

const ModalStyled = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalPaper = styled("div")(({ theme }) => ({
  width: "1000px",
  height: "80vh",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[24],
  outline: "none",
  display: "flex",
  flexDirection: "column",
}));

/**
 * Assets Modal Component
 * @param {Object} props
 * @param {boolean} props.allowMultiple - Allow multiple asset selection
 * @param {Function} props.onClose - Callback function when modal is closed
 * @param {Array<'library'|'eureka'|'europeana'|'upload'> | 'all'} props.allowedSources - List of allowed asset sources ('library', 'eureka', 'europeana', 'upload')
 * @returns
 */
function AssetsModal({ onClose, allowMultiple, allowedSources = ["library"] }) {
  const [selectedAssets, setSelectedAssets] = useState([]);

  return (
    <ModalStyled
      open
      onClose={onClose}
      aria-labelledby="assets-modal-title"
      aria-describedby="assets-modal-description"
    >
      <ModalPaper>
        <AssetsModalHeader onClose={onClose} />
        <AssetsModalSourcesRow allowedSources={allowedSources} />
        <Divider />
        <AssetsModalContent
          allowMultiple={allowMultiple}
          selected={selectedAssets}
          setSelected={setSelectedAssets}
        />
      </ModalPaper>
    </ModalStyled>
  );
}

export default AssetsModal;
