import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios, { all } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [alluser, setalluser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(" http://localhost:3424/users")
        .then((res)=>{
          setalluser(res.data)
          console.log(alluser);
        }).catch((err)=>{
          console.log(err);
        })
      
        
      }, [])
      const login = () =>{
         navigate("/login")
      }
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
                let exist = alluser.find((el)=> el.email == value.email);
                if (exist) {
                 toast.error("user already exist")
                }else{
                    axios.post("http://localhost:3424/users", value)
                    .then((res)=>{
                     console.log(res);
                     toast.success("signup successful")
                     navigate('/login')
                    }).catch((err)=>{
                     console.log(err);
                     toast.error("signup failed")
                    })
                }
           }
    })
    console.log(formik.errors);
  return (
    <>
      <div>
          <form className='mx-auto w-50 shadow p-5' onSubmit={formik.handleSubmit} action="" >
            <h1 className='text-center text-pimary'>Signup</h1>
            <div className='m-3'>
                <label htmlFor="firstname">First Name</label>
                <input name='firstname' onChange={formik.handleChange} className='form-control ' type="text" />
                <small className='text-danger'>{formik.errors.firstname}</small>
            </div>
            <div className='m-3'>
                <label htmlFor="lastname">Last Name</label>
                <input name='lastname' onChange={formik.handleChange} className='form-control' type="text" />
                <small className='text-danger'>{formik.errors.lastname}</small>
            </div>
            <div className='m-3'>
                <label htmlFor="email">Email</label>
                <input name='email' onChange={formik.handleChange} className='form-control' type="email" />  
                <small className='text-danger'>{formik.errors.email}</small>
            </div>
            <div className='m-3'>
                <label htmlFor="phone">Phone number</label>
                <input name='phonenumber' onChange={formik.handleChange} className='form-control' type="number" />  
                <small className='text-danger'>{formik.errors.phonenumber}</small>
            </div>
            <div className='m-3'>
                <label htmlFor="password">Password</label>
                <input name='password' onChange={formik.handleChange} className='form-control' type="password" />
                <small className='text-danger'>{formik.errors.password}</small>
            </div>
            <div className='m-3 text-center'>
                already have an account ? <button onClick={login}>Login</button>
                <button  className='btn btn-primary btn-large w-100'>Sign up</button>
                <ToastContainer />
            </div>
            
          </form>
      </div>
    </>
  )
}

export default Signup