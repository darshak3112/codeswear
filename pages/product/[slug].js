import React,{useState} from 'react';
import { useRouter } from 'next/router'
const mongoose = require('mongoose');
import Product from '../../models/Product'
import Wishlist from '../../models/Wishlist'
const sizeArr = ['S','M','L','XL','XXL'];
const colorArr = ['red','white','green','yellow'];
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../component/header'

const Slug = ({buyNow,addToCart,product,variants,wishlist,user,toastShow}) => {
  const router = useRouter()
  const { slug } = router.query;
  const [pin, setPin] = useState()
  const [service, setService] = useState()

  // set current product color and size
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)

  const refreshVaraint = (newSize,newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`
    //window.location = url;
	router.push(url)
  }

  const changePin = (e) =>{
    setPin(e.target.value);
  }
  const checkServiceAvailibility = async() =>{
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json();
    if(Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success('🦄 Yes we deliver on this pinocode!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error('🦄 Sorry we cant deliver on this pincode!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  
  const addToWishlist = async(userId,productId) => {
	 console.log('userId',userId)
	 console.log('productId',productId)
	 const res = await fetch("/api/addwishlist",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userId,productId})
    });  
    const response = await res.json();
	if(response.success) {
		toastShow('success',response.success)
	} else {
		toastShow('error',response.error)
	}
  }
  return (
    <>
	  <Header title={product.title} description={product.desc} keywords="codes wear, tshirts, mugs, huddies" url={`${process.env.NEXT_PUBLIC_HOST}/product/${product.slug}`} img={product.img}/>
	{/*<Head>
        <title>{product.title}</title>
        <meta name="description" content={product.desc} />
		<meta name="keywords" content="codes wear, tshirts, mugs, huddies" />
        <link rel="icon" href="/favicon.ico" />
		<meta property="og:title" content={product.title} />
		<meta property="og:description" content={product.desc}/>
		<meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}/product/${product.slug}`}/>
		<meta property="og:site" content={process.env.NEXT_PUBLIC_HOST}/>
		<meta property="og:type" content="website"/>
		<meta property="og:image" content={product.img}/>
		<meta property="og:image:width" content="1280" />
		<meta property="og:image:height" content="630" />
	</Head>*/}
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer 
          position='bottom-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full px-10 lg:h-auto object-cover object-top rounded" src={product.img} layout='fill'/>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">Codeswear.com</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a href={`http://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_HOST}/product/${product.slug}`} className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href={`https://twitter.com/share?text=${product.title}&url=${process.env.NEXT_PUBLIC_HOST}/product/${product.slug}`} className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${process.env.NEXT_PUBLIC_HOST}/product/${product.slug}`} className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.desc}.</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    {colorArr.map((cdata)=>{
                      if(Object.keys(variants).includes(cdata) && Object.keys(variants[cdata]).includes(size))
                      return(
                        <button key={cdata} onClick={()=>{refreshVaraint(size,cdata)}} className={`border-2 ml-1 bg-${cdata}-700 rounded-full w-6 h-6 focus:outline-none ${color == cdata ? 'border-black' : 'border-gray-300'}`}></button>
                      )
                    })}
                    {/*<button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>*/}
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select value={size} onChange={(e)=>{refreshVaraint(e.target.value,color)}}  className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                        {sizeArr.map((sdata)=>{
                          if(Object.keys(variants[color]).includes(sdata))
                          return(
                            <option key={sdata} value={sdata}>{sdata}</option>
                          )
                        })}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
				  {product.availableQty<=0 ?  
				  <span className="title-font font-medium text-gray-900">Out of stock</span>
				  : <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
                  <button disabled={product.availableQty<=0} onClick={()=>{addToCart(slug,1,product.price,product.title,size,color)}} className="flex ml-8 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-300">Add to Cart</button>
                  <button disabled={product.availableQty<=0} onClick={()=>{buyNow(slug,1,product.price,product.title,size,color)}} className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-300">Buy Now</button>
                  {user && <button onClick={()=>{addToWishlist(user._id,product._id)}} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
				  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24" color={`${wishlist && 'rgb(236 72 153 / var(--tw-bg-opacity))'}`}>
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>}
                </div>
                <div className='flex pin mt-6'>
                  <input type='text' onChange={changePin} name='pin' placeholder='Enter Pincode' className='px-2 border-2 text-gray-400 rounded-md' />
                  <button onClick={checkServiceAvailibility} className='text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded' type='button'>Check Pincode</button>
                </div>
                {(!service && service != null) && <div className='text-red-700 text-sm mt-2'>
                  Sorry we dont deliver on this pincode
                </div>}
                {(service && service != null) && <div className='text-green-700 text-sm mt-2'>
                  Yes we deliver on this pincode
                </div>}
              </div>
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
  let product = await Product.findOne({slug:context.query.slug});
  if(product == null) {
	return {
      notFound: true
    }
  }
  let variants = await Product.find({title:product.title});
  let colorSizeSlug = {} // {red:{xL:'wear-the-code'}}
  for(let item of variants) {
      if(Object.keys(colorSizeSlug).includes(item.color)) {
        colorSizeSlug[item.color][item.size] = {slug:item.slug} 
      } else {
        colorSizeSlug[item.color] = {}
        colorSizeSlug[item.color][item.size] = {slug:item.slug}
      }
  }
  let wishlist = await Wishlist.findOne({productId:product._id,userId:'63172052a24d6eab92b22738'});
  
  return {
    props: {product:JSON.parse(JSON.stringify(product)),variants:JSON.parse(JSON.stringify(colorSizeSlug)),wishlist:JSON.parse(JSON.stringify(wishlist))}, // will be passed to the page component as props
  }
}

export default Slug