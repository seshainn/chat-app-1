import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [message, setMessage] = useState("Signup Form")
    const { register, handleSubmit, formState, reset, setError } = useForm()
    const { errors } = formState
    const navigate = useNavigate()
    const formSubmit = async (values) => {
        if (values.pic[0] && values.pic[0].type !== "image/jpg" && values.pic[0].type !== "image/jpeg" && values.pic[0].type !== "image/png") {
            setError("pic", {
                type: 'filetype',
                message: "only jpg/jpeg/png allowed"
            })
        } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('password2', values.password2);

            if (values.pic[0]) {
                formData.append('picThr', true)
                const picName = values.email.split('@')[0] + '.' + values.pic[0].type.split('/')[1]
                formData.append('picName', picName)
            } else {
                formData.append('picThr', false)
                formData.append('picName', "")
            }
            formData.append('pic', values.pic[0]);
            const response = await fetch('http://localhost:4000/api/user', {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            setMessage(data.message)
            reset()
            if (data.status === 200) {
                setTimeout(() => navigate("/"), 1000)
            }
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
                                type='name'
                                placeholder='Enter name'
                                {...register('name', { required: { value: true, message: "name is required" } })}
                                className='bg-blue-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-blue-100 px-5 py-2 focus:outline-none'
                            />
                            <p className='text-red-900 text-sm'>{errors.name?.message}</p>
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type='email'
                                placeholder='Enter email'
                                {...register('email', { required: { value: true, message: "email is required" } })}
                                className='bg-blue-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-blue-100 px-5 py-2 focus:outline-none'
                            />
                            <p className='text-red-900 text-sm'>{errors.email?.message}</p>
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type='password'
                                placeholder='Enter password'
                                {...register('password', { required: { value: true, message: "password is required" } })}
                                className='bg-blue-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-blue-100 px-5 py-2 focus:outline-none'
                            />
                            <p className='text-red-900 text-sm'>{errors.password?.message}</p>
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type='password'
                                placeholder='Enter password again'
                                {...register('password2', { required: { value: true, message: "re-enter password" } })}
                                className='bg-blue-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-blue-100 px-5 py-2 focus:outline-none'
                            />
                            <p className='text-red-900 text-sm'>{errors.password2?.message}</p>
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type='file'
                                {...register('pic')}
                                className='bg-blue-200 text-md w-full text-black rounded-md border border-blue-100 py-1 px-2 focus:outline-none'
                            />
                            <p className='text-red-900 text-sm'>{errors.pic?.message}</p>
                        </div>
                        <button className='text-md py-4 bg-blue-800 rounded-md'>Signup</button>
                    </div>
                </form>
            </div>

            <p className='text-sm'>
                Already registered? Login
                <Link to="/login">
                    <span className='italic font-semibold'>{` here`}</span>
                </Link>
            </p>
        </div>
    )
}

export default Signup