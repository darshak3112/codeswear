import React from 'react'
import { useEffect,useState } from 'react';
import {useRouter} from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = ({user,toastShow}) => {
  const router = useRouter();
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [npassword, setNpassword] = useState('')
  
  // handleChange
  const handleChange = async(e) =>{
    if(e.target.name == 'name') {
      setName(e.target.value)
    } else if(e.target.name == 'email') {
      setEmail(e.target.value)
    } else if(e.target.name == 'phone') {
      setPhone(e.target.value)
    } else if(e.target.name == 'address') {
      setAddress(e.target.value)
    } else if(e.target.name == 'pincode') {
      setPincode(e.target.value);
    } else if(e.target.name == 'password') {
      setPassword(e.target.value);
    } else if(e.target.name == 'cpassword') {
      setCpassword(e.target.value);
    } else if(e.target.name == 'npassword') {
      setNpassword(e.target.value);
    }
  }
  
  // check not login
  useEffect(() => {  
	const fetchUserData = async() =>{
	  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({token:JSON.parse(localStorage.getItem('myuser')).token})
     });  
     res = await res.json();
	 const userData = res.data;
	 setName(userData.name)
 	 setPhone(userData.phone)
	 setAddress(userData.address)
	 setPincode(userData.pincode)
	}
	if(!localStorage.getItem('myuser')) {
	  router.push('/login')
    } else {
		fetchUserData();
	}
  }, [router])
  
  // update user data
  const updateUserData = async() =>{
	const updatedData = {token:JSON.parse(localStorage.getItem('myuser')).token,name,phone,address,pincode};
	let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,{
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(updatedData)
	});  
	response = await response.json();
	document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
	if(response.success) {
	  toastShow('success',response.success);
      router.push('/account')		
	} else if(response.errors)  {
	  toastShow('errors',response.errors);
	} else {
	  toastShow('erorr',response.error);		 
	}
  }
  
  // update user password
  const updateUserPassword = async() =>{
	const passwordData = {token:JSON.parse(localStorage.getItem('myuser')).token,password,cpassword,npassword};
	let resPass = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,{
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(passwordData)
	});  
	resPass = await resPass.json();
	document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
	if(resPass.success) {
	  setPassword('')
	  setCpassword('')
	  setNpassword('')
	  toastShow('success',resPass.success);
      router.push('/account')		
	} else if(resPass.errors)  {
	  toastShow('errros',resPass.errors);
	} else {
	  toastShow('erorr',resPass.error);		 
	}
  }
  
  return (
    <div className='container mx-auto my-10'>
	  <ToastContainer 
          position='bottom-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/> 
      <h1 className='text-3xl font-bold text-center'>Update Your Account</h1>
	  <h2 className='font-semibold text-xl'>1. Delivery Address</h2>
      <div className='mx-auto flex'>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" onChange={handleChange} value={name} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className='help-block error_name'></span>
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Email</label>
            {user && user.email ?
			<input type="email" onChange={handleChange} value={user.email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly/>
			: <input type="email" onChange={handleChange} value={email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			}
			<span className='help-block error_email'></span>
          </div>
        </div>
      </div>
      <div className='px-2 w-full'>
        <div className="relative mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" onChange={handleChange} value={address} name="address" rows="2" cols="30" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
		  <span className='help-block error_address'></span>
        </div>
      </div>
      <div className='mx-auto flex'>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" onChange={handleChange} value={phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className='help-block error_phone'></span>
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" onChange={handleChange} value={pincode} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className='help-block error_pincode'></span>
          </div>
        </div>
      </div>
	  <button onClick={updateUserData} className="m-2 disabled:bg-pink-300 flex text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Update Deatils</button>
	  <h2 className='font-semibold text-xl'>2. Change Password</h2>
      <div className='mx-auto flex'>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Old Password</label>
            <input type="password" onChange={handleChange} value={password} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className='help-block error_password'></span>
          </div>
        </div>
		<div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
            <input type="password" onChange={handleChange} value={npassword} id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className='help-block error_npassword'></span>
          </div>
        </div>
		<div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
            <input type="password" onChange={handleChange} value={cpassword} id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className='help-block error_cpassword'></span>
          </div>
        </div>
	  </div>
	  <button onClick={updateUserPassword} className="m-2 disabled:bg-pink-300 flex text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Update Password</button>	  
    </div>  
  )
}

export default Account