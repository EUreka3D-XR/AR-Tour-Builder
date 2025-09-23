import { libraryApi } from "./calls/libraryApi";
import { projectsApi } from "./calls/projectsApi";
import { toursApi } from "./calls/toursApi";
import { usersApi } from "./calls/usersApi";

export const api = {
  library: libraryApi,
  projects: projectsApi,
  tours: toursApi,
  users: usersApi,
};
