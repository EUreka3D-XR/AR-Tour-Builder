import { create } from "zustand";

/**
 * @typedef {Object} DialogOption
 * @property {string} value - The value returned when this option is selected
 * @property {string} label - The display text for the option button
 * @property {string} [color] - Optional color for the button
 */

/**
 * @typedef {'buttons' | 'list' } DialogVariant
 */

/**
 * @typedef {Object} OptionsDialogOptions
 * @property {string} [title] - The title of the dialog
 * @property {string} [message] - The message content of the dialog
 * @property {DialogVariant} [variant='buttons'] - The display variant for the options
 * @property {DialogOption[]} options - The available options to select from
 * @property {string} [cancelText] - The text for the cancel button
 * @property {string} [confirmText] - The text for the confirm button (only used in 'list' variant)
 */

/**
 * @typedef {Object} OptionsDialogState
 * @property {boolean} isOpen - Whether the dialog is open
 * @property {OptionsDialogOptions} [options] - The options for the dialog
 * @property {((value: string | false) => void) | undefined} [resolve] - Internal promise resolver function
 * @property {(options: OptionsDialogOptions) => Promise<string | false>} open - Show dialog and return promise
 * @property {(value: string) => void} onSelect - Handle option selection
 * @property {() => void} onCancel - Handle cancel action
 */

/**
 * Zustand store for managing options dialog state
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<OptionsDialogState>>}
 */
const useStore = create((set, get) => ({
  isOpen: false,
  options: undefined,
  resolve: undefined,

  open: (options) => {
    return new Promise((resolve) => {
      set({
        isOpen: true,
        options,
        resolve,
      });
    });
  },

  onSelect: (value) => {
    const { resolve } = get();
    resolve?.(value);
    set({
      isOpen: false,
      options: undefined,
      resolve: undefined,
    });
  },

  onCancel: () => {
    const { resolve } = get();
    resolve?.(false);
    set({
      isOpen: false,
      options: undefined,
      resolve: undefined,
    });
  },
}));

export const useOptionsDialogState = () => {
  const isOpen = useStore((s) => s.isOpen);
  const options = useStore((s) => s.options);
  const onSelect = useStore((s) => s.onSelect);
  const onCancel = useStore((s) => s.onCancel);

  return {
    isOpen,
    options,
    onSelect,
    onCancel,
  };
};

export const useOptionsDialog = () => {
  const open = useStore((s) => s.open);
  return open;
};

export const useOptionsListDialog = () => {
  const open = useStore((s) => s.open);
  /**
   * Open a dialog with a list of options to select from
   * @param {OptionsDialogOptions} options - The options for the dialog
   * @returns {Promise<string | false>} - Resolves to the selected option value or false if cancelled
   */
  const openOptionsListDialog = (options) => {
    return open({ ...options, variant: "list" });
  };
  return openOptionsListDialog;
};

export const useOptionsButtonsDialog = () => {
  const open = useStore((s) => s.open);
  /**
   * Open a dialog with buttons for each option to select from
   * @param {OptionsDialogOptions} options - The options for the dialog
   * @returns {Promise<string | false>} - Resolves to the selected option value or false if cancelled
   */
  const openOptionsButtonsDialog = (options) => {
    return open({ ...options, variant: "buttons" });
  };
  return openOptionsButtonsDialog;
};
