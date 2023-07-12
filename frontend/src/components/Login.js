import { NavLink } from "react-router-dom"
import React from "react"
import axios, { Axios } from "axios"

export default function Login() {

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [RuserName, setRUserName] = React.useState("");
    const [Rpassword, setRPassword] = React.useState("");
    const [Remail, setREmail] = React.useState("");
    const login = () => {
        axios({

            method: "POST",
            data: {
                username: userName,
                password: password
            },
            withCredentials: true,
            url: "http://localhost:3001/login"
        }).then(res => console.log(res))
    }
    const register = () => {
        axios({
            method: "POST",
            data: {
                username: RuserName,
                password: Rpassword,
                email: Remail
            },
            withCredentials: true,
            url: "http://localhost:3001/sign-up"
        }).then(res => console.log(res))
    }
    return (
        <>
            <div className="register">
                <label htmlFor="username">RUsername</label>
                <input type="text"
                    className="username"
                    name="RuserName"
                    value={RuserName}
                    onChange={(e) => {
                        setRUserName(e.target.value)
                    }} />
                <label htmlFor="Remail">Remail</label>
                <input type="text"
                    className="Remail"
                    name="Remail"
                    value={Remail}
                    onChange={(e) => {
                        setREmail(e.target.value)
                    }} />
                <label htmlFor="Rpassword">RPassword</label>
                <input type="password"
                    className="Rpassword"
                    name="Rpassword"
                    value={Rpassword}
                    onChange={(e) => {
                        setRPassword(e.target.value)
                    }} />
                <button onClick={register}>Log In</button>
            </div>


            <div className="login">
                <label htmlFor="username">Username</label>
                <input type="text" className="username"
                    name="username"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                <label htmlFor="password">Password</label>
                <input type="password"
                    className="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <button onClick={login}>Log In</button>
            </div>

        </>


    )
}