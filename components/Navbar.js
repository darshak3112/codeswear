import Image from "next/image";
import Link from "next/link";
import React from "react";
import Sidebar from "./Sidebar";


const Navbar = ({ user, logout, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  return (
    <div className="sticky z-10 bg-white shadow-md flex flex-col md:flex-row md:justify-start justify-center items-center  py-3">
      <div className="logo mr-auto md:mx-5">
        <Link href="/">
          <Image
            src="/logo.png"
            height={40}
            width={170}
            alt="Loading..."
            className="w-10/12"
          />
        </Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={"/tshirts"}><li className="hover:text-pink-600" >T-Shirts</li></Link>
          <Link href={"/hoodies"}><li className="hover:text-pink-600" >Hoodies</li></Link>
          <Link href={"/stickers"}><li className="hover:text-pink-600" >Stickers</li></Link>
          <Link href={"/mugs"}><li className="hover:text-pink-600" >Mugs</li></Link>
        </ul>
      </div>

      <Sidebar
        logout={logout}
        user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
    </div>
  );
};

export default Navbar;
