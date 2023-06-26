import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import UsersTable from "../../src/components/dashboard/UsersTable";
const mongoose = require('mongoose');
import User from '../../models/User'

const Users = ({users,logout}) => {
  return (
    <ThemeProvider theme={theme}>
	  <FullLayout logout={logout}>
		<Grid container spacing={0}>
		  <Grid item xs={12} lg={12}>
			<UsersTable users={users}/>
		  </Grid>
		</Grid>
	  </FullLayout>
	</ThemeProvider>
  )	
}

export default Users

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState) {
    const con = await mongoose.connect(process.env.MONGO_URI)
  }
  //console.log(`MongoDB Connected : ${con.connection.host}`)
  let users = await User.find();
  
  return {
    props: {users:JSON.parse(JSON.stringify(users))}, // will be passed to the page component as props
  }
}