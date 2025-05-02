import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import {useForm} from 'react-hook-form';
import { useLoginUserMutation } from '../redux/features/auth/authApi.js';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice.js';  // import from authSlice for state management

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors},} = useForm(); // backend import data check
  const [loginUser, { isLoading, error }] = useLoginUserMutation(); // backend import data this is connect to redux
  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();  // data get from backend
      const {token, user} = response;
      dispatch(setUser({user}));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <section id='login' className=' bg-slate-100'>
      <div className='container mx-auto px-4 h-screen flex items-center justify-center'>
        <div className='shadow-2xl xl:w-1/4 md:p-8 p-4 border-t-green-400 border-t-4 rounded-lg'>
        <h3 className='text-2xl text-center'>
            Log in to <span className='bg-gradient-to-l from-pink-500 to-violet-500 bg-clip-text text-transparent font-bold'>N</span>shop
          </h3>
          <form className='pt-8' onSubmit={handleSubmit(onSubmit)}>
            {/* email input */}
            <div>
              <label>Email</label>
              <input type="email" placeholder='Enter your email...' className='w-full bg-gray-200 p-2 rounded-md outline-none' {...register("email", { required: "Email is required" })}/>
              {errors.email && <p className='text-red-500 text-sm'>Invalid email</p>}
            </div>
            {/* password input */}
            <div className='pt-3'>
              <label>Password</label>
              <div className='flex items-center w-full rounded-md bg-gray-200'>
              <input type={showPassword ? "text" : "password"} placeholder='Enter your password...' className='w-full p-2 rounded-md outline-none' {...register("password", { required: "Password is required" })}/>
                <span className='cursor-pointer pr-1 text-xl' onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </span>
              </div>
              {errors.password && <p className='text-red-500 text-sm'>Invalid password</p>}
              {message && <p className='text-red-500 text-sm pt-1'>{message}</p>}
            </div>
            {/* log in button */}
            <div className='pt-4'>
              <button onSubmit={handleSubmit(onSubmit)} className='w-full bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md font-semibold cursor-pointer'>Log in</button>
            </div>
          </form>
          {/* Links */}
          <div className='flex justify-between pt-5'>
            <Link to={"/forgot-password"}><p className='cursor-pointer hover:underline text-blue-500'>forgot password?</p></Link>
            <Link to={"/register"}> <h3 className='text-red-600 cursor-pointer hover:underline hover:text-red-700'>Register</h3></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;
