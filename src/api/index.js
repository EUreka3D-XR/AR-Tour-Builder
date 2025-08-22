import { projectsApi } from "./calls/projectsApi";
import { toursApi } from "./calls/toursApi";
import { usersApi } from "./calls/usersApi";

export const api = {
  projects: projectsApi,
  tours: toursApi,
  users: usersApi,
};
