import { useDispatch, useSelector } from 'react-redux'
import { Suspense, lazy, useEffect } from 'react'
import { refreshThunk } from './redux/auth/operations'
import { Route, Routes } from 'react-router-dom'
import { RestrictedRoute } from './routes/RestrictedRoute'
import { PrivateRoute } from './routes/PrivateRoute'
import Home from './pages/Home/Home'
import Layout from './components/Layout/Layout'
import Loader from './components/Loader/Loader'
import { selectIsRefreshing } from './redux/auth/slice'
import { Toaster } from 'react-hot-toast'

const Registration = lazy(() => import('./pages/Registration/Registration'))
const Login = lazy(() => import('./pages/Login/Login'))
const Error = lazy(() => import('./pages/Error/Error'))
const PhoneBook = lazy(() => import('./pages/PhoneBook/PhoneBook'))


function App() {

	const dispatch = useDispatch()
	const isRefreshing = useSelector(selectIsRefreshing)

	useEffect(() => {
		dispatch(refreshThunk())
	}, [dispatch])
  return isRefreshing ? (
		<Loader />
  ) : (
    <Suspense fallback={null}>
           <Routes>
					<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='contacts' element={<PrivateRoute redirectTo="/login" component={<PhoneBook />} />} />
					<Route path='/login' element={ <RestrictedRoute redirectTo="/contacts" component={<Login />} />} />
          <Route path='/register' element={<RestrictedRoute redirectTo="/contacts" component={<Registration />} />} />
					</Route>
          <Route path='*' element={<Error />} />
        </Routes>
        <Toaster />
</Suspense>

  )
}

export default App