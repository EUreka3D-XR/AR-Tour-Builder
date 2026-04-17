import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetcher.post(baseUrls.images, { data: formData });
};

export const imagesApi = {
  upload: uploadImage,
};
