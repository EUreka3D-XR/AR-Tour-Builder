import { authApi } from "./calls/authApi";
import europeanaApi from "./calls/europeanaApi";
import { libraryApi } from "./calls/libraryApi";
import { localesApi } from "./calls/localesApi";
import { poiAssetsApi } from "./calls/poiAssetsApi";
import { poisApi } from "./calls/poisApi";
import { profileApi } from "./calls/profileApi";
import { projectsApi } from "./calls/projectsApi";
import { toursApi } from "./calls/toursApi";
import { usersApi } from "./calls/usersApi";

export const api = {
  auth: authApi,
  europeana: europeanaApi,
  poiAssets: poiAssetsApi,
  library: libraryApi,
  locales: localesApi,
  profile: profileApi,
  projects: projectsApi,
  tours: toursApi,
  users: usersApi,
  pois: poisApi,
};
