import { NavLink } from "react-router-dom";
import React from "react"
import { Container, Box, Typography, TextField, Button } from "@mui/material"
import { Error } from "@mui/icons-material"
export default function Login({ verifyAuth, loginPageErrorMessage }) {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        console.log(loginPageErrorMessage)
        setErrorMessage(loginPageErrorMessage)
        console.log(errorMessage)
        // loginPageErrorMessage.msg === "" ? setErrorMessage("") : setErrorMessage(loginPageErrorMessage.msg)
        // console.log(errorMessage)
    },)

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h4" sx={{ my: 2 }}>
                        Log In
                    </Typography>

                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        type="text"
                        className="usernameInput"
                        name="username"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        sx={{
                            width: 400, mb: 2,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "form.button"
                                }
                            },
                            "& label.Mui-focused": {
                                color: "form.button"
                            },
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        className="passwordInput"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        sx={{
                            width: 400, mb: 2,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "primary.link"
                                }
                            },
                            "& label.Mui-focused": {
                                color: "primary.link"
                            },
                        }}
                    />
                    {/* <input type="password"
                        className="passwordInput"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} /> */}
                    <Button
                        onClick={() => verifyAuth(userName, password)}
                        variant="contained"
                        sx={{
                            bgcolor: "form.button",
                            color: "form.buttonText",
                            textTransform: "none",
                            mb: 1
                        }}>
                        Log In
                    </Button>

                    <Typography sx={{
                        mb: 2,
                        width: 400,
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        Don't have an account?
                        <NavLink to="/sign-up" style={{ textDecoration: "none", color: "#6246ea" }}> Sign Up</NavLink>
                    </Typography>

                    <Typography
                        sx={{
                            m: 0,
                            display: "flex",
                            justifyContent: "center",
                            width: 400
                        }}>
                        {errorMessage ?
                            <Error sx={{ mr: 0.5, color: "form.button" }}></Error>
                            :
                            <></>
                        }
                        {errorMessage
                        }</Typography>


                </Box>
            </Container>

        </>


    )
}