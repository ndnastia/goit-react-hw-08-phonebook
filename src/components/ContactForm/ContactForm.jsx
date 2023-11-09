
import style from "./ContactForm.module.css";

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from "redux/contactsSlice";
import { selectContact } from "redux/selectors";

export const ContactForm = () => {
    const contacts = useSelector(selectContact);
    
  
    
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();

        const name = event.currentTarget.elements.name.value;
        const phone = event.currentTarget.elements.number.value;
        
    
        const newContact = {
          name,
          phone, 
        };

        if (existingContact(contacts, newContact) !== undefined) {
            alert(`${name} is already in contacts`);
            return;
          }
    
        dispatch(addContact(newContact));
        event.currentTarget.reset();
    }

        const existingContact = (contacts, newContact) => {
            return contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());
        } 


 

        return (
            <div className={style['contact-container']}>
            <form onSubmit={handleSubmit}> 
                <h2>Name</h2>
                <label>
                    <input type="text" name="name" required />
                </label>
            
        <h2>Number</h2>
                <label>
                   <input type="tel" name="number" required /> 
            </label>
            
        <button type="submit">Add conact</button>
            </form>
        
        </div>
        )
    
}

export default ContactForm;