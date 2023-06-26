import React from 'react'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { Router, useRouter } from 'next/router'

const Singup = ({toastShow}) => {
  const router = useRouter();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // check already login
  useEffect(() => {
	if(localStorage.getItem('myuser')) {
	  router.push('/')
    }
  }, [router])

  // handleChange
  const handleChange = (e) =>{
    if(e.target.name == 'name') {
      setName(e.target.value)
    }
    if(e.target.name == 'email') {
      setEmail(e.target.value)
    }
    if(e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }
  // handleSubmit
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = {name,email,password};
    const res = await fetch("/api/signup",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });  
    const response = await res.json();
	document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
	if(response.success) {
	  setName('')
	  setEmail('')
      setPassword('')
	  toastShow('success',response.success);
	  setTimeout(() => {
        router.push('/login')  
      }, 1000);
	} else if(response.errors)  {
	  toastShow('errors',response.errors);	
	} else {
	  toastShow('error',response.error);
    }
  }
  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/logo.webp" alt="Workflow"/>
              <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign up to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <Link href={'/login'}><a href="#" className="font-medium text-pink-600 hover:text-pink-500"> Login </a></Link>
              </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true"/>
              <div className="rounded-md shadow-sm -space-y-px">
			    <div className='w-full'>
				  <div className="relative mb-4">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input value={name} onChange={handleChange} id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Your Name"/>
				    <span className="help-block error_name"></span>
                  </div>
				</div>
				<div className='w-full'>
                  <div className="relative mb-4">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input value={email} onChange={handleChange} id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
				    <span className="help-block error_email"></span>
                  </div>
				</div>
				<div className='w-full'>
				  <div className="relative mb-4">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input value={password} onChange={handleChange} id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Password"/>
				    <span className="help-block error_password"></span>
                  </div>
				</div>  
              </div>

              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Sign up
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>  
  )
}

export default Singup