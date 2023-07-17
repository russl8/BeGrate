import { NavLink } from "react-router-dom";
import React from "react"
export default function Login({ verifyAuth, loginPageErrorMessage }) {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(null)

    React.useEffect(() => {
        loginPageErrorMessage === "" ? setErrorMessage(null) : setErrorMessage(loginPageErrorMessage)
        console.log(loginPageErrorMessage, "hi")
    }, [])

    return (
        <>
            <div className="loginPage">
                <label htmlFor="username">Username</label>
                <input type="text"
                    className="usernameInput"
                    name="username"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                <label htmlFor="password">Password</label>
                <input type="password"
                    className="passwordInput"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <button onClick={() => verifyAuth(userName, password)}>Log In</button>
                <p>{errorMessage}</p>
                <p className="noAccountText">Don't have an account? <NavLink to="/sign-up">Sign Up</NavLink></p>
            </div>

        </>


    )
}