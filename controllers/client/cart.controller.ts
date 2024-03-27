import Tour from "../../models/tour.model";
import {Request, Response} from "express";


export const index = async (req: Request, res: Response) => {
	res.render("client/pages/cart/index", {
		pageTitle: "Giỏ hàng"
	});
}

// [POST] /cart/list-json
export const listJson = async (req: Request, res: Response) => {
	const tours = req.body;
	console.log(tours);

	
	for (const tour of tours) {
	  const infoTour = await Tour.findOne({
		where: {
		  id: tour.tourId,
		  deleted: false,
		  status: "active"
		},
		raw: true
	  });
  
	  tour["info"] = infoTour;
  
	  tour["image"] = JSON.parse(infoTour["images"])[0];
  
	  tour["price_special"] = infoTour["price"] * (1 - infoTour["discount"]/100);
  
	  tour["total"] = tour["price_special"] * tour["quantity"];
	}
  
	res.json({
	  tours: tours
	});
  };