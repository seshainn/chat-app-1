import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [message, setMessage] = useState("Login Form")
    const { register, handleSubmit, formState, reset } = useForm()
    const { errors } = formState
    const navigate = useNavigate()
    const formSubmit = async (formData) => {
        const response = await fetch('http://localhost:4000/api/user', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        setMessage(data.message)
        reset()
        if (data.status === 200) {
            setTimeout(() => navigate("/"), 1000)
        }
    }

    return (
        <div className='flex flex-col h-screen items-center justify-center gap-4'>
            <h1 className='font-bold text-2xl'>{message}</h1>
            <div className='w-1/2'>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className='flex flex-col space-y-6'>
                        <div className='flex flex-col'>
                            <input
                                type='email'
                                placeholder='Enter email'
                                {...register('email')}
                                className='bg-blue-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-blue-100 px-5 py-2 focus:outline-none'
                            />
                            <p className='text-red-900 text-sm'>{errors.email?.message}</p>
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type='password'
                                placeholder='Enter password'
                                {...register('password')}
                                className='bg-blue-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-blue-100 px-5 py-2 focus:outline-none'
                            />
                            <p className='text-red-900 text-sm'>{errors.password?.message}</p>
                        </div>
                        <button className='text-md py-4 bg-blue-800 rounded-md'>Login</button>
                    </div>
                </form>
            </div>

            <p className='text-sm'>
                New User? Signup
                <Link to="/signup">
                    <span className='italic font-semibold'>{` here`}</span>
                </Link>
            </p>
        </div>
    )
}

export default Login