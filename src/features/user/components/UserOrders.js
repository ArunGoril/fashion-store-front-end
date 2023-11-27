import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/authSlice";
import Error from "../../error/Error";
import Loder from "../../loder/Loder";
import { fetchLoggedInUserOrdersAsync, selectUserAPIStatus, selectUserOrders } from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);
  const currentStatus = useSelector(selectUserAPIStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user._id));
  }, [dispatch, user]);

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

  // if there is no order
  if (!orders.length) {
    return (
      <>
        <h1>You don't have any orders yet</h1>

        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            <Link to={"/"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Add Products to Cart and order
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          <div className="mx-auto mb-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-2xl text-left my-5 font-bold tracking-tight text-gray-900">
                Order # {order._id}
              </h1>
              <h3 className="text-xl text-left my-5 font-bold tracking-tight text-red-900">
                Order Status : {order.status}
              </h3>
              <p className="text-base text-left my-5 tracking-tight text-gray-500">
                Estimated Delivery : It will be delivered in 7 days.
              </p>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.cartItems.map((item) => (
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
                              <Link to={`/product-details/${item._id}`}>
                                {item.product.productName}
                              </Link>
                            </h3>
                            <p className="ml-4">$ {item.product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.color ? item.product.color : "black"}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
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
                <p>$ {order.totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order.totalCartItems} items</p>
              </div>
            </div>

            <p className="text-lg text-left my-2 ml-5 tracking-tight text-gray-900">
              Shipping Address
            </p>
            <div className="flex justify-between gap-x-6 px-5 pb-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress?.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress?.street}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {order.selectedAddress?.pinCode}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Phone: {order.selectedAddress?.phone}
                </p>
                <p className="text-sm leading-6 text-gray-500">
                  {order.selectedAddress?.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
