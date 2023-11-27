import React from "react";
import { useSelector } from "react-redux";
import { selectUserAPIStatus, selectUserInfo } from "../userSlice";
import Error from "../../error/Error";
import Loder from "../../loder/Loder";

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const currentStatus = useSelector(selectUserAPIStatus)

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
    <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
      <div className="border-t text-left border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900">
          Name : {user.firstName}
        </h1>
        <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
          Email Address : {user.email}
        </h3>
      </div>

      <p className="text-lg text-left my-2 ml-5 tracking-tight text-gray-900">
        Your Addresses
      </p>
      {user.addresses.map((address, index) => (
        <div key={index} className="flex justify-between gap-x-6 px-5 pb-5 mb-2 border border-gray-600 rounded">
          <div className="flex min-w-0 gap-x-4">
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
        </div>
      ))}
    </div>
  );
}
