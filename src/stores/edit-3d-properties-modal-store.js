import { create } from "zustand";

/**
 * @typedef {import('../types/jsdoc-types').ModelTransform} ModelTransform
 */

/**
 * @typedef {Object} Edit3dPropertiesState
 * @property {boolean} isOpen - Whether the modal is open
 * @property {ModelTransform | undefined} initialTransform - The initial transform passed when opening
 * @property {((transform: ModelTransform | null) => void) | undefined} resolve - Internal promise resolver
 * @property {(initialTransform: ModelTransform) => Promise<ModelTransform | null>} open - Open the modal and return a promise that resolves with the updated transform, or null if cancelled
 * @property {(transform: ModelTransform) => void} onConfirm - Confirm with the updated transform values
 * @property {() => void} onCancel - Cancel and resolve with null
 */

/**
 * Zustand store for managing the Edit 3D Properties modal
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<Edit3dPropertiesState>>}
 */
const useStore = create((set, get) => ({
  isOpen: false,
  initialTransform: undefined,
  resolve: undefined,

  open: (initialTransform) => {
    return new Promise((resolve) => {
      set({ isOpen: true, initialTransform, resolve });
    });
  },

  onConfirm: (transform) => {
    const { resolve } = get();
    resolve?.(transform);
    set({ isOpen: false, initialTransform: undefined, resolve: undefined });
  },

  onCancel: () => {
    const { resolve } = get();
    resolve?.(null);
    set({ isOpen: false, initialTransform: undefined, resolve: undefined });
  },
}));

export const useEdit3dPropertiesModalState = () => {
  const isOpen = useStore((s) => s.isOpen);
  const initialTransform = useStore((s) => s.initialTransform);
  const onConfirm = useStore((s) => s.onConfirm);
  const onCancel = useStore((s) => s.onCancel);

  return { isOpen, initialTransform, onConfirm, onCancel };
};

export const useEdit3dPropertiesModal = () => {
  const open = useStore((s) => s.open);
  return open;
};
