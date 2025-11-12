import { create } from "zustand";

/**
 * @typedef {Object} ConfirmOptions
 * @property {string} [title] - The title of the confirmation dialog
 * @property {string} [message] - The message content of the confirmation dialog
 * @property {string} [confirmText] - The text for the confirm button
 * @property {string} [cancelText] - The text for the cancel button
 */

/**
 * @typedef {Object} ConfirmState
 * @property {boolean} isOpen - Whether the confirmation dialog is open
 * @property {ConfirmOptions} [options] - The options for the confirmation dialog
 * @property {(value: boolean) => void} [resolve] - The promise resolve function
 * @property {(options: ConfirmOptions) => Promise<boolean>} confirm - Show confirmation dialog and return promise
 * @property {() => void} onConfirm - Handle confirmation action
 * @property {() => void} onCancel - Handle cancel action
 */

/**
 * Zustand store for managing confirmation dialog state
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<ConfirmState>>}
 */
const useStore = create((set, get) => ({
  isOpen: false,
  options: undefined,
  resolve: undefined,

  confirm: (options) => {
    return new Promise((resolve) => {
      set({ isOpen: true, options, resolve });
    });
  },

  onConfirm: () => {
    const resolve = get().resolve;
    resolve?.(true);
    set({ isOpen: false, options: undefined, resolve: undefined });
  },

  onCancel: () => {
    const resolve = get().resolve;
    resolve?.(false);
    set({ isOpen: false, options: undefined, resolve: undefined });
  },
}));

export const useConfirmationState = () => {
  const isOpen = useStore((s) => s.isOpen);
  const options = useStore((s) => s.options);
  const onConfirm = useStore((s) => s.onConfirm);
  const onCancel = useStore((s) => s.onCancel);

  return {
    isOpen,
    options,
    onConfirm,
    onCancel,
  };
};

export const useConfirm = () => {
  const confirm = useStore((s) => s.confirm);
  return confirm;
};
