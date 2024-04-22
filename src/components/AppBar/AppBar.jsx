import s from './AppBar.module.css'
import { useSelector } from "react-redux"
import Navigation from "../Navigation/Navigation"
import { selectIsLoggedIn, selectUser } from "../../redux/auth/slice"
import UserMenu from "../UserMenu/UserMenu"
import Auth from "../Auth/Auth"


function AppBar() {
  const isLogged = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)
  return (
    <div className={s.wrap}>
      <Navigation />
      {isLogged && <h2 className={s.username}>{user.name}</h2>}
          {isLogged ? <UserMenu/> : <Auth/>}
    </div>
  )
}

export default AppBar