import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';


const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {

    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  const ref = useRef();

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-start py-2 shadow-md">
      <div className="logo mx-5">
        <Link href={'/'}>
          <Image src={"/logo.png"} alt="logo" height={40} width={200} />
        </Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={"/tshirts"}><li>T-Shirts</li></Link>
          <Link href={"/hoodies"}><li>Hoodies</li></Link>
          <Link href={"/stickers"}><li>Stickers</li></Link>
          <Link href={"/mugs"}><li>Mugs</li></Link>
        </ul>
      </div>
      <div onClick={toggleCart} className="cart absolute right-0 mx-5 top-4 cursor-pointer">
        <AiOutlineShoppingCart className='text-3xl' />
      </div>
      <div ref={ref} className="sideCart absolute top-0 right-0 bg-pink-100 px-8 w-72 h-full z-10 py-10 transform transition-transform translate-x-full">
        <h2 className='font-bold text-xl text-center' >Shopping cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500 "><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold' >Your cart is empty.</div>}
          {Object.keys(cart).map((k) => {
            <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold '>{cart[k].name}</div>
                <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                  <AiFillMinusCircle className='cursor-pointer text-pink-500' /> <span className="text-sm mx-2">{cart[k].name}</span> <AiFillPlusCircle className='cursor-pointer text-pink-500' /></div>
              </div>
            </li>
          })}

        </ol>
        <div className="flex">

          <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button>
          <button onClick={clearCart} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>

        </div>
      </div>
    </div>
  )
}

export default Navbar