import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from '../features/cart/cartSlice';
import { Link, Navigate } from "react-router-dom";
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';
import { createOrderAsync, selectCurrentOrder, selectOrderAPIStatus } from '../features/order/orderSlice';
import Loder from '../features/loder/Loder';
import Error from '../features/error/Error';

const Checkout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const user = useSelector(selectUserInfo);
  const currentStatus = useSelector(selectOrderAPIStatus);
  const totalAmount = cartItems.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
  const totalCartItems = cartItems.reduce((total, item) => parseInt(item.quantity) + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item._id, quantity: +e.target.value }));
  }

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  }

  const onSubmit = (data) => {
    dispatch(updateUserAsync({id: user._id, addresses: [...user.addresses, data]}));
    reset();
  }

  const handleAddress = (e) => {
    // console.log(e.target.value)
    setSelectedAddress(user.addresses[e.target.value]);
  }

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  }

  const handleOrder = (e) => {
    if (!selectedAddress || !paymentMethod) {
      alert("please add/select address and payment method")
      return;
    }

    const order = {
      user: user._id,
      cartItems, 
      totalAmount, 
      totalCartItems, 
      paymentMethod, 
      selectedAddress,
      status: "pending"
    }
    dispatch(createOrderAsync(order))
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

  return (
    <>
    {!cartItems.length && <Navigate to="/" replace={true} />} {/* if all the items have been removed then navigate to home route */}
    {currentOrder && <Navigate to={`/order-success/${currentOrder._id}`} replace={true} />} {/* navigating to order success page if new order is created */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form className="bg-white p-5 my-12 text-left" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {required: "name is required"})}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && <p className='text-red-500 text-left'>{errors.name.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {required: "email is required"})}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && <p className='text-red-500 text-left'>{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                      <input
                          type="tel"
                          {...register("phone", {required: "phone no is required"})}
                          id="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && <p className='text-red-500 text-left'>{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("streetAddress", {required: "street address is required"})}
                          id="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.streetAddress && <p className='text-red-500 text-left'>{errors.streetAddress.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {required: "city is required"})}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && <p className='text-red-500 text-left'>{errors.city.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {required: "state is required"})}
                          id="region"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && <p className='text-red-500 text-left'>{errors.state.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pin-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Pin code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {required: "pin code is required"})}
                          id="pin-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && <p className='text-red-500 text-left'>{errors.pinCode.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save Address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Existing Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing addresses
                  </p>
                  <ul role="list">
                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 p-5 border-solid border-2 border-gray-2"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            onChange={handleAddress}
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            onChange={handlePayment}
                            value="cash"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            onChange={handlePayment}
                            value="card"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payments
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl mb-5 font-bold tracking-tight text-gray-900">Cart</h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item._id} className="flex py-6">
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
                              <p className="ml-4">{item.product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.product.color ? item.product.color : "black"}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                Qty
                              </label>
                              <select onChange={(e) => handleQuantity(e, item)} value={item.quantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
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
                                onClick={(e) => handleRemove(e, item.product._id)}
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
                  <div
                    onClick={handleOrder}
                    className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
