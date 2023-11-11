import style from "./App.module.css";

import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import { Loader } from './Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { userRefreshThunk} from 'redux/authReducer';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';

import { selectAuthIsLoading} from 'redux/auth.selectors';


const HomePage = lazy(() => import('pages/HomePage/HomePage'))
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'))



const appRoutes = [
  {path: '/', element: <HomePage />},

  {path: '/login', element:(
    <RestrictedRoute>
      <LoginPage />
    </RestrictedRoute>
  )},

  {path: '/register', element: (
    <RestrictedRoute>
      <RegisterPage />
    </RestrictedRoute>
  )},

    {path: '/contacts', element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    )}

]


export const App = () => {
  
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);

  useEffect(() => {
    dispatch(userRefreshThunk());
    
  }, [dispatch])
  

    return (
      <div className={style['app-container']}>
        <Navigation />
         {isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      )}
      </div>
    )
  }


export default App;
