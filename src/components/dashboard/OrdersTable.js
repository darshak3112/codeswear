import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from 'next/link'

const OrdersTable = ({orders}) => {
  const exportProduct = async (e) => {
	e.preventDefault();
	const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/exportorders`, {
	  method: "GET",
	  headers: {
		Accept:"application/vnd.ms-excel",
		"Content-Type":"application/vnd.ms-excel",
		'authorization':JSON.parse(localStorage.getItem('myuser')).token
	  },
	}).then(response =>response.blob())
	  .then((blob) =>{	  
	  const href = window.URL.createObjectURL(blob);	  
	  const link = document.createElement('a');
	  link.href = href;
	  //link.href = "/files/products.xlsx";
	  link.setAttribute(
		'download',
		`orders.xlsx`,
	  );
	  document.body.appendChild(link);
	  // Start download
	  link.click();
	  // Clean up and remove the link
	  link.parentNode.removeChild(link);
	  return response.json();
	}).catch((err => console.log(err)));
  };	 
  return (
    <BaseCard title="All Orders">
	  <Button onClick={exportProduct} variant="outlined" mt={2} mr={0}>
		Export
	  </Button>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                User Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Id / Txn Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Total
              </Typography>
            </TableCell>
			<TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
			<TableCell>
              <Typography color="textSecondary" variant="h6">
                Ordered At
              </Typography>
            </TableCell>
			<TableCell>
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                {order.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {order.orderId}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
					{order.tansactionId}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
			  <TableCell>
                <Typography variant="h6">{order.amount}</Typography>
              </TableCell>
			  <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: order.status == 'success' ? 'green' : 'red',
                    color: "#fff",
                  }}
                  size="small"
                  label={order.status}
                ></Chip>
              </TableCell>
			  <TableCell>
                <Typography variant="h6">{new Date(order.createdAt).toISOString().split('T')[0]}</Typography>
              </TableCell>
			  <TableCell>
                <Typography variant="h6"><Link href={'/order?id='+order._id}><Button variant="outlined">Deatils</Button></Link></Typography>
              </TableCell>
			  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default OrdersTable;
