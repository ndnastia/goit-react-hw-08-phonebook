// Contacts selectors
import { createSelector } from "@reduxjs/toolkit";

const selectPhonebook = state => state.contact;

// export const selectContact = state => state.contact.contacts;
export const selectContact = createSelector(selectPhonebook, contact => contact.contacts);

// export const selectIsLoading = state => state.contact.isLoading;
export const selectIsLoading = createSelector(selectPhonebook, contact => contact.isLoading)

// export const selectError = state => state.contact.error;
export const selectError = createSelector(selectPhonebook, contact => contact.error)

// Filter selectors
export const selectFilter = state => state.filter;
