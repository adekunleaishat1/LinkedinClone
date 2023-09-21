import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [currentuser, setcurrentuser] = useState()
    const navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3424/users")
      .then((res)=>{
        setcurrentuser(res.data)
        console.log(currentuser);
      }).catch((err)=>{
        console.log(err);
      })
    
     
    }, [])

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
            const user = currentuser.find((user) => user.email === email);
            if (user) {
              if (user.password === password) {
                console.log("User logged in successfully");
                toast.success("signedin successfully")
                console.log(user);
                console.log(user.id);
                navigate(`/app/${user.id}`)
                // navigate('/app?user=' + JSON.stringify(user))
              } else {
                toast.error("password does not match");
              }
            } else {
              toast.error("User not found");
            }
          },
        
    })
    console.log(formik.errors);
  return (
    <>
       <div className='container'>
        <h1 className='text-success fs-1 we'>welcome to your professional community</h1>
       <form className='mx-auto w-50 shadow p-5' onSubmit={formik.handleSubmit} action="" >
            <h1 className='text-center text-pimary'>Signin</h1>
            <div className='m-3'>
                <label htmlFor="email">Email or phonenumber</label>
                <input name='email' onChange={formik.handleChange} className='form-control' type="text" />  
                <small className='text-danger'>{formik.errors.email}</small>
            </div>
            <div className='m-3'>
                <label htmlFor="password">Password</label>
                <input name='password' onChange={formik.handleChange} className='form-control' type="password" />
                <small className='text-danger'>{formik.errors.password}</small>
            </div>
            <div className='m-3 text-center'>
                <button  className='btn btn-primary btn-large w-100'>Sign in</button>
                <ToastContainer />
            </div>
            
          </form>
       </div>
    </>
  )
}

export default Login