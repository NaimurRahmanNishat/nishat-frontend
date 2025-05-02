import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { useRegisterUserMutation } from '../redux/features/auth/authApi'

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {register, handleSubmit, formState: {errors},} = useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      // console.log(response);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setMessage("Ragistration failed!");
    }
  };

  return (
    <section id='register' className='bg-slate-100'>
      <div className="container mx-auto px-4 flex items-center justify-center h-screen">
        <div className='shadow-2xl xl:w-1/4 md:p-8 p-4 border-t-green-400 border-t-4 rounded-lg'>
          <h3 className='text-2xl text-center'>Create a new account</h3>
          <form className='pt-8' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Username</label>
              <input type="text" placeholder='Enter your username...' className='w-full bg-gray-200 p-2 rounded-md outline-none' {...register("username", { required: true })}/>
              {errors.username && <p className='text-red-600'>Username is required</p>}
            </div>
            <div className='pt-2'>
              <label>Email</label>
              <input type="email" placeholder='Enter your email...' className='w-full bg-gray-200 p-2 rounded-md outline-none' {...register("email", { required: true })}/>
              {errors.email && <p className='text-red-600'>Email is required</p>}
            </div>
            <div className='pt-3'>
              <label>Password</label>
              <div className='flex items-center w-full rounded-md bg-gray-200'>
              <input type={showPassword ? "text" : "password"} placeholder='Enter your password...' className='w-full p-2 rounded-md outline-none' {...register("password", { required: true })}/>
                <span className='cursor-pointer pr-1 text-xl'>
                  {showPassword ? <FaEye onClick={togglePasswordVisibility} /> : <FaEyeSlash onClick={togglePasswordVisibility} />}
                </span>
              </div>
              {errors.password && <p className='text-red-600'>Password is required</p>}
              {message && <p className='text-red-600'>Please given valid information</p>}
            </div>
            <div className='pt-4'>
              <button className='w-full bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md font-semibold cursor-pointer'>Register</button>
            </div>
          </form>
          <div className='pt-4 flex items-center justify-center'>
            <p className='text-center'>Already have an account? </p>
            <Link to={"/login"}><p className='text-red-600 hover:text-red-700 hover:underline font-semibold cursor-pointer'>Log in</p></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;