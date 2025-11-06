import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from "miragejs";

import { isLocalesValue } from "@/utils/inputLocale";
import normalizeRelationships from "./helpers/normalizeRelationships";
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

    // Handle POI assets transformation
    data = this.transformPoiAssets(data);

    return data;
  },
  transformPoiAssets(data) {
    // Handle single POI
    if (data && data.poiAssets) {
      data.assets = data.poiAssets;
      delete data.poiAssets;
    }

    // Handle array of POIs (like when getting tour with POIs)
    if (Array.isArray(data)) {
      return data.map((item) => this.transformPoiAssets(item));
    }

    // Handle nested POIs in tours
    if (data && data.pois && Array.isArray(data.pois)) {
      data.pois = data.pois.map((poi) => this.transformPoiAssets(poi));
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
        if (isLocalesValue(value)) {
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

        // serialize() {
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
        const threeDAssets = getRandomPoiAssets(assets, "3d", 1, 2);
        const documentAssets = getRandomPoiAssets(assets, "text", 0, 2);

        const selectedPoiAssets = [
          ...imageAssets,
          ...videoAssets,
          ...threeDAssets,
          ...documentAssets,
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

      // Assign random pois to each tour and compute boundBox from selected pois
      server.db.tours.forEach((tour) => {
        const pois = server.db.pois;
        const selectedPois = getRandomItems(pois, 5, 10);
        const poiIds = selectedPois.map((poi) => poi.id);
        const boundBox = computeBoundBoxFromPois(selectedPois);

        // Optionally set the tour coordinates to the center of the bound box
        let center = null;
        if (boundBox) {
          center = {
            lat: (boundBox[0].lat + boundBox[1].lat) / 2,
            long: (boundBox[0].long + boundBox[1].long) / 2,
          };
        }

        server.db.tours.update(tour.id, {
          poiIds: poiIds,
          boundBox: boundBox,
          coordinates: center || tour.coordinates,
        });
      });

      // Assign tours to projects
      server.db.projects.forEach((project) => {
        const tours = server.db.tours;
        const selectedTours = getRandomItems(tours, 2, 5);
        const tourIds = selectedTours.map((tour) => tour.id);

        // Update project with tour IDs
        server.db.projects.update(project.id, { tourIds });

        // Update each tour with the project ID
        selectedTours.forEach((tour) => {
          server.db.tours.update(tour.id, { projectId: project.id });
        });
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

      // Passthrough for external assets (GLB, images, PDFs, etc.)
      this.passthrough((request) => request.url.startsWith("https://"));
      // this.passthrough((request) => request.url.startsWith("http://"));

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
        const { tourId } = request.params;
        const tour = schema.tours.find(tourId);

        // Optionally verify tour belongs to project
        if (!tour) {
          return new Response(404, {}, { error: "Tour not found" });
        }
        return tour;
      });
      // Create a new tour under a project
      this.post("/projects/:projectId/tours", (schema, request) => {
        const projectId = request.params.projectId;
        const attrs = JSON.parse(request.requestBody);
        attrs.projectId = projectId;
        const tour = schema.tours.create(attrs);
        // const project = schema.projects.find(projectId);
        // if (project) {
        //   project.tourIds = [...(project.tourIds || []), tour.id];
        //   project.save();
        // }
        return tour;
      });
      // Update an existing tour
      this.put("/projects/:projectId/tours/:tourId", (schema, request) => {
        const { tourId } = request.params;
        const attrs = JSON.parse(request.requestBody);
        const normalizedAttrs = normalizeRelationships(attrs, ["pois"]);

        let tour = schema.tours.find(tourId);
        if (!tour) {
          return new Response(404, {}, { error: "Tour not found" });
        }
        // Optionally ensure the tour belongs to the project
        // ...

        tour.update(normalizedAttrs);
        return tour;
      });
      // Delete a tour
      this.delete("/projects/:projectId/tours/:tourId", (schema, request) => {
        const { projectId, tourId } = request.params;
        const tour = schema.tours.find(tourId);
        if (!tour) {
          return new Response(404, {}, { error: "Tour not found" });
        }
        // Optionally ensure the tour belongs to the project
        if (tour.projectId !== projectId) {
          return new Response(
            400,
            {},
            { error: "Tour does not belong to project" },
          );
        }
        // Remove tour from project's tourIds
        const project = schema.projects.find(projectId);
        if (project && Array.isArray(project.tourIds)) {
          project.tourIds = project.tourIds.filter((id) => id !== tourId);
          project.save();
        }
        tour.destroy();
        return new Response(204);
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
      // Create a new POI under a tour
      this.post(
        "/projects/:projectId/tours/:tourId/pois",
        (schema, request) => {
          const { tourId } = request.params;
          const attrs = JSON.parse(request.requestBody);
          attrs.tourId = tourId;
          const poi = schema.pois.create(attrs);
          // Add POI to tour
          const tour = schema.tours.find(tourId);
          if (tour) {
            tour.poiIds = [...(tour.poiIds || []), poi.id];
            tour.save();
          }
          return poi;
        },
      );
      // Update an existing POI
      this.put(
        "/projects/:projectId/tours/:tourId/pois/:poiId",
        (schema, request) => {
          const { tourId, poiId } = request.params;
          const attrs = JSON.parse(request.requestBody);
          // const normalizedAttrs = normalizeRelationships(attrs, ["pois"]);
          let poi = schema.pois.find(poiId);
          if (!poi) {
            return new Response(404, {}, { error: "POI not found" });
          }
          // Optionally ensure the POI belongs to the tour
          if (poi.tourId !== tourId) {
            return new Response(
              400,
              {},
              { error: "POI does not belong to tour" },
            );
          }
          poi.update(attrs);
          return poi;
        },
      );
      // Delete a POI
      this.delete(
        "/projects/:projectId/tours/:tourId/pois/:poiId",
        (schema, request) => {
          const { tourId, poiId } = request.params;
          const poi = schema.pois.find(poiId);
          if (!poi) {
            return new Response(404, {}, { error: "POI not found" });
          }
          // Optionally ensure the POI belongs to the tour
          if (poi.tourId !== tourId) {
            return new Response(
              400,
              {},
              { error: "POI does not belong to tour" },
            );
          }
          // Remove POI from tour's poiIds
          const tour = schema.tours.find(tourId);
          if (tour && Array.isArray(tour.poiIds)) {
            tour.poiIds = tour.poiIds.filter((id) => id !== poiId);
            tour.save();
          }
          poi.destroy();
          return new Response(204);
        },
      );

      // POI Assets CRUD
      // Get all assets for a POI
      this.get(
        "/projects/:projectId/tours/:tourId/pois/:poiId/assets",
        (schema, request) => {
          const { poiId } = request.params;
          const poi = schema.pois.find(poiId);
          return poi ? poi.poiAssets : [];
        },
      );

      // Get one asset for a POI
      this.get(
        "/projects/:projectId/tours/:tourId/pois/:poiId/assets/:assetId",
        (schema, request) => {
          const { assetId } = request.params;
          const poiAsset = schema.poiAssets.find(assetId);
          return (
            poiAsset || new Response(404, {}, { error: "POI Asset not found" })
          );
        },
      );

      // Create a new POI Asset for a POI
      this.post(
        "/projects/:projectId/tours/:tourId/pois/:poiId/assets",
        (schema, request) => {
          const { poiId } = request.params;
          const attrs = JSON.parse(request.requestBody);
          attrs.poiId = poiId;
          const poiAsset = schema.poiAssets.create(attrs);
          return poiAsset;
        },
      );

      // Update an existing POI Asset
      this.put(
        "/projects/:projectId/tours/:tourId/pois/:poiId/assets/:assetId",
        (schema, request) => {
          const { assetId } = request.params;
          const attrs = JSON.parse(request.requestBody);
          let poiAsset = schema.poiAssets.find(assetId);
          if (!poiAsset) {
            return new Response(404, {}, { error: "POI Asset not found" });
          }
          poiAsset.update(attrs);
          return poiAsset;
        },
      );

      // Delete a POI Asset
      this.delete(
        "/projects/:projectId/tours/:tourId/pois/:poiId/assets/:assetId",
        (schema, request) => {
          const { assetId, poiId } = request.params;
          const poiAsset = schema.poiAssets.find(assetId);
          if (!poiAsset) {
            return new Response(404, {}, { error: "POI Asset not found" });
          }
          // Optionally ensure the POI Asset belongs to the POI
          if (poiAsset.poiId !== poiId) {
            return new Response(
              400,
              {},
              { error: "POI Asset does not belong to POI" },
            );
          }
          // Remove POI Asset from POI's poiAssetIds
          const poi = schema.pois.find(poiId);
          if (poi && Array.isArray(poi.poiAssetIds)) {
            poi.poiAssetIds = poi.poiAssetIds.filter((id) => id !== assetId);
            poi.save();
          }
          poiAsset.destroy();
          return new Response(204);
        },
      );

      // Library
      this.get("/projects/:projectId/library", (schema, request) => {
        const projectId = request.params.projectId;
        const library = schema.libraries.where({ projectId }).models[0];

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

// Helper: compute bounding box from an array of poi objects
function computeBoundBoxFromPois(pois) {
  if (!pois || pois.length === 0) return null;
  let minLat = Infinity;
  let minLong = Infinity;
  let maxLat = -Infinity;
  let maxLong = -Infinity;

  pois.forEach((p) => {
    const lat = p.coordinates?.lat ?? p.lat ?? 0;
    const long = p.coordinates?.long ?? p.long ?? 0;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (long < minLong) minLong = long;
    if (long > maxLong) maxLong = long;
  });

  return [
    { lat: minLat, long: minLong }, // southwest
    { lat: maxLat, long: maxLong }, // northeast
  ];
}
