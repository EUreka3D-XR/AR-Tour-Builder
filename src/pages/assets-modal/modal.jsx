import { useState } from "react";
import clsx from "clsx";
import { Divider, lighten, Modal, styled } from "@mui/material";

import AssetsModalBrowser from "./_sections/AssetsModalBrowser";
import AssetsModalFooter from "./_sections/AssetsModalFooter";
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
  position: "relative",
  overflow: "hidden",
  "& .footer-wrapper": {
    position: "absolute",
    width: "100%",
    backgroundColor: lighten(theme.palette.primary.light, 0.9),
    bottom: "-80px",
    transition: theme.transitions.create(["bottom"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeInOut,
      delay: theme.transitions.duration.leavingScreen,
    }),
    "&.show": {
      bottom: 0,
    },
  },
}));

/**
 * Assets Modal Component
 * @param {Object} props
 * @param {boolean} props.allowMultiple - Allow multiple asset selection
 * @param {Function} props.onClose - Callback function when modal is closed
 * @param {Array<'library'|'external'|'upload'> | 'all'} props.allowedSources - List of allowed asset sources ('library', 'external', 'upload')
 * @returns
 */
function AssetsModal({
  onClose,
  allowMultiple = false,
  allowedSources = ["library", "external"],
}) {
  const [selectedAssets, setSelectedAssets] = useState([]);

  const handleImport = () => {
    console.log("Importing assets:", selectedAssets);
    // Implement the import logic here
    onClose();
  };

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
        {/* <AssetsModalExternalBrowser /> */}
        <AssetsModalBrowser
          allowMultiple={allowMultiple}
          selected={selectedAssets}
          setSelected={setSelectedAssets}
        />
        <div
          className={clsx("footer-wrapper", {
            show: selectedAssets.length > 0,
          })}
        >
          <AssetsModalFooter
            numberOfSelected={selectedAssets.length}
            onCancel={() => setSelectedAssets([])}
            onImport={handleImport}
          />
        </div>
      </ModalPaper>
    </ModalStyled>
  );
}

export default AssetsModal;
