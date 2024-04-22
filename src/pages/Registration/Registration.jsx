import s from "./Registration.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { registerThunk } from "../../redux/auth/operations"

function Registration() {

    const dispatch = useDispatch()
    
    const addSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Must be more than 3 characters').required('Required'),
        password: Yup.string().min(7, 'Must be more than 7 characters').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
  })
const handleSubmit = values => {
    dispatch(registerThunk(values))
  }

    const initialValues = {
    name: '',
    password: '',
    email: '',
  };
  


  return (
    <div className={s.auth_wrap}>
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
              <ErrorMessage component={"p"} className={s.red} name="name" />
            </label>
            <label>
              Email
              <Field
                name="email"
                className={s.input}
                type="text"
                placeholder="Enter email..."
              />
              <ErrorMessage component={"p"} className={s.red} name="email" />
                  </label>
                  <label>
              Password
              <Field
                name="password"
                className={s.input}
                type="password"
                placeholder="Enter password..."
              />
              <ErrorMessage component={"p"} className={s.red} name="password" />
            </label>
            <button type="submit" className={s.btn}>
              Register
                  </button>
                  <p className={s.text}>Do you have an account?<Link to= '/register'>Log in</Link>
                </p>
          </Form>
        </Formik>
    </div>
  )
}

export default Registration