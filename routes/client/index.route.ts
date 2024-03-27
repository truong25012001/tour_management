import {Express} from "express";
import { tourRouter } from "./tour.route";
import { categoryRouter } from "./category.route";
import { cartRouter } from "./cart.route";
import { orderRouter } from "./order.route";

const clientRoutes = (app: Express): void => {
	app.use("/tours", tourRouter);
	app.use("/categories", categoryRouter);
	app.use("/cart", cartRouter);
	app.use("/order", orderRouter);
}

export default clientRoutes;