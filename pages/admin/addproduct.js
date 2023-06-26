import React,{useState} from 'react'
import { Router, useRouter } from 'next/router'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import Alert from '@mui/material/Alert';
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const AddProduct = ({logout,toastShow}) => {
  const router = useRouter();	
  const [form,setForm] = useState({})
  const [error,setError] = useState({})
  
  // handleChange
  const handleChange =(e)=>{
	  setForm({
		...form,
	    [e.target.name]:e.target.value		
	  })
	  console.log(form)
  }
  // handleSubmit
  const handleSubmit = async(e) =>{
	e.preventDefault();
	let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`,{
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			'authorization':JSON.parse(localStorage.getItem('myuser')).token
		},
		body: JSON.stringify({data:[form]})
    });  
    res = await res.json();
	setError({})
	if(res.success) {
		toastShow('success',res.success);
		router.push('/admin/allproducts');
		//setForm({})
	} else if(res.errors) {
		let errors = res.errors;
		console.log('errors',errors)
		{errors.forEach(val => {
			console.log('val',val);
			if(val.param.includes("data[0].")) {
				let key_new = val.param.replaceAll('data[0].', '');									
				console.log('key_new',key_new);
				setError((error)=>{
					return {...error,[key_new]:val.msg}
				})
				
			} else {
				setError((error)=>{
					return {...error,[val.param]:val.msg}
				})
			}	
		});}	
		console.log('form error',error)
	} else {
		toastShow('error',res.error);
	}
  }
  return (
    <ThemeProvider theme={theme}>
	  <FullLayout logout={logout}>
		<Grid container spacing={0}>
		  <Grid item xs={12} lg={12}>
			<BaseCard title="Add Product">
			  <div id="form_error">
				
			  </div>
			  <Stack spacing={3}>
				<TextField onChange={handleChange} value={form.title ? form.title : ''} name="title" label="Title" variant="outlined" helperText={error.title ? error.title : ''}/>
				<TextField onChange={handleChange} value={form.slug ? form.slug : ''} name="slug" label="Slug" variant="outlined" helperText={error.slug  ? error.slug : ''}/>
				<TextField onChange={handleChange} value={form.category ? form.category : ''} name="category" label="Category" variant="outlined" helperText={error.category ? error.category : ''}/>
				<TextField onChange={handleChange} value={form.price ? form.price : ''} name="price" label="Price" variant="outlined" helperText={error.price ? error.price : ''}/>
				<TextField onChange={handleChange} value={form.availableQty ? form.availableQty : ''} name="availableQty" label="Available Qty" variant="outlined" helperText={error.availableQty ? error.availableQty : ''}/>
				<TextField onChange={handleChange} value={form.size ? form.size : ''} name="size" label="Size" variant="outlined" helperText={error.size ? error.size : ''}/>
				<TextField onChange={handleChange} value={form.color ? form.color : ''} name="color" label="Color" variant="outlined" helperText={error.color ? error.color : ''}/>
				<TextField onChange={handleChange}
				  value={form.desc ? form.desc : ''} name="desc"
				  label="Description"
				  multiline
				  rows={4}
				  error
				  helperText={error.desc ? error.desc : ''} className="error_desc"
				/>
			  </Stack>
			  <br />
			  <Button onClick={handleSubmit} variant="outlined" mt={2}>
				Submit
			  </Button>
			</BaseCard>
		  </Grid>
		</Grid>
	  </FullLayout>
	</ThemeProvider>
  )	
}

export default AddProduct