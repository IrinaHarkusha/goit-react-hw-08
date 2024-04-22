import s from "./UserMenu.module.css"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutThunk } from "../../redux/auth/operations"

function UserMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className={s.wrap}>
      <NavLink to="/contacts">PhoneBook</NavLink>
      <button className={s.btn} onClick={() => {
        navigate('/')
        dispatch(logoutThunk())
        
      }}>Log out</button>
    </div>
  )
}

export default UserMenu