import { create } from "zustand";

/**
 * @typedef {{ x: number, y: number, z: number }} Vector3
 *
 * @typedef Transform
 * @property {Vector3} position
 * @property {Vector3} rotation
 * @property {Vector3} scale
 */

/** @type {Transform} */
const defaultTransform = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  dimensions: { width: 1, height: 1, depth: 1 },
};

const useModel3DStore = create((set) => ({
  ...defaultTransform,
  /**
   * @param {Partial<Transform>} transform
   */
  update: ({ position, rotation, scale, dimensions }) =>
    set((state) => ({
      ...(position !== undefined && {
        position: { ...state.position, ...position },
      }),
      ...(rotation !== undefined && {
        rotation: { ...state.rotation, ...rotation },
      }),
      ...(scale !== undefined && { scale: { ...state.scale, ...scale } }),
      ...(dimensions !== undefined && {
        dimensions: { ...state.dimensions, ...dimensions },
      }),
    })),
  reset: () => set({ ...defaultTransform }),
}));

export const useReadModel3DTransform = () => {
  const position = useModel3DStore((s) => s.position);
  const rotation = useModel3DStore((s) => s.rotation);
  const scale = useModel3DStore((s) => s.scale);
  const dimensions = useModel3DStore((s) => s.dimensions);

  return {
    position,
    rotation,
    scale,
    dimensions,
  };
};

export const useWriteModel3DTransform = () => {
  const update = useModel3DStore((s) => s.update);

  return { updateTransform: update };
};
