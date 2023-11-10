import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {deleteContact, fetchContacts} from 'redux/contactsSlice';
import { selectContact, selectFilter} from 'redux/selectors';


const ContactList = () => {
  const contacts = useSelector(selectContact);
  const filterTerm = useSelector(selectFilter);
  
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


    // const lowerCase = filtered.toLowerCase();
    // const filteredContacts = phonebooks.filter(phonebook =>
    //     (phonebook.name.toLowerCase().includes(lowerCase)));
  
    // const deletedContact = (contactId) => {
    //     dispatch(deleteContact(contactId))
    // };

    const handleDeleteContact = contactId => {
      dispatch(deleteContact(contactId));
    };
  
   
  
    const filteredContacts =
      contacts !== null &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filterTerm.toLowerCase().trim())
      );
    

    return (
      
      
        <div>
        {filteredContacts && filteredContacts.map(({name, number, id})=> {
          return (
            <div key={id}>
          <span>{name}: </span>
          <span>{number}</span>
          <button
            type="button"
            
            onClick={() => handleDeleteContact(id)}
          >
            Delete
          </button>
        </div>
          )
        }   
        )}
      </div>
 
      
    )
  }

    



export default ContactList;