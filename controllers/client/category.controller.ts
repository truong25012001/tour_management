import Category from "../../models/category.model";
import {Request, Response} from "express";

export const index = async (req: Request, res: Response) => {
	const categories = await Category.findAll({
		where: {
			status: 'active',
			deleted: false
		},
		raw: true
	});

	res.render("client/pages/categories/index", {
		pageTitle: "Danh sách tour",
		categories: categories
	})
}