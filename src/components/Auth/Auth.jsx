import s from "./Auth.module.css"
import { NavLink } from "react-router-dom"


function Auth() {
  return (
    <div className={s.wrap}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </div>
  )
}

export default Auth