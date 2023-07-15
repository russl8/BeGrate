import { useNavigate } from "react-router-dom";
import React from "react"
import axios from  "axios"

export default function Login({ verifyAuth }) {
    const navigate = useNavigate();
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [RuserName, setRUserName] = React.useState("");
    const [Rpassword, setRPassword] = React.useState("");
    const [Remail, setREmail] = React.useState("");

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
        }).then(res => {
            console.log(res.data)
            if (res.data === "User Created") {
                navigate("/")
            }
        })
    }
    return (
        <>
            <div className="register">
                <label htmlFor="Rusername">RUsername</label>
                <input type="text"
                    className="RusernameInput"
                    name="RuserName"
                    value={RuserName}
                    onChange={(e) => {
                        setRUserName(e.target.value)
                    }} />
                <label htmlFor="Remail">Remail</label>
                <input type="text"
                    className="RemailInput"
                    name="Remail"
                    value={Remail}
                    onChange={(e) => {
                        setREmail(e.target.value)
                    }} />
                <label htmlFor="Rpassword">RPassword</label>
                <input type="password"
                    className="RpasswordInput"
                    name="Rpassword"
                    value={Rpassword}
                    onChange={(e) => {
                        setRPassword(e.target.value)
                    }} />
                <button onClick={register}>Log In</button>
            </div>


            <div className="login">
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
            </div>

        </>


    )
}