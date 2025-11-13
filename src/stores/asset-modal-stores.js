import { create } from "zustand";

/**
 * @typedef {Object} AssetModalOptions
 * @property {string} projectId - The ID of the project
 * @property {string} [tourId] - The ID of the tour
 * @property {string} [poiId] - The ID of the poi
 * @property {string} assetId - The ID of the asset
 *
 */

/**
 * @typedef {Object} AssetModalState
 * @property {bool} isOpen - The title of the confirmation dialog
 * @property {'libraryAsset' | 'poiAsset'} [sourceType] - The message content of the confirmation dialog
 * @property {AssetModalOptions} options - The message content of the confirmation dialog
 * @property {(options: AssetModalOptions) => void } [openPoiMediaModal] - Function executed when confirming; can be synchronous or async
 * @property {(options: AssetModalOptions) => void } [openLibraryMediaModal] - Function executed when confirming; can be synchronous or async
 * @property {() => void } [closeModal] - Function executed when canceling; can be synchronous or async
 */

/**
 * Zustand store for managing asset modal state
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<AssetModalState>>}
 */
const useStore = create((set) => ({
  isOpen: false,
  sourceType: undefined,
  options: undefined,

  openLibraryMediaModal: (options) => {
    console.log("haha");
    if (!options.projectId || !options.assetId) {
      console.error("Asset Modal: assetId and projectId are required");
      return;
    }

    set({ isOpen: true, options, sourceType: "libraryAsset" });
  },

  openPoiMediaModal: (options) => {
    console.log("hoho");
    if (!options.projectId || !options.assetId) {
      console.error("Asset Modal: assetId and projectId are required");
      return;
    }
    if (!options.tourId || !options.poiId) {
      console.error(
        "Asset Modal: tourId and poiId are required for poiAsset sourceType",
      );
      return;
    }
    set({ isOpen: true, options, sourceType: "poiAsset" });
  },
  closeModal: () =>
    set({ isOpen: false, options: undefined, sourceType: undefined }),
}));

export const useAssetModalState = () => {
  const isOpen = useStore((state) => state.isOpen);
  const sourceType = useStore((state) => state.sourceType);
  const options = useStore((state) => state.options);
  const closeModal = useStore((state) => state.closeModal);

  return { ...options, isOpen, sourceType, closeModal };
};

export const useAssetModal = () => {
  const openLibraryMediaModal = useStore(
    (state) => state.openLibraryMediaModal,
  );
  const openPoiMediaModal = useStore((state) => state.openPoiMediaModal);

  return { openLibraryMediaModal, openPoiMediaModal };
};
