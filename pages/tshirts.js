import Link from 'next/link'
import React from 'react'
import axios from "axios";
import Head from "next/head";


const Tshirts = ({ products }) => {
  console.log(" this ", products);
  return (
    <div>
      <Head>
        <title>Stickers</title>
        <meta name="description" content="Codeswear Hoodies Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {products.map((item) => {
              return <div key={item._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                <Link passHref={true} href={`product/${item.slug}`} className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh]" src={item.img} />
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{item.price}.00</p>
                    <p className="mt-1">S,M,L,XL,XXL</p>
                  </div>
                </Link>
              </div>
            })}

          </div>
        </div>
      </section >
    </div >
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/getProducts/t-shirt`)
  const { products } = await res.json()

  // Pass data to the page via props
  return { props: { products } }
}

export default Tshirts