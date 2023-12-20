import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [alluser, setalluser] = useState([])
    const [message, setmessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        // axios.get("http://localhost:6000/linkedin/signup")
        // .then((res)=>{
        //   setalluser(res.data)
        //   console.log(alluser);
        // }).catch((err)=>{
        //   console.log(err);
        // })
      
        
      }, [])
    
    const formik = useFormik({
        initialValues:{
            firstname: "",
            lastname:"",
            email: "",
            phonenumber:"",
            password: "",
           },
           validationSchema:yup.object({
            firstname:yup.string().min(5,"name too short").required("This field is required"),
            lastname:yup.string().required("this field is required"),
            email:yup.string().email("must be a valid email").required("This field is required"),
            phonenumber: yup.string().matches(/^[0-9]+$/, "Must be a valid number").required("This field is required"),
            password:yup.string().min(6, "password too short").max(8, "password too long").required("This field is required"),
           }),
           onSubmit: (value) => {
                console.log(value);
                try {
                  axios.post("http://localhost:5000/linkedin/signup",value)
                  .then((res)=>{
                   toast.success(res.data.message)
                   navigate('/login')
                  }).catch((err)=>{
                   toast.error(err.message)
                  })
                } catch (error) {
                  console.log(error);
                  toast.error(error)
                }   
           }
    })
  return (
    <>
      <div>
          <form className='mx-auto form shadow p-5 mt-5'  onSubmit={formik.handleSubmit} action="" >
            <h1 className='text-center fw-medium fs-5'>Sign Up</h1>
            <p className='fs-6 text-secondary text-center'>Create an account to continue</p>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="firstname">Firstname</label>
                <input name='firstname' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control ' type="text" />
                {formik.touched.firstname && formik.errors.firstname? <small className='text-danger'>{formik.errors.firstname}</small> : "" }
                
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="lastname">Lastname</label>
                <input name='lastname' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="text" />
                {formik.touched.lastname && formik.errors.lastname? <small className='text-danger'>{formik.errors.lastname}</small> : "" }
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="email">Email</label>
                <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="email" />  
                {formik.touched.email && formik.errors.email? <small className='text-danger'>{formik.errors.email}</small> : "" }
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="phone">Phonenumber</label>
                <input name='phonenumber' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="text" />  
                {formik.touched.phonenumber && formik.errors.phonenumber? <small className='text-danger'>{formik.errors.phonenumber}</small> : "" }
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="password">Password</label>
                <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="password" />
                {formik.touched.password && formik.errors.password? <small className='text-danger'>{formik.errors.password}</small> : "" }
            </div>
            <div className='mt-4 text-center'>
               <p className='text-center fw-medium fs-6 mt-2'> already have an account ? <Link to='/login' className='text-decoration-none fs-6'>Login</Link></p>
                <button  className='btn btn-primary btn-large w-100 py-2 pil'>Sign up</button>
                <ToastContainer />
            </div>
            
          </form>
      </div>
    </>
  )
}

export default Signup