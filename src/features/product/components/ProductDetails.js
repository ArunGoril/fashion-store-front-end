import { useEffect, useState } from "react";
// import { StarIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductAPIStatus
} from "../productSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { addToCartAsync } from "../../cart/cartSlice";
import Loder from "../../loder/Loder";
import Error from "../../error/Error";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const user = useSelector(selectLoggedInUser);
  const currentStatus = useSelector(selectProductAPIStatus);
  // console.log(product)

  const { id } = useParams(); // extracting id from the url

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleCart = (e) => {
    e.preventDefault();
    if (!isAddedToCart) { // if the item already added to cart, will not allow user to add the same item again to cart
      dispatch(addToCartAsync({ product: product._id, quantity: 1, user: user._id }));
      setIsAddedToCart(true);
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

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
    <div className="bg-white mb-12">
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a className="mr-2 text-sm font-medium text-gray-900">
                    {product.category}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.productName}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.images[1]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.images[2]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.images[3]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.productName}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                $ {product.price}
              </p>

              <form className="mt-10">
                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* description and details */}
              <div>
                <h3 className="sr-only">description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
