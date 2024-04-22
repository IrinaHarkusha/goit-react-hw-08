import s from "./Login.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk } from "../../redux/auth/operations";

function Login() {
  const dispatch = useDispatch();

  const addSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .required("Required"),
  });
  const handleSubmit = (values) => {
    dispatch(loginThunk(values));
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={addSchema}
    >
      <Form className={s.form}>
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
          Log in
        </button>
        <p className={s.text}>
          You don`t have an account yet?
          <Link to="/register">Register</Link>
        </p>
      </Form>
    </Formik>
  );
}

export default Login;
