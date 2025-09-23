import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from "miragejs";

import { getRandomItems, getRandomPoiAssets } from "./helpers/randomizers";
import { getMockAssets } from "./mock-data/assetsMocks";
import { mockPOIs } from "./mock-data/poisMocks";
import { mockProjects } from "./mock-data/projectsMocks";
import { mockTours } from "./mock-data/toursMocks";
import { mockUsers } from "./mock-data/usersMocks";

const AppSerializer = RestSerializer.extend({
  serialize() {
    let json = RestSerializer.prototype.serialize.apply(this, arguments);
    let data = Object.values(json)[0];

    // Get the locale parameter from the request
    const request = arguments[1];
    const localesParam = request?.queryParams?.locale;

    if (localesParam && data) {
      // Transform the data to use localized values
      data = this.transformLocalizedFields(data, localesParam);
    }

    return data;
  },
  transformLocalizedFields(data, locale) {
    // Handle arrays of data
    if (Array.isArray(data)) {
      return data.map((item) => this.transformLocalizedFields(item, locale));
    }

    // Handle single objects
    if (data && typeof data === "object") {
      const transformed = { ...data };

      // Check each property for LocalesField pattern
      Object.keys(transformed).forEach((key) => {
        const value = transformed[key];

        // Check if this is a LocalesField (has locales.en, locales.fr, etc.)
        if (this.isLocalesField(value)) {
          // Transform to the requested locale or fallback to 'en'
          transformed[key] = value.locales[locale] || value.locales.en || "";
        }
        // Recursively handle nested objects and arrays
        else if (value && typeof value === "object") {
          transformed[key] = this.transformLocalizedFields(value, locale);
        }
      });

      return transformed;
    }

    return data;
  },
  isLocalesField(value) {
    return (
      value &&
      typeof value === "object" &&
      value.locales &&
      typeof value.locales === "object" &&
      (value.locales.en || value.locales.fr)
    ); // Check for expected locale keys
  },
});

export const makeServer = ({ environment = "development" } = {}) => {
  return createServer({
    environment,
    models: {
      user: Model,
      project: Model.extend({
        members: hasMany("user"),
        tours: hasMany("tour"),
      }),
      library: Model.extend({
        project: belongsTo("project"),
        assets: hasMany("asset"),
      }),
      tour: Model.extend({
        project: belongsTo("project"),
        pois: hasMany("poi"),
      }),
      poi: Model.extend({
        tour: belongsTo("tour"),
        poiAssets: hasMany("poiAsset"),
      }),
      asset: Model.extend({
        libraries: hasMany("library"),
        poiAssets: hasMany("poiAsset"),
      }),
      poiAsset: Model.extend({
        poi: belongsTo("poi"),
        asset: belongsTo("asset"),
      }),
    },
    serializers: {
      application: AppSerializer,
      project: AppSerializer.extend({
        include: ["tours"],
        embed: true, // embed tours + pois instead of IDs
      }),
      tour: AppSerializer.extend({
        include: ["pois"],
        embed: true,
      }),
      poi: AppSerializer.extend({
        include: ["poiAssets"],
        embed: true,

        // serialize(resource, request) {
        //   let json = AppSerializer.prototype.serialize.apply(this, arguments);

        //   // Transform poiAssets into array with asset data + viewInAr
        //   if (json.poi && json.poi.poiAssets) {
        //     json.poi.assets = json.poi.poiAssets.map((pa) => ({
        //       id: pa.asset.id,
        //       name: pa.asset.name,
        //       viewInAr: pa.viewInAr,
        //     }));
        //     delete json.poi.poiAssets;
        //   }

        //   return json;
        // },
      }),
      poiAsset: AppSerializer.extend({
        include: ["assets"],
        embed: true,
      }),
      library: AppSerializer.extend({
        include: ["assets"],
        embed: true,
      }),
    },

    seeds(server) {
      mockUsers.forEach((user) => {
        server.create("user", user);
      });

      getMockAssets().forEach((asset) => {
        server.create("asset", asset);
      });

      mockPOIs.forEach((poi) => {
        server.create("poi", poi);
      });

      mockTours.forEach((tour) => {
        server.create("tour", tour);
      });

      mockProjects.forEach((project) => {
        server.create("project", project);
      });

      // Assign random assets to each POI and create poiAsset relationships
      server.db.pois.forEach((poi) => {
        const assets = server.db.assets;

        const imageAssets = getRandomPoiAssets(assets, "image", 1, 5);
        const videoAssets = getRandomPoiAssets(assets, "video", 0, 2);
        const threeDAssets = getRandomPoiAssets(assets, "3d", 0, 2);

        const selectedPoiAssets = [
          ...imageAssets,
          ...videoAssets,
          ...threeDAssets,
        ];

        const poiAssetIds = selectedPoiAssets.map((asset) => {
          const poiAsset = server.create("poiAsset", {
            poiId: poi.id,
            ...asset,
          });
          return poiAsset.id;
        });

        // Assign the poiAsset ids to the assets array of the poi
        server.db.pois.update(poi.id, { assetIds: poiAssetIds });
      });

      // Assign random pois to each tour
      server.db.tours.forEach((tour) => {
        const pois = server.db.pois;
        const selectedPois = getRandomItems(pois, 5, 10);
        const poiIds = selectedPois.map((poi) => poi.id);
        server.db.tours.update(tour.id, { poiIds: poiIds });
      });

      // Assign tours to projects
      server.db.projects.forEach((project) => {
        const tours = server.db.tours;
        const selectedTours = getRandomItems(tours, 2, 5);
        const tourIds = selectedTours.map((tour) => tour.id);
        server.db.projects.update(project.id, { tourIds });
      });

      // Create and assign a library for each project, which will contain all assets for more easy handling
      const assetIds = server.db.assets.map((asset) => asset.id);
      server.db.projects.forEach((project) => {
        server.create("library", {
          projectId: project.id,
          assetIds: assetIds,
        });
      });

      // Add 3-7 random users from db to each project
      server.db.projects.forEach((project) => {
        const users = server.db.users;
        const selectedUsers = getRandomItems(users, 3, 7);
        const memberIds = selectedUsers.map((user) => user.id);
        server.db.projects.update(project.id, { memberIds });
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;

      // Project
      this.get("/projects");
      this.get("/projects/:projectId", (schema, request) => {
        const projectId = request.params.projectId;
        const project = schema.projects.find(projectId);

        if (!project) {
          return new Response(404, {}, { error: "Project not found" });
        }

        return project;
      });

      // Tours
      this.get("/projects/:projectId/tours", (schema, request) => {
        const projectId = request.params.projectId;
        const project = schema.projects.find(projectId);
        return project ? project.tours : [];
      });
      this.get("/projects/:projectId/tours/:tourId", (schema, request) => {
        const { projectId, tourId } = request.params;
        const tour = schema.tours.find(tourId);

        // Optionally verify tour belongs to project
        if (tour && tour.projectId === projectId) {
          return tour;
        }
        return new Response(404, {}, { error: "Tour not found" });
      });

      // Pois
      this.get("/projects/:projectId/tours/:tourId/pois", (schema, request) => {
        const { tourId } = request.params;
        const tour = schema.tours.find(tourId);
        return tour ? tour.pois : [];
      });
      this.get(
        "/projects/:projectId/tours/:tourId/pois/:poiId",
        (schema, request) => {
          const { poiId } = request.params;
          const poi = schema.pois.find(poiId);
          return poi || new Response(404, {}, { error: "POI not found" });
        },
      );

      // Library
      this.get("/projects/:projectId/library", (schema, request) => {
        const projectId = request.params.projectId;
        const library = schema.libraries.where({ projectId }).models[0];
        console.log(library);
        if (!library) {
          return new Response(
            404,
            {},
            { error: `Library of project ${projectId} not found` },
          );
        }
        return library.assets;
      });

      // Project Members
      this.get("/projects/:projectId/members", (schema, request) => {
        const projectId = request.params.projectId;
        const project = schema.projects.find(projectId);
        return project ? project.members : [];
      });
    },
  });
};
