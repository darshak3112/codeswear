import Order from '../../models/Order'
import connectDb from '../../middleware/mongoose'
import protectedMiddleware from '../../middleware/protected-middleware'
const excelJS = require("exceljs");
import fs from 'fs'
import path from 'path'

const filePath = path.resolve('.', 'files/orders.xlsx')
const imageBuffer = fs.readFileSync(filePath)

const handler = async(req,res) =>{
	protectedMiddleware(req,res)
	let orders = await Order.find();
	const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
    const path = "./files";  // Path to download excel
	// Column for data in excel. key must match data key
	worksheet.columns = [
		{ header: "S no.", key: "s_no", width: 10 }, 
		{ header: "Email", key: "email", width: 10 },
		{ header: "Order Id", key: "orderId", width: 10 },
		{ header: "Tansaction Id", key: "tansactionId", width: 10 },
		{ header: "Amount", key: "amount", width: 10 },
		{ header: "Status", key: "status", width: 10 },
	];
	// Looping through order data
	let counter = 1;
	orders.forEach((order) => {
	  order.s_no = counter;
	  worksheet.addRow(order); // Add data in worksheet
	  counter++;
	});
	// Making first line in excel bold
	worksheet.getRow(1).eachCell((cell) => {
	  cell.font = { bold: true };
	});
	try {
	  const data = await workbook.xlsx.writeFile(`${path}/orders.xlsx`)
	   .then(() => {
		   res.setHeader('Content-Type', 'application/vnd.ms-excel')
		   res.send(imageBuffer)
		 /*res.send({
		   status: "success",
		   message: "file successfully downloaded",
		   path: `${process.env.NEXT_PUBLIC_HOST}/files/products.xlsx`,
		  });*/
	   });
	} catch (err) {
		res.send({
		status: "error",
		error: err,
	  });
    }
}
export default connectDb(handler);