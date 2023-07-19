import { useNavigate } from "react-router-dom";
import React from "react"
import axios from "axios"
import uniqid from "uniqid"
export default function SignUp() {
    const navigate = useNavigate();

    const [RuserName, setRUserName] = React.useState("");
    const [Rpassword, setRPassword] = React.useState("");
    const [Remail, setREmail] = React.useState("");
    const [errors,setErrors] = React.useState([])
    //posting register data to form
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
            if (res.data === "User Created") {
                navigate("/")
            }
            setErrors(res.data.errors)
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
            <input type="email"
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
                <ul>
                    {errors?.errors?.map(err => <li key={uniqid()}>{err.msg}</li>)}
                </ul>
            <button onClick={register}>Sign Up</button>
        </div>
    )
}