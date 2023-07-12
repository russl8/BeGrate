import { Outlet, NavLink } from "react-router-dom";

export default function Layout({ isAuthenticated }) {
    return (
        <>
            {isAuthenticated ? (
                <div className="layout">
                    <div className="layoutLeft">
                        <NavLink to="/">BeGrate!</NavLink>
                    </div>
                    <div className="layoutRight">
                        <NavLink to="/posts">Create</NavLink>
                        <NavLink to="/account">Account</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                    </div>
                </div>
            ) : (
                <div className="layout">
                    <div className="layoutLeft">
                        <NavLink to="/">BeGrate!</NavLink>
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
