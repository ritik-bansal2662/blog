import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login=async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className='md-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%' />
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Don&apos;t have any account?&nbsp;
            <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                Sign Up
            </Link>
        </p>
        {error && <p className='text-red-500 text-center mt-8'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input label="Email: " placeholder="Enter Your Email" type='email' {...register("email", {
                    required: true,
                    validate: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email Address must be valid.",
                })} />
                <Input label="Password: " type="password" placeholder="Enter Password" {...register("password", {
                    required: true
                })} />
                <Button
                    type="submit"
                    className='w-full'
                >Sign In</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
