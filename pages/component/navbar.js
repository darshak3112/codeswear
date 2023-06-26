import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart,AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import {BsFillCartCheckFill} from 'react-icons/bs';
import {MdAccountCircle} from 'react-icons/md';
import { useRef } from 'react';
import { useRouter } from 'next/router'

const Navbar = ({logout,user,cart,addToCart,removeFromCart,clearCart,subTotal}) => {
	
  const router = useRouter()
  
  const [dropdown,setDropdown] = useState(false);
  const [sidebar,SetSidebar] = useState(false);
  
  
  useEffect(()=>{
	 Object.keys(cart).length !== 0 && SetSidebar(true)
	 let excludesidebar = ['/checkout','/order','/orders'];
	 if(excludesidebar.includes(router.pathname)) {
		 SetSidebar(false)
	 }	 
  },[cart,router])
  
  const toggleCart = (e) =>{
    SetSidebar(!sidebar)
  }
  const ref = useRef();
  
  return (
    <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10 ${!sidebar && 'over-hidden'}`}>
      <div className="logo mr-auto md:mx-5">
        <Link href={'/'}><a><Image src="/logo.webp" alt="codeswear" height={40} width={200} /></a></Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-8 font-bold md:text-md">
          <Link href={'/tshirts'}><a><li>Tshirts</li></a></Link>
          <Link href={'/hoodies'}><a><li>Hoodies</li></a></Link>
          <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
          <Link href={'/mugs'}><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div className="cursor-pointer cart items-center absolute right-0 top-4 mx-5 flex">
		<span onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)}>
			{dropdown &&
				<div className="absolute right-8 top-6 py-2 bg-white shadow-lg border rounded-md px-5 w-36">
				<ul>
					<Link href={'/account'}><li className='py-1 hover:text-pink-700 font-bold'><a>My Account</a></li></Link>
					<Link href={'/orders'}><li className='py-1 hover:text-pink-700 font-bold'><a>Orders</a></li></Link>
					<li className='py-1 hover:text-pink-700 font-bold' onClick={logout}><a>Logout</a></li>
				</ul>
				</div>
			}
        {user.token && <MdAccountCircle onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)} className="text-xl md:text-2xl mx-2"/>}
		</span>
        {!user.token && <Link href={'/login'}><button type='button' className='px-2 py-1 mx-2 bg-pink-600 rounded-md text-sm text-white'>Login</button></Link>} 
        <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-2xl"/>
      </div>
      <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute bg-pink-100 top-0 px-8 py-10 transition-all ${sidebar ? 'right-0' : '-right-96'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <a onClick={toggleCart} className='absolute top-2 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle/></a>
        
        {Object.keys(cart.length == 0) && <div className='my-4 font-semibold'>Your cart is empty!</div>}
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).map((k)=>{
            return <li key={k}>
                    <div className='item flex my-3'>
                      <div className='w-2/3 font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                        <AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-500'/> 
                        <span className='mx-2 text-sm'>{cart[k].qty}</span> 
                        <AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-500'/>
                      </div>
                    </div>
                  </li>
          })}
        </ol>
        <div className='font-bold my-2'>Subtotal : ₹{subTotal}</div>
        <div className='flex'>
          <Link href={'/checkout'}><button disabled={Object.keys(cart).length == 0} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillCartCheckFill className='m-1'/>Checkout</button></Link>
          <button onClick={clearCart} disabled={Object.keys(cart).length == 0} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar