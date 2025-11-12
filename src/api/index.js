import { libraryApi } from "./calls/libraryApi";
import { localesApi } from "./calls/localesApi";
import { poiAssetsApi } from "./calls/poiAssetsApi";
import { poisApi } from "./calls/poisApi";
import { projectsApi } from "./calls/projectsApi";
import { toursApi } from "./calls/toursApi";
import { usersApi } from "./calls/usersApi";

export const api = {
  poiAssets: poiAssetsApi,
  library: libraryApi,
  locales: localesApi,
  projects: projectsApi,
  tours: toursApi,
  users: usersApi,
  pois: poisApi,
};
