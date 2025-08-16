/**
 * @typedef {import('@/types/jsdoc-types').Asset} Asset
 * @typedef {import('@/types/jsdoc-types').PoiAsset} PoiAsset
 * @typedef {import('@/types/jsdoc-types').AssetType} AssetType
 */

export const getRandomItems = (items, min, max) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = items.sort(() => 0.5 - Math.random()).slice(0, count);
  return shuffled;
};

/**
 * Returns a random combination of mock poi assets (images, videos, audios, models).
 * @param {Asset[]} assets
 * @param {AssetType} type
 * @param {number} min
 * @param {number} max
 * @returns {PoiAsset[]}
 */
export const getRandomPoiAssets = (assets, type, min, max) => {
  const filtered = assets.filter((a) => a.type === type);
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, count);

  let isModel3dIncluded = false;
  const poiAssets = shuffled.map((asset) => {
    const { id: assetId, ...restAsset } = asset;
    const poiAsset = {
      ...restAsset,
      assetId,
      priority: "normal",
      modelAssetAttributes: {},
    };
    if (restAsset.type === "3d") {
      poiAsset.modelAssetAttributes = { viewInAr: true };
      if (!isModel3dIncluded) {
        poiAsset.priority = "high";
        isModel3dIncluded = true;
      }
    }
    return poiAsset;
  });

  return poiAssets;
};
