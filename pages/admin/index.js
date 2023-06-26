import React,{useState,useEffect} from 'react';
import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";

const Index = ({logout}) => {
  const [data,setData] = useState({activities:[],saleData:[],deliveryData:[]})	
  useEffect(() => {
	 const fetchDashboardData = async() =>{
	  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/dashboard`,{
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			'authorization':JSON.parse(localStorage.getItem('myuser')).token
		},
		body: JSON.stringify({})
      });  
      res = await res.json();
	  setData({activities:res.activities,saleData:res.saleData,deliveryData:res.deliveryData}) 
    }
	fetchDashboardData();
  }, []);		
  return (
    <ThemeProvider theme={theme}>
	  <FullLayout logout={logout}>
		<Grid container spacing={0}>
		  <Grid item xs={12} lg={12}>
			<SalesOverview saleData={data.saleData} deliveryData={data.deliveryData}/>
		  </Grid>
		  {/* ------------------------- row 1 ------------------------- */}
		  <Grid item xs={12} lg={4}>
			<DailyActivity activities={data.activities}/>
		  </Grid>
		  <Grid item xs={12} lg={8}>
			<ProductPerfomance />
		  </Grid>
		  <Grid item xs={12} lg={12}>
			<BlogCard />
		  </Grid>
		</Grid>
	  </FullLayout>
	</ThemeProvider>  
  );
}
export default Index