import { assetsApi } from "./calls/assetsApi";
import { libraryApi } from "./calls/libraryApi";
import { localesApi } from "./calls/localesApi";
import { poisApi } from "./calls/poisApi";
import { projectsApi } from "./calls/projectsApi";
import { toursApi } from "./calls/toursApi";
import { usersApi } from "./calls/usersApi";

export const api = {
  assets: assetsApi,
  library: libraryApi,
  locales: localesApi,
  projects: projectsApi,
  tours: toursApi,
  users: usersApi,
  pois: poisApi,
};
