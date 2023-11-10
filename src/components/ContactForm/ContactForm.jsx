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
            <div className={style['contact-container']}>
            <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Name:</span>
          <input {...register('name', { required: true })} type="text" />
          {errors.name && <span>This field is required</span>}
        </label>
        <label>
          <span>Number:</span>
          <input {...register('number', { required: true })} type="text" />
          {errors.number && <span>This field is required</span>}
        </label>

        <button type="submit">Add contact</button>
      </form>

        
        </div>
        )
    
}

export default ContactForm;