import s from './PhoneBook.module.css'
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";


function PhoneBook () {

  return (
    <div className={s.wrapper}>
      <h1>PhoneBook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList/>
    </div>
  );
}

export default PhoneBook