import s from "./ContactList.module.css"
import Contact from "../Contact/Contact"
import { useDispatch, useSelector } from "react-redux"
import { selectFilter } from "../../redux/filters/slice"
import { selectIsError, selectIsLoading } from "../../redux/contacts/slice"
import { useEffect } from "react"
import { fetchContactsThunk } from "../../redux/contacts/operations"
import { selectFilteredContacts } from "../../redux/selectors"


function ContactList() {

  const searchStr = useSelector(selectFilter)
  const isLoading = useSelector(selectIsLoading)
  const filteredData = useSelector(selectFilteredContacts)
  const isError = useSelector(selectIsError)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchContactsThunk())
  }, [dispatch])

  if (isLoading) {
    return <h2>Loading...</h2>
  } else if (!filteredData.length && searchStr) {
    return <h2 className={s.text}>No such contact exists...</h2>
  } else if (!filteredData.length) {
    return <h2 className={s.text}>No available contacts...</h2>
  }

  return (
    <>
      {!isError ? <ul className={s.list}>
        {filteredData.map(contact => (
          <Contact contact={contact} key={contact.id} />
      ))}
      </ul> : <h2 className={s.title}>Oops...something`s wrong</h2>}
    
    </>
  )
}

export default ContactList