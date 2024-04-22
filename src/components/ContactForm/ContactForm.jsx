import s from "./ContactForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContactThunk } from "../../redux/contacts/operations";


function ContactForm() {

  const dispatch = useDispatch()

  const addContact = (contact) => {
    dispatch(addContactThunk(contact))
  }

   const initialValues = {
    name: '',
    number: '',
  };
  
  const addSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too short')
      .max(50, 'Too long')
      .required('Required'),
    number: Yup.number()
      .min(100)
      .required('Required'),
  })

  const handleSubmit = (data, option) => {
    addContact(data)
    option.resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={addSchema}
    >
      <Form className={s.form}>
        <label>
          Name
          <Field
            name="name"
            className={s.input}
            type="text"
            placeholder="Enter name..."
          />
          <ErrorMessage component={s.span} className={s.red} name="name" />
        </label>
        <label>
          Number
          <Field
            name="number"
            className={s.input}
            type="text"
            placeholder="Enter number..."
          />
          <ErrorMessage component={s.span} className={s.red} name="number" />
        </label>
        <button type="submit" className={s.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  )
}

export default ContactForm;