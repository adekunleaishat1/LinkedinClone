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
    const [isloading, setisloading] = useState(false)
    const navigate = useNavigate();
    let loader = `<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema: yup.object({
            email: yup.string().trim().email("Must be a valid email").required("Email is required"),
            password: yup.string().trim().required("Password is required"),
        }),
        onSubmit: (values)=> {
            const { email, password } = values;
            setisloading(true)
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/login`, values)
            .then((res)=>{
              setisloading(false)
                 toast.success(res.data.message)
                 localStorage.token = res.data.token
                 formik.setValues({
                  firstname:"",
                  lastname:"",
                  email:"",
                  phonenumber:"",
                  password:""
                 })
                 navigate('/preload')
                 setTimeout(() => {
                
                  navigate('/app');
                }, 5000);

            }).catch((err)=>{
              setisloading(false)
              let errormessage = err?.response?.data?.message
              toast.error(errormessage)
            })
          },
        
    })
   
  return (
    <>
       <div className='container'>
        {/* <h1 className='text-success fs-1 we'>welcome to your professional community</h1> */}
       <form className='mx-auto  shadow p-5 form mt-5' onSubmit={formik.handleSubmit} action="" >
            <h1 className='text-center fw-bold fs-4'>Sign in</h1>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="email">Email </label>
                <input value={formik.values.email} onBlur={formik.handleBlur} name='email' onChange={formik.handleChange} className='form-control' type="text" />  
                <small className='text-danger'>{formik.touched.email? formik.errors.email : ""}</small>
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="password">Password</label>
                <input value={formik.values.password} onBlur={formik.handleBlur} name='password' onChange={formik.handleChange} className='form-control' type="password" />
                <small className='text-danger'>{formik.touched.password? formik.errors.password: ""}</small>
            </div>
            <div className='m-3 text-center'>
                <button type='submit'  className='btn btn-primary btn-large w-100 py-2'>
                {isloading ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : "Sign in"}
                </button>
                <ToastContainer />
            </div>
            <p className='text-center fw-medium fs-6'>Don't have an account ? <Link to="/" className="fs-6 text-decoration-none ">Sign Up</Link></p>
            
          </form>
       </div>
    </>
  )
}

export default Login