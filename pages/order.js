import React,{useEffect} from 'react';
import { useRouter } from 'next/router';
const mongoose = require('mongoose');
import Order from '../models/Order';

const OrderDetail = ({order,user,clearCart,toastShow}) => {
  const router = useRouter()
  const products = order.products;
  
  useEffect(() => {
	  if(router.query.cartClear && router.query.cartClear == 1) {
		  clearCart();
	  }
  }, [router]);
	
  const deliverHandler = async(id) =>{
	const res = await fetch("/api/orderdeliver",{
      method: 'POST',
      headers: { 
		'Content-Type': 'application/json',
		'authorization':user.token
	  },
      body: JSON.stringify({id:id})
    });  
    const response = await res.json();
	if(response.success) {
		toastShow('success',response.success)
		router.push('/order?id='+id)
	} else {
		toastShow('error',response.error)
	}
  }  
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.com</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID : #{order.orderId}</h1>
			<h3 className="text-gray-900 text-2xl title-font font-medium mb-4">Order At : {new Date(order.createdAt).toISOString().split('T')[0]}</h3>
            <p className="leading-relaxed mb-4">Your order has been placed successfully. Your payment status is : <b>{order.status}</b></p>
            <div className="flex mb-4">
              <a className="flex-grow border-gray-300 py-2 text-lg px-1">Item Description</a>
              <a className="flex-grow border-gray-300 py-2 text-lg px-1">Qty</a>
              <a className="flex-grow border-gray-300 py-2 text-lg px-1">Price</a>
            </div>
			{Object.keys(products).map((key)=>{
				return <div key={key} className="flex border-t border-gray-200 py-2">
					<span className="text-gray-500">{products[key].name} ({products[key].variant}/{products[key].size})</span>
				  <span className="m-auto text-gray-500">{products[key].qty}</span>
				  <span className="m-auto text-gray-900">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}</span>
				</div>
			})}
            <div className="flex flex-col">
              <span className="title-font font-medium text-2xl text-gray-900">SubTotal : ₹{order.amount}</span>
              <div className='my-4'>
                <button className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
              </div>
            </div>
			<div className="flex flex-col">
              <span className="title-font font-medium text-2xl text-gray-900">Delivery Status : {order.deliveryStatus}</span>
			  {user && user.role && user.role == 'admin' && order.deliveryStatus != 'delivered' && order.status == 'success' &&
			  <div className='my-4'>
                <button onClick={()=>{deliverHandler(order._id)}}className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Mark As Delivered</button>
              </div>}
			  
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState) {
    const con = await mongoose.connect(process.env.MONGO_URI)
  }
  let order = await Order.findById(context.query.id);
  if(order == null) {
	return {
      notFound: true
    }
  }
  return {
    props: {order:JSON.parse(JSON.stringify(order))}, // will be passed to the page component as props
  }
}

export default OrderDetail