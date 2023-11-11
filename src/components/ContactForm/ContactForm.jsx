import React from "react";
import style from "./ContactForm.module.css";
import { useForm } from "react-hook-form";

import { useDispatch } from 'react-redux';
import { addContact } from "redux/contactsSlice";


export const ContactForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    
    const dispatch = useDispatch();

    

    const onSubmit = contact => {
        dispatch(addContact(contact));
        reset();
      };

        return (
            <div >
            <form className={style['contact-container']} onSubmit={handleSubmit(onSubmit)}>
        <label>
          
          <input {...register('name', { required: true })} type="text" placeholder="Name"/>
          {errors.name && <span>This field is required</span>}
        </label>
        <label>
          
          <input {...register('number', { required: true })} type="text" placeholder="number"/>
          {errors.number && <span>This field is required</span>}
        </label>

        <button type="submit">Add contact</button>
      </form>

        
        </div>
        )
    
}

export default ContactForm;