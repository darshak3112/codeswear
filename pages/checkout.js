import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import {BsFillCartCheckFill} from 'react-icons/bs';
import Head from 'next/head'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkout = ({user,cart,addToCart,removeFromCart,clearCart,subTotal,toastShow}) => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [sdkReady,setSdkReady] = useState(false)
  
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
	  if(e.target.value.length == 6) {
		getCityState(e.target.value);  
      } else {
		setCity('');
		setState('')  
	  }		
    }
	// set disabled false
	if(name && email && phone && address && pincode) {
		setDisabled(false)
	}
  }
  const getCityState = async(pin) => {
	let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
	let pinJson = await pins.json();
	if(Object.keys(pinJson).includes(pin)) {
	  setCity(pinJson[pin][0]);
	  setState(pinJson[pin][1])
	} else {
	  setCity('')
	  setState('')  
	}
  }
  useEffect(() => {
	const fetchUserData = async() =>{
	  const res = await fetch('/api/getuser',{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({token:JSON.parse(localStorage.getItem('myuser')).token})
     });  
     res = await res.json();
	 const userData = res.data;
	 setName(userData.name)
	 setEmail(userData.email)
 	 setPhone(userData.phone)
	 setAddress(userData.address)
	 setPincode(userData.pincode)
	 getCityState(userData.pincode)
	 // set disabled false
	 if(name && email && phone && address && pincode) {
		setDisabled(false)
	 }
	}
	if(localStorage.getItem('myuser')) {
	  fetchUserData();
	}
  }, []); 
	
  
  const checkoutPayment = async(e)=>{
	e.preventDefault();  
	let oid = Math.floor(Math.random() * Date.now())
	const data = {cart,subTotal,oid,name,email,phone,address,pincode};
	const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(data)
	});  
	const txnRes = await res.json();
	document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
	if(txnRes.success) {
	   let txnToken = txnRes.txnToken;
	   var config = {
		  "root": "",
		  "flow": "DEFAULT",
		  "data": {
			"orderId": oid, 
			"token": txnToken,
			"tokenType": "TXN_TOKEN",
			"amount": subTotal 
		  },
		  "handler": {
			"notifyMerchant": function(eventName,data){
			 console.log("notifyMerchant handler function called");
			 console.log("eventName => ",eventName);
			 console.log("data => ",data);
		   }
		 }
		};
		if(window.Paytm && window.Paytm.CheckoutJS){
			console.log('if window Paytm');
			window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
			  console.log('if window Paytm init success');	
			  window.Paytm.CheckoutJS.invoke();
			}).catch(function onError(error){
			  console.log("error => ",error);
			});
		}	
	} else if(txnRes.errors) {
		toastShow('errors',txnRes.errors);
	} else {
		toastShow('error',txnRes.error);
		// clear cart if txn token generate err
		if(txnRes.cartClear) {
			clearCart();
		}
	}	
  }
  return (
    <div className='container sm:m-auto px-2'>
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
	  <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
	  </Head>
	  <Script type="text/javascript" crossorigin="anonymous" src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}/>
	  <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Address</h2>
      <div className='mx-auto flex'>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" onChange={handleChange} value={name} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className="help-block error_name"></span>
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" onChange={handleChange} value={email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className="help-block error_email"></span>
          </div>
        </div>
      </div>
      <div className='px-2 w-full'>
        <div className="relative mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" onChange={handleChange} value={address} name="address" rows="2" cols="30" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
		  <span className="help-block error_address"></span>
        </div>
      </div>
      <div className='mx-auto flex'>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" onChange={handleChange} value={phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className="help-block error_phone"></span>
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" onChange={handleChange} value={pincode} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
			<span className="help-block error_pincode"></span>
          </div>
        </div>
      </div>
      <div className='mx-auto flex'>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" onChange={handleChange} value={state} id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="relative mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" onChange={handleChange} value={city} id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl'>2. Review the cart & pay</h2>
      <div className="sideCart bg-pink-100 p-6 m-2">
        {Object.keys(cart.length == 0) && <div className='my-4 font-semibold'>Your cart is empty!</div>}
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).map((k)=>{
            return <li key={k}>
                    <div className='item flex my-3'>
                      <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                        <AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-500'/> 
                        <span className='mx-2 text-sm'>{cart[k].qty}</span> 
                        <AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-500'/>
                      </div>
                    </div>
                  </li>
          })}
        </ol>
        <span className='font-bold'>Subtotal : ₹{subTotal}</span>
      </div>
      <div className='mx-6'>
        <Link href={'/checkout'}><button disabled={disabled} onClick={checkoutPayment} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillCartCheckFill className='m-1'/>Pay ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default Checkout