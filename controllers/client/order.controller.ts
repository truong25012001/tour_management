import { generateOrderCode } from "../../helpers/generate";
import Order from "../../models/order.model";
import OrderItem from "../../models/order_item";
import Tour from "../../models/tour.model";
import {Request, Response} from "express";

// [POST] /order/
export const order = async (req: Request, res: Response) => {
	const data = req.body;

	// Lưu data vào bảng orders
	const dataOrder = {
		code: "OD00000030",
		fullName: data.info.fullName,
		phone: data.info.phone,
		note: data.info.note,
		status: "initial"
	};
	
	const order = await Order.create(dataOrder);
	const orderId = order.dataValues.id;
	const code = generateOrderCode(orderId);
	await Order.update({
		code: code
	}, {
		where: {
			id: orderId
		}
	})

	  // Lưu data vào bảng orders_item
	  for (const item of data.cart) {
		const dataItem = {
		  orderId: orderId,
		  tourId: item.tourId,
		  quantity: item.quantity
		};
	
		const infoTour = await Tour.findOne({
		  where: {
			id: item.tourId,
			deleted: false,
			status: "active"
		  },
		  raw: true
		});
	
		dataItem["price"] = infoTour["price"];
		dataItem["discount"] = infoTour["discount"];
		dataItem["timeStart"] = infoTour["timeStart"];
	
		await OrderItem.create(dataItem);
	  }


	res.json({
		code: 200,
		message: 'Đặt hàng thành công',
		orderCode: code
	})
}

// [GET] /order/success

export const success = async (req: Request, res: Response) => {

	const orderCode = req.query.orderCode;
	const order = await Order.findOne({
		where: {
			code: orderCode,
			deleted: false
		},
		raw: true
	})

	
	const ordersItem = await OrderItem.findAll({
		where: {
		  orderId: order["id"]
		},
		raw: true
	  });
	
	  for (const item of ordersItem) {
		item["price_special"] = item["price"] * (1 - item["discount"]/100);
		item["total"] = item["price_special"] * item["quantity"];
	
		const tourInfo = await Tour.findOne({
		  where: {
			id: item["tourId"]
		  },
		  raw: true
		});
	
		item["title"] = tourInfo["title"];
		item["slug"] = tourInfo["slug"];
		item["image"] = JSON.parse(tourInfo["images"])[0];
	  }
	
	  order["total_price"] = ordersItem.reduce((sum, item) => sum + item["total"], 0);
	res.render("client/pages/order/success", {
		pageTitle: "Đặt hàng thành công",
		ordersItem: ordersItem,
		order: order 
	})
}