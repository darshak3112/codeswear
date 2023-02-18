import Link from "next/link";
import React, { useRef } from "react";
import {
  AiFillCloseCircle,
  AiOutlineShoppingCart,
  AiOutlineDelete,
  AiFillPlusCircle,
  AiFillMinusCircle
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";


const Sidebar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const ref = useRef();
  const ToggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.add("translate-x-full");
      ref.current.classList.remove("translate-x-0");
    }
  };

  return (
    <>
      <div

        className="cursor-pointer flex cart absolute right-0 mx-5"
      >
        <Link href={"/login"}>
          <MdAccountCircle size={30} />
        </Link>
        <AiOutlineShoppingCart onClick={ToggleCart} size={30} />
      </div>
      <div
        className={`z - 10 sidecart overflow-y-scroll transition-transform ${Object.keys(cart).length === 0 ? 'translate-x-full' : 'translate - x - 0'} transform fixed top-0 right-0 bg-pink-100 py-10 px-8 w-100 h-[100vh]`}
        ref={ref}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={ToggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        {Object.keys(cart).length === 0 ? (
          <div className="my-4 font-semibold text-center">
            Your Cart Is Empty
          </div>
        ) : (
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex items-center my-5">
                    <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                    <div className="flex items-center font-semibold text-pink-500 justify-center w-1/3">
                      <AiFillMinusCircle
                        className="cursor-pointer"
                        size={30}
                        onClick={() =>
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          )
                        }
                      />
                      <span className="text-sm mx-2">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        className="cursor-pointer"
                        onClick={() =>
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          )
                        }
                        size={30}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
        <span className='font-bold'>subtotal : {subTotal}</span>

        <Link
          href="/checkout"
          className="flex mx-auto items-center gap-2 w-full justify-center mt-4 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none transition-colors hover:bg-pink-600 rounded text-md"
        >
          <BsFillBagCheckFill /> Checkout
        </Link>
        <div
          className="cursor-pointer transition-colors flex mx-auto items-center gap-2 w-full justify-center mt-2 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-md"
          onClick={clearCart}
        >
          <AiOutlineDelete /> Clear Cart
        </div>
      </div>
    </>
  );
};

export default Sidebar;
