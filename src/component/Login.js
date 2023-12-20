import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [currentuser, setcurrentuser] = useState()
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema: yup.object({
            email: yup.string().email("Must be a valid email").required("Email is required"),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: (values)=> {
            const { email, password } = values;
            axios.post("http://localhost:5000/linkedin/login", values)
            .then((res)=>{
                 toast.success(res.data.message)
                 localStorage.token = res.data.token
                 navigate('/preload')
                 setTimeout(() => {
                
                  navigate('/app');
                }, 5000);

            }).catch((err)=>{
              toast.error(err.message)
            })
            // const user = currentuser.find((user) => user.email === email);
            // if (user) {
            //   if (user.password === password) {
            //     console.log("User logged in successfully");
            //     toast.success("signedin successfully")
            //     console.log(user);
            //     console.log(user.id);
            //     navigate(`/app/${user.id}`)
            //     // navigate('/app?user=' + JSON.stringify(user))
            //   } else {
            //     toast.error("password does not match");
            //   }
            // } else {
            //   toast.error("User not found");
            // }
          },
        
    })
   
  return (
    <>
       <div className='container'>
        {/* <h1 className='text-success fs-1 we'>welcome to your professional community</h1> */}
       <form className='mx-auto  shadow p-5 form mt-5' onSubmit={formik.handleSubmit} action="" >
            <h1 className='text-center fw-bold fs-6'>Signin</h1>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="email">Email </label>
                <input name='email' onChange={formik.handleChange} className='form-control' type="text" />  
                <small className='text-danger'>{formik.errors.email}</small>
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="password">Password</label>
                <input name='password' onChange={formik.handleChange} className='form-control' type="password" />
                <small className='text-danger'>{formik.errors.password}</small>
            </div>
            <div className='m-3 text-center'>
                <button type='submit'  className='btn btn-primary btn-large w-100 py-2'>Sign in</button>
                <ToastContainer />
            </div>
            <p className='text-center fw-medium fs-6'>Don't have an account ? <Link to="/" className="fs-6 text-decoration-none ">Sign Up</Link></p>
            
          </form>
       </div>
    </>
  )
}

export default Login