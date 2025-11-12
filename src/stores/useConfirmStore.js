import { create } from "zustand";

/**
 * @typedef {Object} ConfirmOptions
 * @property {string} [title] - The title of the confirmation dialog
 * @property {string} [message] - The message content of the confirmation dialog
 * @property {string} [confirmText] - The text for the confirm button
 * @property {string} [cancelText] - The text for the cancel button
 * @property {() => void | Promise<void>} [action] - Function executed when confirming; can be synchronous or async
 */

/**
 * @typedef {Object} ConfirmState
 * @property {boolean} isOpen - Whether the confirmation dialog is open
 * @property {ConfirmOptions} [options] - The options for the confirmation dialog
 * @property {boolean} isLoading - Whether the confirmation action is in progress
 * @property {(() => void) | undefined} [resolve] - Internal promise resolver function
 * @property {(options: ConfirmOptions) => Promise<void>} confirm - Show confirmation dialog and return promise
 * @property {() => Promise<void>} onConfirm - Handle confirmation action (async)
 * @property {() => void} onCancel - Handle cancel action
 */

/**
 * Zustand store for managing confirmation dialog state
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<ConfirmState>>}
 */
const useStore = create((set, get) => ({
  isOpen: false,
  isLoading: false,
  options: undefined,
  resolve: undefined,

  confirm: (options) => {
    return new Promise((resolve) => {
      set({
        isOpen: true,
        options,
        resolve, // ✅ store the resolver
      });
    });
  },

  onConfirm: async () => {
    const { options, resolve } = get();
    if (!options) return;

    set({ isLoading: true });

    try {
      if (options.action) await options.action();
      resolve?.(true); // ✅ resolve the original Promise
    } catch (error) {
      console.error(error);
    } finally {
      set({
        isOpen: false,
        isLoading: false,
        options: undefined,
        resolve: undefined,
      });
    }
  },

  onCancel: () => {
    const { resolve } = get();
    resolve?.(false);
    set({
      isOpen: false,
      isLoading: false,
      options: undefined,
      resolve: undefined,
    });
  },
}));

export const useConfirmationState = () => {
  const isOpen = useStore((s) => s.isOpen);
  const isLoading = useStore((s) => s.isLoading);
  const options = useStore((s) => s.options);
  const onConfirm = useStore((s) => s.onConfirm);
  const onCancel = useStore((s) => s.onCancel);

  return {
    isOpen,
    isLoading,
    options,
    onConfirm,
    onCancel,
  };
};

export const useConfirm = () => {
  const confirm = useStore((s) => s.confirm);
  return confirm;
};
