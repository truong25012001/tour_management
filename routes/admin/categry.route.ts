import  {Router, Request, Response } from "express";
import * as controller from "../../controllers/admin/category.controller";
const router = Router();

router.get("/", controller.index);

export const categoryRouter: Router = router;