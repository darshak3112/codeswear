import Link from 'next/link';
import React from 'react'
import {
  AiFillCloseCircle,
  AiOutlineDelete,
  AiFillPlusCircle,
  AiFillMinusCircle 
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";



const Checkout = ({cart,subTotal,addToCart,removeFromCart}) => {
  return (
    <div className='container m-auto lg:w-[1200px]'>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <div className="delivery">
        <h2 className='font-bold text-xl '>1. Delivery Details</h2>
        <div className="mx-auto md:flex my-3 ">
          <div className="px-2 mx-5 md:mx-1 md:w-1/2">
            <div className="mb-4 ">
              <label htmlFor="name" className="font-semibold leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Name" type='text' id='name' name='name'
              />
            </div>
          </div>
          <div className="px-2 mx-5 md:mx-1 md:w-1/2">
            <div className="mb-4 ">
              <label htmlFor="email" className="font-semibold leading-7 text-sm text-gray-600">
                E-mail
              </label>
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='email' id='email' name='email' placeholder='Enter E-mail'
              />
            </div>
          </div>
        </div>
        <div className="px-2 w-full my-2 mx-5 md:mx-1">
          <div className="mb-4 ">
            <label htmlFor="address" className="font-semibold leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea name="address" id="address" cols='25' rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='email' placeholder='Enter Address'></textarea>
          </div>
        </div>
        <div className="mx-auto md:flex my-3 ">
          <div className="px-2 mx-5 md:mx-1 md:w-1/2">
            <div className="mb-4 ">
              <label htmlFor="phone" className="font-semibold leading-7 text-sm text-gray-600">
                Phone
              </label>
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Phone" type='phone' id='phone' name='phone'
              />
            </div>
          </div>
          <div className="px-2 mx-5 md:mx-1 md:w-1/2">
            <div className="mb-4 ">
              <label htmlFor="city" className="font-semibold leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='text' id='city' name='city' placeholder='Enter City'
              />
            </div>
          </div>
        </div>
        <div className="mx-auto md:flex my-3 ">
          <div className="px-2 mx-5 md:mx-1 md:w-1/2">
            <div className="mb-4 ">
              <label htmlFor="state" className="font-semibold leading-7 text-sm text-gray-600">
                State
              </label>
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Phone" type='text' id='state' name='state'
              />
            </div>
          </div>
          <div className="px-2 mx-5 md:mx-1 md:w-1/2">
            <div className="mb-4 ">
              <label htmlFor="pincode" className="font-semibold leading-7 text-sm text-gray-600">
                Pincode
              </label>
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='text' id='pincode' name='pincode' placeholder='Enter Pincode'
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cart">
        <h2 className='font-bold mt-3 text-xl '>2. Review Cart Items</h2>
        <div
          className=" sidecart   bg-pink-100 py-10 p-6 m-2 rounded"
        >
          <span
            className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
          >
            <AiFillCloseCircle />
          </span>
          {Object.keys(cart).length === 0 ? (
            <div className="my-4 font-semibold text-center">
              Your Cart Is Empty
            </div>
          ) : (
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className="item flex items-center my-5">
                      <div className=" font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                      <div className="flex items-center font-semibold text-pink-500 justify-center w-1/3">
                        <AiFillMinusCircle
                          className="cursor-pointer"
                          size={30}
                          onClick={() =>
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            )
                          }
                        />
                        <span className="text-sm mx-2">{cart[k].qty}</span>
                        <AiFillPlusCircle
                          className="cursor-pointer"
                          onClick={() =>
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            )
                          }
                          size={30}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          <span className='font-bold'>subtotal : {subTotal}</span>
        </div>
        <div className="mx-4 w-[200px]">
        <Link
          href="/checkout"
          className="flex mx-auto items-center gap-2 justify-center mt-4 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none transition-colors hover:bg-pink-600 rounded text-md"
        >
          <BsFillBagCheckFill /> Pay ₹{subTotal}
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Checkout