import { Outlet, NavLink } from "react-router-dom";

export default function Layout({ isAuthenticated, handleLogout , userName}) {

   

    return (
        <>
            {isAuthenticated ? (
                <div className="layout">
                    <div className="layoutLeft">
                        <NavLink to="/">AAAAAAAA</NavLink>
                    </div>
                    <div className="layoutRight">
                        <NavLink to="/posts">Create</NavLink>
                        <NavLink to="/account">{userName}</NavLink>
                        <button className="logout" onClick = {handleLogout}>Log out</button>
                    </div>
                </div>
            ) : (
                <div className="layout">
                    <div className="layoutLeft">
                        <NavLink to="/">AAAAAAAA</NavLink>
                    </div>
                    <div className="layoutRight">
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
            )}

            <Outlet />
        </>
    );
}
