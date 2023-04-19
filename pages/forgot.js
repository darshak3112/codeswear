import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
    else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('myuser')) {
      router.push('/')
    }
    //console.log(router.query.token)
  }, [])
  const sendRestEmail = async () => {
    let data = {
      email,
      sendMail: true
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    let res = await a.json()
    if (res.success) {
      console.log('Password rest instruction have been sent to email')
    }
    else {
      console.log("error")
    }

  }
  const resetPassword = async () => {
    if (password == cpassword) {


      let data = {
        password,
        sendMail: false
      }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      let res = await a.json()
      if (res.success) {
        console.log('Password has been changed')
      }
      else {
        console.log("error")
      }
    }

  }
  return (
    <div>
      <div className="min-h-screen flex items-start justify-center pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>

            <img className="mx-auto h-12 w-auto" src="/codeswearcircle.png" alt="logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/login'} className="font-medium text-pink-600 hover:text-pink-500">  Login </Link>
            </p>
          </div>
          {router.query.token &&
            <div>

              <input onChange={handleChange} type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="password" className="sr-only">New Password</label>
                  <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="New Password" />
                </div>

                <div>
                  <label htmlFor="cpassword" className="sr-only">Confirm New Password</label>
                  <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autoComplete="cpassword" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password" />
                </div>

              </div>

              <div>
                <button onClick={resetPassword} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                    <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
              {password != cpassword &&
                <span className='text-red-600'>Password donot match</span>
              }
              {password && password === cpassword &&
                <span className='text-green-600'>Password matched</span>
              }

            </div>}
          {!router.query.token &&
            <div>
              <input onChange={handleChange} type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>

              </div>

              <div>
                <button onClick={sendRestEmail} type="submit" className="my-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* Heroicon name: solid/lock-closed */}
                    <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Forgot