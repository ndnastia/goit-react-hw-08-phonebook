import ContactList from "components/ContactList/ContactList";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "components/Filter/Filter";
import style from "pages/ContactsPage/ContactsPage.module.css"

const ContactsPage = () => {
    return (
        <div className={style['container']}>
            <h2>Phonebook</h2>
            <ContactForm />
            <h2>Contacts</h2>
            <Filter />
            <ContactList />
        </div>
    )
}

export default ContactsPage;