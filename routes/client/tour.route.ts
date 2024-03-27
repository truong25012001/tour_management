import  {Router, Request, Response } from "express";
import * as controller from "../../controllers/client/tour.controller";
const router = Router();

router.get("/:slugCategory", controller.index);
router.get("/detail/:slugTour", controller.detail);

export const tourRouter: Router = router;