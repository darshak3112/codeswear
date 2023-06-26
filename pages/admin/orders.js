import React,{useState} from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid, Pagination,PaginationItem, Stack } from "@mui/material";
import OrdersTable from "../../src/components/dashboard/OrdersTable";
const mongoose = require('mongoose');
import Order from '../../models/Order'

const Orders = ({orders,pages,page,logout}) => {
  const router = useRouter();
  //const [page,setPage] = useState(router.query.page ? router.query.page : 1)
  const handleChange = (event,value) =>{
	  //setPage(value);
	  router.push('/admin/orders?page='+value)
  }  
  return (
    <ThemeProvider theme={theme}>
	  <FullLayout logout={logout}>
		<Grid container spacing={0}>
		  <Grid item xs={12} lg={12}>
			<OrdersTable orders={orders}/>
			<Pagination count={parseInt(pages)} page={parseInt(page)} onChange={handleChange} color="primary" />    
		  </Grid>
		</Grid>
	  </FullLayout>
	</ThemeProvider>
  )	
}

export default Orders

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState) {
    const con = await mongoose.connect(process.env.MONGO_URI)
  }
  //console.log(`MongoDB Connected : ${con.connection.host}`)
  let page = context.query.page ? context.query.page : 1;
  let pageSize = 5;
  
  let orders = await Order.find({}).skip((page - 1) * pageSize).limit(pageSize);
  let count = await Order.count()
  let pages = Math.ceil(count/pageSize);
  
  return {
    props: {orders:JSON.parse(JSON.stringify(orders)),pages:pages,page:page}, // will be passed to the page component as props
  }
}