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
    const [isloading, setisloading] = useState(false)

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
            firstname:yup.string().trim().min(5,"name too short").required("This field is required"),
            lastname:yup.string().trim().required("this field is required"),
            email:yup.string().trim().email("must be a valid email").required("This field is required"),
            phonenumber: yup.string().trim().matches(/^[0-9]+$/, "Must be a valid number").required("This field is required"),
            password:yup.string().trim()
            .test(
              'has-uppercase',
              'Password must contain at least one uppercase letter',
              (value) => /[A-Z]/.test(value || '')
            ).test(
              'has-lowercase',
              'Password must contain at least one lowercase letter',
              (value) => /[a-z]/.test(value || '')
            ).test(
              'has-special-char',
              'Password must contain at least one special character (!@#$%^&*)',
              (value) => /[!@#$%^&*()]/.test(value || '')
            ) .min(8, 'Password must be at least 8 characters long')
            .required("This field is required"),
           }),
           onSubmit: (value) => {
                console.log(value);
                setisloading(true)
                try {
                  axios.post(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/signup`,value)
                  .then((res)=>{
                    setisloading(false)
                   toast.success(res.data.message)
                   navigate('/login')
                   formik.setValues({
                    firstname:"",
                    lastname:"",
                    email:"",
                    phonenumber:"",
                    password:""
                   })
                  }).catch((err)=>{
                    setisloading(false)
                    let errormessage = err?.response?.data?.message
                   toast.error(errormessage)
                  
                  })
                } catch (error) {
                  setisloading(false)
                  console.log(error);
                  let errormessage = error?.response?.data?.message
                  toast.error(errormessage)
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
                <input value={formik.values.firstname} name='firstname' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control ' type="text" />
                {formik.touched.firstname && formik.errors.firstname? <small className='text-danger'>{formik.errors.firstname}</small> : "" }
                
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="lastname">Lastname</label>
                <input value={formik.values.lastname} name='lastname' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="text" />
                {formik.touched.lastname && formik.errors.lastname? <small className='text-danger'>{formik.errors.lastname}</small> : "" }
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="email">Email</label>
                <input value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="email" />  
                {formik.touched.email && formik.errors.email? <small className='text-danger'>{formik.errors.email}</small> : "" }
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="phone">Phonenumber</label>
                <input value={formik.values.phonenumber} name='phonenumber' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="text" />  
                {formik.touched.phonenumber && formik.errors.phonenumber? <small className='text-danger'>{formik.errors.phonenumber}</small> : "" }
            </div>
            <div className='m-3'>
                <label className='fw-medium fs-6' htmlFor="password">Password</label>
                <input value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type="password" />
                {formik.touched.password && formik.errors.password? <small className='text-danger'>{formik.errors.password}</small> : "" }
            </div>
            <div className='mt-4 text-center'>
               <p className='text-center fw-medium fs-6 mt-2'> already have an account ? <Link to='/login' className='text-decoration-none fs-6'>Login</Link></p>
                <button type='submit'  className='btn btn-primary btn-large w-100 py-2 pil'>
                {isloading ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : "Sign up"}
                </button>
                <ToastContainer />
            </div>
            
          </form>
      </div>
    </>
  )
}

export default Signup