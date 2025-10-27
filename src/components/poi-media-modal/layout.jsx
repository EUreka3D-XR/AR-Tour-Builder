import { Modal, styled } from "@mui/material";

const ModalStyled = styled(Modal)({
  zIndex: 1300,
});

const ModalContent = styled("div")(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  outline: "none",
}));

function MediaModal({ isOpen, onClose, children }) {
  return (
    <ModalStyled open={isOpen} onClose={onClose} sx={{ zIndex: 1300 }}>
      <ModalContent>{children}</ModalContent>
    </ModalStyled>
  );
}

export default MediaModal;
