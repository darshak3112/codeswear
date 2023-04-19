import Link from "next/link";
import React from 'react'

const About = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="/logo.png"/>
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Welcome to CodesWear.com</h1>
      <p className="mb-8 leading-relaxed">This website is an attempt to deliver amazing products at a good and reasonable price. This entire website was built on a YouTube series as a NextJs course project. This website is powerd by NextJs + React + MongoDB for storing the data. For the server side logic, we use NextJs built in SSR. If you are curious enough to find how this website was build, checkout Nextjs playlist from CodeWithHarry on YouTube and if you are not, buy yourself a trendy geek Tshirt from CodesWear ;) !</p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg"><Link href={'/tshirts'}><a>Start Shopping</a></Link></button>
        
      </div>
    </div>
  </div>
 
 
</section>
<hr/>
<section className="mt-8 text-gray-600 body-font mx-6"><h2 className="font-semibold my-2 text-3xl text-gray-900">About Codeswear</h2><p className="mb-8 leading-relaxed">Codeswear.com is an attempt to serve the people of india with unique designs on apparels. E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in search of your favorite geek hoodie when you can find it on the Internet in a single click? Not only hoodies, we also have a wide variety of stickers, mugs and other apparels!<br/>If you are wondering why you should shop from Codeswear when there are multiple options available to you, our unique designs and quality products will answer your question.</p></section>
</div>
  )
}

export default About