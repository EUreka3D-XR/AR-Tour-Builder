import { belongsTo, hasMany, Model, RestSerializer } from "miragejs";
import { createServer } from "miragejs/server";

import { getMockAssets } from "../mocks/assetsMocks";
import { mockPOIs } from "../mocks/poisMocks";
import { mockProjects } from "../mocks/projectsMocks";
import { mockTours } from "../mocks/toursMocks";
import { mockUsers } from "../mocks/usersMocks";
import { getRandomItems, getRandomPoiAssets } from "./helpers/randomizers";

export const makeServer = ({ environment = "development" } = {}) => {
  return createServer({
    environment,
    models: {
      users: Model,
      project: Model.extend({
        members: hasMany("users"),
        tours: hasMany(),
      }),
      library: Model.extend({
        project: belongsTo(),
        assets: hasMany(),
      }),
      tour: Model.extend({
        project: belongsTo(),
        pois: hasMany(),
      }),
      poi: Model.extend({
        tour: belongsTo(),
        poiAssets: hasMany(),
      }),
      asset: Model.extend({
        library: hasMany(),
        poiAsset: hasMany(),
      }),
      poiAsset: Model.extend({
        poi: belongsTo(),
        asset: belongsTo(),
      }),
    },
    serializers: {
      application: RestSerializer,
      project: RestSerializer.extend({
        include: ["tours", "assets"],
        embed: true, // embed tours + assets instead of IDs
      }),
      tour: RestSerializer.extend({
        include: ["pois"],
        embed: true,
      }),
      poi: RestSerializer.extend({
        include: ["poiAssets"],
        embed: true,

        // serialize(resource, request) {
        //   let json = RestSerializer.prototype.serialize.apply(this, arguments);

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
      poiAsset: RestSerializer.extend({
        include: ["asset"],
        embed: true,
      }),
    },

    seeds(server) {
      // 1. Create users first (no dependencies)
      mockUsers.forEach((user) => {
        server.create("users", user);
      });

      // 2. Create assets (no dependencies)
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
        server.db.pois.update(poi.id, { assets: poiAssetIds });
      });

      // Assign random pois to each tour
      server.db.tours.forEach((tour) => {
        const pois = server.db.pois;
        const selectedPois = getRandomItems(pois, 5, 10);
        const poiIds = selectedPois.map((poi) => poi.id);
        server.db.tours.update(tour.id, { pois: poiIds });
      });

      // Assign tours to projects
      server.db.projects.forEach((project) => {
        const tours = server.db.tours;
        const selectedTours = getRandomItems(tours, 2, 5);
        const tourIds = selectedTours.map((tour) => tour.id);
        server.db.projects.update(project.id, { tours: tourIds });
      });

      // Create and assign a library for each project, which will contain all assets for more easy handling
      server.db.projects.forEach((project) => {
        server.create("library", {
          projectId: project.id,
          assets: server.db.assets.map((asset) => asset.id),
        });
      });
    },
    routes() {
      this.namespace = "api";

      this.get("/projects");
      this.get("/projects/:projectId");
      this.get("/projects/:projectId/tours");
      this.get("/projects/:projectId/tours/:tourId");
      this.get("/projects/:projectId/tours/:tourId/pois");
      this.get("/projects/:projectId/tours/:tourId/pois/:poiId");
    },
  });
};
