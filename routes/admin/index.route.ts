import {systemConfig} from "../../config/system";
import {Express} from "express";
import { categoryRouter } from "./categry.route";
import { tourRouter } from "./tour.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app: Express): void => {
	const pathAdmin = `/${systemConfig.prefixAdmin}`;
	app.use(`${pathAdmin}/categories`, categoryRouter);
	app.use(`${pathAdmin}/tours`, tourRouter);
	app.use(`${pathAdmin}/upload`, uploadRoutes);
}

export default adminRoutes;