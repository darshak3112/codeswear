import React from 'react'
import Link from 'next/link';
const mongoose = require('mongoose');
import Product from '../models/Product';
import Header from './component/header'

const Hoodies = ({products}) => {
  return (
	<>
	<Header title="codeswaer hoodies" description="" keywords="" url={process.env.NEXT_PUBLIC_HOST} img=""/>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).map((item)=>{
            return <Link key={products[item]._id} href={`/product/${products[item].slug}`}>
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-log m-3">
              <a className="block relative rounded overflow-hidden">
                <img alt="ecommerce" className="m-auto h-[32vh] md:h-[36-vh] block" src={products[item].img}/>
              </a>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">₹{products[item].price}</p>
                <div className='mt-1'>
                  {products[item].size.includes('S') && <span className='border border-gray-600 px-1 mx-1'>S</span>}
                  {products[item].size.includes('M') && <span className='border border-gray-600 px-1 mx-1'>M</span>}
                  {products[item].size.includes('L') && <span className='border border-gray-600 px-1 mx-1'>L</span>}
                  {products[item].size.includes('XL') && <span className='border border-gray-600 px-1 mx-1'>XL</span>}
                  {products[item].size.includes('XXL') && <span className='border border-gray-600 px-1 mx-1'>XXL</span>}
                </div>
                <div className="mt-1">
                  {products[item].color.includes('red') &&<button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('black') &&<button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('green') &&<button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('yellow') &&<button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                </div>
              </div>
            </div>  
            </Link>
          })}
        </div>
      </div>
    </section>
	</>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState) {
    const con = await mongoose.connect(process.env.MONGO_URI)
  }
  //console.log(`MongoDB Connected : ${con.connection.host}`)
  let products = await Product.find({category:'hoodies'});
  let hoodies = {}
    for(let item of products) {
        if(item.title in hoodies) {
            if(item.availableQty > 0 && !hoodies[item.title].color.includes(item.color)) {
                hoodies[item.title].color.push(item.color)
            }
            if(item.availableQty > 0 && !hoodies[item.title].size.includes(item.size)) {
                hoodies[item.title].size.push(item.size);
            }
        } else {
            hoodies[item.title] = JSON.parse(JSON.stringify(item));
            if(item.availableQty > 0) {
                hoodies[item.title].color = [item.color]
                hoodies[item.title].size = [item.size]
            } else {
				hoodies[item.title].color = []
                hoodies[item.title].size = []
			}
        }
    }
  
  return {
    props: {products:JSON.parse(JSON.stringify(hoodies))}, // will be passed to the page component as props
  }
}

export default Hoodies