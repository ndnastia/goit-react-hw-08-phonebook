// Products selectors
export const selectContact = state => state.contact.contacts;
export const selectIsLoading = state => state.contact.isLoading;
export const selectError = state => state.contact.error;

// Filter selectors
export const selectFilter = state => state.filter;