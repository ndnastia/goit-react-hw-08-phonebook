import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectAuthAuthenticated, selectAuthUserData } from "redux/auth.selectors";
import { logOutThunk } from "redux/authReducer";



const Navigation = () => {
    const user = useSelector(selectAuthUserData);
    const authenticated = useSelector(selectAuthAuthenticated);

    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(logOutThunk());
    }


    return(
        <header>
            <nav>
            <NavLink to='/'>
                Home
            </NavLink>
            {authenticated ? 
            (<>
            <NavLink to='/contacts'>
                My contacts
            </NavLink>
            <div>
                <p>{user.email}</p>
                <button onClick={onLogOut}>Log Out</button>

            </div>
            </>) : 
            (<>
            <NavLink to='/login'>
                Login
            </NavLink>
            <NavLink to='/register'>
                Register
            </NavLink>
            </>)}
            </nav>
        </header>
    )
}

export default Navigation;
