export const ORDERED_TYPES = ["image", "video", "model3d", "document", "audio"];

export function groupAssetsByType(assets = []) {
  return ORDERED_TYPES.reduce((acc, type) => {
    const group = assets
      .filter((a) => a.type === type)
      .sort((a, b) => {
        if (a.typeOrder == null && b.typeOrder == null) return 0;
        if (a.typeOrder == null) return 1;
        if (b.typeOrder == null) return -1;
        return a.typeOrder - b.typeOrder;
      });
    if (group.length > 0) acc.push({ type, assets: group });
    return acc;
  }, []);
}
