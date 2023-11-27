import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import {
  selectLoggedInUser,
  createUserAsync,
  selectError,
  resetAuth
} from '../authSlice';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // console.log(errors)

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);

  const onSubmit = (data) => {
    dispatch(createUserAsync({ 
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email, 
      password: data.password,
      addresses: []
     }));
  }

  useEffect(() => {
    dispatch(resetAuth())
  }, [])

  return (
    <>
    {user && <Navigate to="/" replace={true} />} {/* navigating to home page if user registerd successfully */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="firstName"
                  {...register("firstName", {
                    required: "first name is required",
                    minLength: {
                      value: 4,
                      message: "first name should have at least 4 letters"
                    }, 
                    maxLength: {
                      value: 20,
                      message: "first name should not have more than 20 letters"
                    }
                  })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName && <p className='text-red-500 text-left'>{errors.firstName.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="lastName"
                  {...register("lastName", {
                    required: "last name is required",
                    minLength: {
                      value: 4,
                      message: "last name should have at least 4 letters"
                    }, 
                    maxLength: {
                      value: 20,
                      message: "last name should not have more than 20 letters"
                    }
                  })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName && <p className='text-red-500 text-left'>{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email is not valid"
                    }
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className='text-red-500 text-left'>{errors.email.message}</p>}
                {error && <p className='mt-3 text-red-500 text-left'>{error.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`
                    }
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className='text-red-500 text-left'>{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "confirm password is required",
                    validate: (value, formValue) => value === formValue.password || "confirm password not matching"
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && <p className='text-red-500 text-left'>{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
