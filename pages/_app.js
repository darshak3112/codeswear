import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import '../styles/globals.css'
import Footer from './component/footer'
import Navbar from './component/navbar'
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // for cart 
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  // for user token
  const [user, setUser] = useState({token:null,email:null,_id:null,role:null})
  const [key, setKey] = useState(0)
  // for progress bar
  const [progress, setProgress] = useState(0)
  // for web route
  const [adminRoute, setAdminRoute] = useState(false)
  

  // set cart on load
  useEffect(() => {
	// for loading bar set
	router.events.on('routeChangeComplete',()=>{
		setProgress(400);
	})
	router.events.on('routeChangeComplete',()=>{
		setProgress(100);
	})	
    try {
      if(localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')));
      }
    } catch(error) {
      console.log(error)
      localStorage.clear()
    }
    //const token = localStorage.getItem('token')
	const myuser = JSON.parse(localStorage.getItem('myuser'))
    if(myuser) {
      setUser({token:myuser.token,email:myuser.email,_id:myuser._id,role:myuser.role})
      setKey(Math.random())
    }
	// set setAdminRoute
	if(router.pathname.includes("/admin")) {
		setAdminRoute(true);
	} else {
		setAdminRoute(false);
	}
  }, [router.query,router.pathname,router.events])
  
  // save cart data to localstorage
  const saveCart = (myCart) => {
    localStorage.setItem('cart',JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for(let i=0;i<keys.length;i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty; 
    }
    setSubTotal(subt);
  }

  // clear cart
  const clearCart = () =>{
    setCart({})
    saveCart({})
    console.log('clear cart successfully');
  }

  // buy now
  const buyNow = (itemCode,qty,price,name,size,variant) =>{
    // add to cart
    let newCart = {}  
    newCart[itemCode] = {qty,price,name,size,variant}
    setCart(newCart);
    saveCart(newCart);
    // redirect to checkout
    router.push('/checkout')
  }

  // add to cart and update in localstorage
  const addToCart = (itemCode,qty,price,name,size,variant)  => {
    let newCart = JSON.parse(JSON.stringify(cart));
	if(Object.keys(newCart).length == 0){
		// navbar redener for open cart sidebar
		setKey(Math.random())
	}
	if(itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty+qty
    } else {
      newCart[itemCode] = {qty,price,name,size,variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }

  // remove item from cart and update 
  const removeFromCart = (itemCode,qty,price,name,size,variant)  => {
    let newCart = cart;
    if(itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty-qty
    }
    if(newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
  }
  // logout
  const logout = () => {
	  localStorage.removeItem('myuser')
	  setUser({value:null})
	  setKey(Math.random())
	  router.push('/login')
  }
  
  const toastShow = (type,message) => {
	console.log(type,message)
    if(type == 'success') {
		toast.success(message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
    } else if(type == 'errors') {
		let errors = message;
		{errors.forEach(val => {
			document.querySelector('.error_'+val?.param).innerHTML = val?.msg;
		});}
	} else {
        toast.error(message, {
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
  
  return <>
    <LoadingBar
        color='#ff2d55'
        progress={progress}
		waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
    {!adminRoute && <Navbar key={key} logout={logout} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>}
	<ToastContainer/>
	<Component logout={logout} user={user} cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} toastShow={toastShow} {...pageProps} />
	{!adminRoute && <Footer/>}
  </>
}

export default MyApp
