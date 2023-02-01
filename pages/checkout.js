import React from 'react'

const Checkout = () => {
  return (
    <div className='container m-auto'>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-bold text-xl '>1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4 relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input 
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Name" type='text' id='name' name='name'
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4 relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              E-mail
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='email' id='email' name='email' placeholder='Enter E-mail'
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Checkout