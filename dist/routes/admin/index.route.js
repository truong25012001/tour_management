"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const categry_route_1 = require("./categry.route");
const tour_route_1 = require("./tour.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const pathAdmin = `/${system_1.systemConfig.prefixAdmin}`;
    app.use(`${pathAdmin}/categories`, categry_route_1.categoryRouter);
    app.use(`${pathAdmin}/tours`, tour_route_1.tourRouter);
    app.use(`${pathAdmin}/upload`, upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
