import style from "./App.module.css";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { Loader } from "./Loader/Loader";
import { selectError, selectIsLoading } from "redux/selectors";
import { useSelector } from "react-redux";

export const App = () => {
  
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  

    return (
      <div className={style['app-container']}>
        <h1>Phonebook</h1>
        <ContactForm/>
        <h2>Contacts</h2>
        <Filter />
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        <ContactList/>
      </div>
    );
  }


export default App;
