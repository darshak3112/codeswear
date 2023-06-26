import React,{useState} from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid, Pagination,PaginationItem, Stack } from "@mui/material";
import ProductsTable from "../../src/components/dashboard/ProductsTable";
const mongoose = require('mongoose');
import Product from '../../models/Product'

const AllProducts = ({products,pages,page,logout}) => {
  const router = useRouter();
  //const [page,setPage] = useState(router.query.page ? router.query.page : 1)
  const handleChange = (event,value) =>{
	  //setPage(value);
	  router.push('/admin/allproducts?page='+value)
  }  
  return (
    <ThemeProvider theme={theme}>
	  <FullLayout logout={logout}>
		<Grid container spacing={0}>
		  <Grid item xs={12} lg={12}>
			<ProductsTable products={products}/>
			<Pagination count={parseInt(pages)} page={parseInt(page)} onChange={handleChange} color="primary" />
		  </Grid>
		</Grid>
	  </FullLayout>
	</ThemeProvider>
  )	
}

export default AllProducts

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState) {
    const con = await mongoose.connect(process.env.MONGO_URI)
  }
  //console.log(`MongoDB Connected : ${con.connection.host}`)
  let page = context.query.page ? context.query.page : 1;
  let pageSize = 5;
  
  let products = await Product.find({}).skip((page - 1) * pageSize).limit(pageSize);
  let count = await Product.count()
  let pages = Math.ceil(count/pageSize);
  
  return {
    props: {products:JSON.parse(JSON.stringify(products)),pages:pages,page:page}, // will be passed to the page component as props
  }
}