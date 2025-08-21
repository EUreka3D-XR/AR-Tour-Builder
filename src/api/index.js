import { projectsApi } from "./calls/projectsApi";
import { usersApi } from "./calls/usersApi";

export const api = {
  projects: projectsApi,
  users: usersApi,
};
