import React from "react";
import style from 'pages/LoginPage/LoginPage.module.css'
import { useDispatch } from "react-redux";
import { registerThunk } from "redux/authReducer";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const dispatch = useDispatch();

      const onSubmit = data => {
        dispatch(registerThunk(data))
        reset();
      };

        return (
          <div className={style['container']}>
            <form className={style['form']} onSubmit={handleSubmit(onSubmit)}>

              <p className={style['form-text']}>Register</p>
              
                
                <input {...register('email', { required: true })} type="email" placeholder="Email"/>
                {errors.email && <span>This field is required</span>}
              
             
                
                <input {...register('name', { required: true })} type="text" placeholder="Name"/>
                {errors.name && <span>This field is required</span>}
             
              
                <input
                  {...register('password', { required: true, minLength: 7 })}
                  type="password" placeholder="Password"
                />
                {errors.password && <span>This field is required</span>}
              
        
              <button type="submit">Sign Up</button>
            </form>
            <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4"></div>
        <div className="drop drop-5"></div>
        </div>
          </div>
            
          );
        };
        
 



export default RegisterPage;