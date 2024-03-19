import React, { useEffect, useState } from 'react';
import { registerUser } from '../api';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

export const Register = () => {

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [c_password, setCPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        c_password: '',
      },
      validationSchema: Yup.object({
        name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(55, 'Name must be at most 55 characters'),
        email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
        password: Yup.string()
        .min(8, 'Password must be at least 8 characters') 
        .matches(/(?=.*[0-9])/, 'Password must contain a number') 
        .required('Password is required'),
        c_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password is required'),
      }),
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const response = await registerUser(values.name, values.email, values.password, values.c_password);
          console.log( response.data.message);
       
          setLoading(false);
          toast.success('User register successfuly.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setTimeout(() => {
            navigate('/Login');
          }, 4000);
         
        } catch (error) {
          setLoading(false);
          const errorMessage = error.response.data.message || error.message;
          toast.error(errorMessage,{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.error(error);
        }
      },
    });


    const goToLogin = () => {
      navigate('/Login');
    };

  

    const togglePassword = () => {
        setShowPassword(!showPassword);
      };

    return(
        <>
        <div className={`flex h-screen dark:bg-slate-900 ${loading ? 'cursor-wait' : ''}`}>
        <div className="w-full max-w-xl p-5 m-auto font-sans rounded bg-slate-400">   
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
              <header>
                <img className="w-20 mx-auto mb-5 stroke-current" src={Logo} />
                <h1 className='text-4xl font-bold text-center text-gray-100 '>Register</h1>
              </header>   
            <form className="gap-4 md:grid md:grid-cols-2" onSubmit={formik.handleSubmit}>
                <div>
                    <label for="name" className="block mb-2 text-sm font-medium text-white dark:text-black">Full Name</label>
                    <input type="text" id="name" name='name' 
                    
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                    {formik.touched.name && formik.errors.name ? (
                      <div className='text-red-600'>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-white dark:text-black">Email</label>
                    <input type="text" id="email" name='email' 
                    
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                      {formik.touched.email && formik.errors.email ? (
                          <div className='text-red-600'>{formik.errors.email}</div>
                        ) : null}
                </div>
                <div>
                    <label for="password" className="block mb-2 text-sm font-medium text-white dark:text-black">Password</label>
                    <input type={showPassword ? "text" : "password"} name='password' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='text-red-600'>{formik.errors.password}</div>
                      ) : null}
                </div>
                <div>
                    <label for="c_password" className="block mb-2 text-sm font-medium text-white dark:text-black">Confirm Password</label>
                    <input type={showPassword ? "text" : "password"} id="c_password" name='c_password' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.c_password }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" required />
                    {formik.touched.c_password && formik.errors.c_password ? (
                      <div className='text-red-600'>{formik.errors.c_password}</div>
                    ) : null}
                </div>
                <div className="flex items-center justify-between ">
                    <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" onChange={togglePassword}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-1 text-sm">
                      <label for="remember" className="text-white cursor-pointer dark:text-gray-300">Show Password</label>
                    </div>
                  </div>
                </div>
            <div className="col-span-2">          
                <input className={`w-full px-4 py-2 mb-6 font-bold text-white bg-indigo-500 rounded hover:bg-slate-900 ${loading ? 'cursor-wait' : 'cursor-pointer'}`} type="submit" />
            </div>     
               
              </form>  
              <footer>
                <a className="float-left text-sm text-white underline cursor-pointer hover:text-blue-900" onClick={goToLogin}>Back to Login</a>
              </footer>   
            </div>
        </div>
        <ToastContainer />
       
        </>
    );
}