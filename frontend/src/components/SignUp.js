import { useNavigate } from "react-router-dom";
import React from "react"
import axios from "axios"
export default function SignUp() {
    const navigate = useNavigate();

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

        <div className="register">
            <label htmlFor="Rusername">Username</label>
            <input type="text"
                className="RusernameInput"
                name="RuserName"
                value={RuserName}
                onChange={(e) => {
                    setRUserName(e.target.value)
                }} />
            <label htmlFor="Remail">Email</label>
            <input type="text"
                className="RemailInput"
                name="Remail"
                value={Remail}
                onChange={(e) => {
                    setREmail(e.target.value)
                }} />
            <label htmlFor="Rpassword">Password</label>
            <input type="password"
                className="RpasswordInput"
                name="Rpassword"
                value={Rpassword}
                onChange={(e) => {
                    setRPassword(e.target.value)
                }} />
            <button onClick={register}>Sign Up</button>
        </div>
    )
}