import React from 'react'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import { Router, useRouter } from 'next/router'

const Forgot = ({toastShow}) => {
  const router = useRouter();
  
  const [email, setEmail] = useState('')
  // check already login
  useEffect(() => {
	if(localStorage.getItem('myuser')) {
	  router.push('/')
    }
  }, [router])

  // handleChange
  const handleChange = (e) =>{
    if(e.target.name == 'email') {
      setEmail(e.target.value)
    }
  }
  // handleSubmit
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = {email};
    const res = await fetch("/api/forgotpassword",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });  
    const response = await res.json();
	document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
    if(response.success) {
	  setEmail('')
	  toastShow('success',response.success);
	} else if(response.errors)  {
	  toastShow('errors',response.errors);	
	} else {
	  toastShow('error',response.error);
    }
  }  
  
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	  <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.webp" alt="Workflow"/>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/login'}><a href="#" className="font-medium text-pink-600 hover:text-pink-500"> Login </a></Link>
            </p>
        </div>
        <form name="forgotFrm" onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
          <input type="hidden" name="remember" value="true"/>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input value={email} onChange={handleChange} id="email" name="email" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
				<span className="help-block error_email"></span>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Continue
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Forgot