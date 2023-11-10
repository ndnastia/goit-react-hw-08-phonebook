import ContactList from "components/ContactList/ContactList";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "components/Filter/Filter";

const ContactsPage = () => {
    return (
        <div>
            <h2>Phonebook</h2>
            <ContactForm />
            <h2>Contacts</h2>
            <Filter />
            <ContactList />
        </div>
    )
}

export default ContactsPage;