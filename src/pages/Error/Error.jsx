import s from './Error.module.css'
import { Link } from "react-router-dom"


function Error() {

    return (
		<div className={s.error}>
			<h1 className={s.title}>Page not found</h1>
			<Link to='/'>Go to homepage!</Link>
		</div>
	)
  
}

export default Error