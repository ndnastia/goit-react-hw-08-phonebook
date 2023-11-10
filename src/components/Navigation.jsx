import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectAuthAuthenticated, selectAuthUserData } from "redux/auth.selectors";
import { logOutThunk } from "redux/authReducer";


const Naviagation = () => {
    const user = useSelector(selectAuthUserData);
    const authenticated = useSelector(selectAuthAuthenticated);

    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(logOutThunk());
    }


    return(
        <header>
            <nav>
            <Navigate to='/'>
                Home
            </Navigate>
            {authenticated ? 
            (<>
            <Navigate to='/contacts'>
                My contacts
            </Navigate>
            <div>
                <p>{user.email}</p>
                <button onClick={onLogOut}>Log Out</button>

            </div>
            </>) : 
            (<>
            <Navigate to='/login'>
                Login
            </Navigate>
            <Navigate to='/register'>
                Register
            </Navigate>
            </>)}
            </nav>
        </header>
    )
}

export default Naviagation;
