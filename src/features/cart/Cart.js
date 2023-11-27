import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  selectCartAPIStatus,
  selectCartItems,
  updateCartAsync,
} from './cartSlice';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Loder from '../loder/Loder';
import Error from '../error/Error';

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const cartItems = useSelector(selectCartItems);
  const currentStatus = useSelector(selectCartAPIStatus)
  const totalAmount = cartItems.reduce((amount, item) => item.product.price*item.quantity+amount, 0);
  const totalCartItems = cartItems.reduce((total, item) => parseInt(item.quantity)+total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id: item._id, quantity: +e.target.value}));
  }

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  }

  // displaying loder till the data loads
  if (currentStatus === "loading") {
    return (
      <Loder />
    )
  }

  // displaying error message if some error occurred
  if (currentStatus === "error") {
    return (
      <Error>Some Error Occurred</Error>
    )
  }

  // if cart is empty
  if (!cartItems.length) {
    return (
      <>
      <h1>No Product is added in the cart</h1>

      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            <Link to={"/"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Add Products to Cart
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>      
      </>
    )
  }

  return (
    <div className="mx-auto m-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">Cart</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.product._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.productName}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/product-details/${item.product._id}`}>{item.product.productName}</Link>
                      </h3>
                      <p className="ml-4">$ {item.product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.color?item.product.color:"black"}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                        Qty
                      </label>
                      <select onChange={(e)=>handleQuantity(e, item)} value={item.quantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                      </select>
                      {/* {item.quantity} */}
                    </div>

                    <div className="flex">
                      <button
                        onClick={(e)=>handleRemove(e, item._id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$ {totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Total Items in Cart</p>
          <p>{totalCartItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
          to={"/checkout"}
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to={"/"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
