import React from "react";
import Link from 'next/link'
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

const ProductsTable = ({products}) => {
  const exportProduct = async (e) => {
	e.preventDefault();
	const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/exportproducts`, {
	  method: "GET",
	  headers: {
		Accept:"application/vnd.ms-excel",
		"Content-Type":"application/vnd.ms-excel",
		'authorization':JSON.parse(localStorage.getItem('myuser')).token
	  },
	}).then(response =>response.blob())
	  .then((blob) =>{
	  console.log('blob',blob)	  
	  const href = window.URL.createObjectURL(blob);	  
	  const link = document.createElement('a');
	  link.href = href;
	  //link.href = "/files/products.xlsx";
	  link.setAttribute(
		'download',
		`products.xlsx`,
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
    <BaseCard title="All Products">
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
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Slug
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Size/Color
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
			<TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
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
                      {product.slug}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.img && <img src={product.img} style={{height:'50px'}}/>}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.category}
                </Typography>
              </TableCell>
              <TableCell>
			    {product.size} / 
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
					ml: "4px",
                    backgroundColor: product.color,
                    color: "#fff",
                  }}
                  size="small"
                  label={product.color}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{product.price}</Typography>
              </TableCell>
			  <TableCell align="right">
                <Link href={'/admin/editproduct?id='+product._id}>Edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default ProductsTable;
