import fetcher from "@/api/fetcher/api-fetcher";

import { baseUrls } from "../endpoints-base-urls/baseUrls";

/**
 * Calls backend proxy to extract the Eureka 3D zip download URL
 * from a Europeana page.
 *
 * Request params: { url: string }
 * Response: { zipUrl: string } or { zipUrl: null }
 */
const getZipDownloadUrl = async (europeanaUrl) => {
  const url = baseUrls.europeana + "/extract-zip-url";

  const data = await fetcher.get(url, { params: { europeanaUrl } });
  console.log(data);
  if (!data || !data.id) {
    throw new Error("Failed to extract Eureka 3D file ID");
  }
  const zipDownloadUrl = constructZipDownloadUrl(data.id);

  return zipDownloadUrl;
};

const europeanaApi = {
  fetchZipDownloadUrl: getZipDownloadUrl,
};

export default europeanaApi;

function constructZipDownloadUrl(fileId) {
  return `https://datahub.egi.eu/api/v3/onezone/shares/data/${fileId}/content`;
}
