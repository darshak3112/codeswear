import React from 'react'
import { useEffect,useState } from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([])
  const [totalResults,setTotalResults] = useState(0)
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  //const [orders,setOrders] = useState([])
  // check not login
  useEffect(() => { 
	if(!localStorage.getItem('myuser')) {
	  router.push('/login')
    } else {
		fetchOrders(page);
	}
  }, [router,page])
  
  const fetchOrders = async(page) =>{
	 console.log('page',page) 
	 const res = await fetch(`/api/myorders?page=${page}&pageSize=${pageSize}`,{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({token:JSON.parse(localStorage.getItem('myuser')).token})
     });  
     const orderData = await res.json();
	 setOrders(orderData.data);
	 setTotalResults(orderData.totalResults);
  }
  
  const handlePrevClick = async() => {
	console.log('pre click page',page);
	let currentPage = page;
	currentPage = currentPage - 1;
	setPage(currentPage);
	fetchOrders(currentPage)
  }
  const handleNextClick = async() => {
	console.log('next click page',page);
	let currentPage = page;
	currentPage = currentPage + 1;
	setPage(currentPage);
	fetchOrders(currentPage)
  }
  return (
    <div className="container mx-auto">
	  <h1 className="font-bold text-xl p-6">My Orders</h1> 
      <div className="flex flex-col">
		  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
			  <div className="overflow-hidden">
				<table className="min-w-full">
				  <thead className="bg-white border-b">
					<tr>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Order Id
					  </th>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Amount
					  </th>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Status
					  </th>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Action
					  </th>
					</tr>
				  </thead>
				  <tbody>
				    {orders.map((item)=>{
					return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
					  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
					  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
					    {item.amount}
					  </td>
					  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
					    {item.status}
					  </td>
					  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
					    <Link href={'/order?id='+item._id}><a>Deatils</a></Link>
					  </td>
					</tr>
					})}
				  </tbody>
				</table>
				<div className="container d-flex justify-content-center text-right mt-2">
                    <button disabled={page<=1} type="button" className="ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-300" onClick={handlePrevClick}>Previous</button>
                    <button disabled={page+1 > Math.ceil(totalResults/pageSize)} type="button" className="ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-300" onClick={handleNextClick}>Next</button>
                </div>
			  </div>
			</div>
		  </div>
		</div>
    </div>
  )
}

export default Orders