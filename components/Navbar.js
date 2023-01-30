import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';


const Navbar = () => {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-start py-2">
      <div className="logo mx-5">
        <Image src={"/logo.png"} alt="logo" height={40} width={200} />
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-2 font-bold md:text-xl'>
          <Link href={"/"}><li>T-Shirts</li></Link>
          <Link href={"/"}><li>Hoodies</li></Link>
          <Link href={"/"}><li>Stickers</li></Link>
          <Link href={"/"}><li>Mugs</li></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 top-4">
      <AiOutlineShoppingCart className='text-3xl'/>
      </div>
    </div>
  )
}

export default Navbar