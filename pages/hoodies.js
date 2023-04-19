import Link from "next/link";
import React from "react";
import Head from "next/head";

const Hoodies = ({ tshirts }) => {
  return (
    <div>
      <Head>
        <title>Hoodies</title>
        <meta name="description" content="Codeswear Hoodies Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {Object.keys(tshirts).length === 0 && <p>Sorry! Currently we are out of stock. New stock is comming soon!</p>}
            {Object.keys(tshirts).map((item) => {
              return <div key={tshirts[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                <Link passHref={true} href={`product/${tshirts[item].slug}`} className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh]" src={tshirts[item].img} />
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{tshirts[item].title}</h2>
                    <p className="mt-1">₹{tshirts[item].price}.00</p>
                    <div className="mt-1">
                      {tshirts[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                      {tshirts[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                      {tshirts[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                      {tshirts[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                      {tshirts[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                    </div>
                    <div className="mt-1">
                      {tshirts[item].color.includes('red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('blue') && <button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('black') && <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('green') && <button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('yellow') && <button className="border-2 border-gray-300 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('purple') && <button className="border-2 border-gray-300 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}


                    </div>
                  </div>
                </Link>
              </div>
            })}

          </div>
        </div>
      </section >
    </div >
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts/hoodies`)
  const { tshirts } = await res.json()
  return { props: { tshirts } }
}

export default Hoodies;
