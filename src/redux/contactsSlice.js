import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { requestContacts, requestAddContact, requestDeleteContact } from 'helpers/api';

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await requestContacts();

      return contacts; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkAPI) => {
    try {
      const contact = await requestAddContact(newContact);

      return contact; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkAPI) => {
    try {
      const deletedContact = await requestDeleteContact(contactId);

      return deletedContact; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  
  name: 'contacts',
  
  initialState: INITIAL_STATE,

  extraReducers: builder =>
    builder
    // get contacts
      
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
     
    // add contact
   
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        if(Array.isArray(state.contacts)) {
          state.contacts.unshift(action.payload);
        } else {
          state.contacts = [action.payload]
        }
        // state.products = [action.payload, ...state.products];
        // state.products.push(action.payload);
      })
      

    // delete contact
      
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      

    .addMatcher(
      isAnyOf(
        fetchContacts.pending,
        addContact.pending,
        deleteContact.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
    
    

    .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected),
          (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          }
        )
      
});


export const contactsReducer = contactsSlice.reducer;