import s from "./Navigation.module.css"
import { NavLink } from "react-router-dom"


function Navigation() {
  return (
    <div className={s.wrap}>
      <NavLink to='/'>Home</NavLink>
    </div>
  )
}

export default Navigation