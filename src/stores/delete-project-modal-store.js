import { create } from "zustand";

const useStore = create((set, get) => ({
  isOpen: false,
  projectName: "",
  resolve: undefined,

  open: (projectName) => {
    return new Promise((resolve) => {
      set({ isOpen: true, projectName, resolve });
    });
  },

  onConfirm: () => {
    get().resolve?.(true);
    set({ isOpen: false, projectName: "", resolve: undefined });
  },

  onCancel: () => {
    get().resolve?.(false);
    set({ isOpen: false, projectName: "", resolve: undefined });
  },
}));

export const useDeleteProjectModalState = () => {
  const isOpen = useStore((s) => s.isOpen);
  const projectName = useStore((s) => s.projectName);
  const onConfirm = useStore((s) => s.onConfirm);
  const onCancel = useStore((s) => s.onCancel);

  return { isOpen, projectName, onConfirm, onCancel };
};

export const useDeleteProjectModal = () => useStore((s) => s.open);
