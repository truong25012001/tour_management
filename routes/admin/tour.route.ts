import  {Router, Request, Response } from "express";
import * as controller from "../../controllers/admin/tour.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import multer from 'multer';
const upload = multer();
const router: Router = Router();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
	"/create", 
	upload.fields([
		{ name: 'images', maxCount: 10 }
	]),
	uploadCloud.uploadFields,
	controller.createPost
);

export const tourRouter: Router = router;