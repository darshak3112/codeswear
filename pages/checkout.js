import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router'

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))

    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)

    }
  }, [])


  const handleChange = async (e) => {

    console.log(user, email)

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        getPinCode(e.target.value)
      }
      else {
        setState('')
        setDistrict('')
      }
    }
    setTimeout(() => {



    }, 100);
  }
  useEffect(() => {
    if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3 && pincode.length > 3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [name, email, phone, pincode, address])

  const fetchData = async (token) => {
    let data = { token: token }
    //console.log(data)
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    let res = await a.json()
    setName(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    setPhone(res.phone)
    getPinCode(res.pincode)
  }
  const getPinCode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][0])
      setDistrict(pinJson[pin][1])
    } else {
      setState('')
      setDistrict('')
    }
  }

  const initiatePayment = async () => {


    let oid = Math.floor(Math.random() * Date.now());
    //Get a transaction token

    const data = { user, cart, subTotal, oid, email: email, name, address, pincode, phone };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    let txnRes = await a.json()
    //console.log(txnRes)
    if (txnRes.success) {
      let txnToken = txnRes.txnToken;

      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: oid /* update order id */,
          token: "txnToken" /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: subTotal /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      console.log(txnRes.error)
      if (txnRes.cartClear) {
        clearCart()
      }

      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  };
  return (
    <div className="container px-2 sm:m-auto min-h-screen">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}/>

      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input onChange={handleChange} value={name}
              type="name"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            {user && user.token ? <input value={user.email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly
            /> : <input onChange={handleChange} value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />}

          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea onChange={handleChange} value={address}
            name="address"
            id="address"
            cols="30"
            rows="2"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone Number
            </label>
            <input onChange={handleChange} value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your 10 Digit Phone Number"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              PinCode (Shipping only to India)
            </label>
            <input onChange={handleChange} value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input onChange={handleChange} value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="district" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input onChange={handleChange} value={district}
              type="text"
              id="district"
              name="district"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl">2. Review Cart Items &amp; Pay</h2>
      <div className=" sideCart  bg-pink-100 p-6 m-2">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-semibold">Your cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className=" font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex items-center justify-center font-semibold w-1/3 text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="font-bold">Subtotal: ₹{subTotal}</span>
      </div>
      <div className="mx-4">
        <div className="form-check flex items-center">
          <input
            className="mr-2 p-8 md:h-4 md:w-4"
            type="checkbox"
            id="flexCheckDefault"
          />
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="flexCheckDefault"
          >
            <p className="py-4">
              I want to place a Cash on Delivery (COD) Order. I promise to pay
              the delivery partner on delivery
            </p>
          </label>
        </div>
        <Link href={"/order"}>
          <button disabled={disabled}
            onClick={initiatePayment}
            className="disabled:bg-pink-300 flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            <BsFillBagCheckFill className="m-1" />
            Pay ₹{subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
