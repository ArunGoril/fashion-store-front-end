import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";

const OrderSuccessPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    // reset cart
    dispatch(resetCartAsync(user._id));
    // reset currentOrder
    dispatch(resetOrder());
  }, [dispatch, user])

  return (
    <>
      {!params.id && <Navigate to="/" replace={true} />}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
            Order No #{params?.id}
          </h3>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your orders in my account	&gt; My Orders.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default OrderSuccessPage;