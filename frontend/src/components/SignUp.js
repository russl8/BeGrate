import { useNavigate } from "react-router-dom";
import React from "react"
import axios from "axios"
import uniqid from "uniqid"
import { Box, Button, Container, Typography, TextField } from "@mui/material"
import { Error } from "@mui/icons-material"



export default function SignUp({backendUrl}) {
    const navigate = useNavigate();

    const [RuserName, setRUserName] = React.useState("");
    const [Rpassword, setRPassword] = React.useState("");
    const [Remail, setREmail] = React.useState("");
    const [errors, setErrors] = React.useState([])
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
            url: backendUrl+"/sign-up"
        }).then(res => {
            if (res.data === "User Created") {
                navigate("/")
            }
            setErrors(res.data.errors)
        })
    }

    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" sx={{ my: 2 }}>
                    Sign Up
                </Typography>

                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    type="text"
                    className="RusernameInput"
                    name="RuserName"
                    value={RuserName}
                    onChange={(e) => {
                        setRUserName(e.target.value)
                    }}
                    sx={{
                        width: "100%", mb: 2, "& label.Mui-focused": {
                            color: "primary.link"
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "primary.link"
                            }
                        }
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    className="RemailInput"
                    name="Remail"
                    value={Remail}
                    onChange={(e) => {
                        setREmail(e.target.value)
                    }}
                    sx={{
                        width:  "100%",
                        mb: 2,
                        "& label.Mui-focused": {
                            color: "primary.link"
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "primary.link"
                            }
                        }
                    }}


                />

                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    className="RpasswordInput"
                    name="Rpassword"
                    value={Rpassword}
                    onChange={(e) => {
                        setRPassword(e.target.value)
                    }}
                    sx={{
                        width: "100%", mb: 2, "& label.Mui-focused": {
                            color: "primary.link"
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "primary.link"
                            }
                        }
                    }}

                />
                <Button onClick={register} variant="contained" sx={{ bgcolor: "form.button", color:"form.buttonText",textTransform: "none" }}>Sign Up</Button>

                <Box sx={{
                    mt: 2
                }}>

                    {errors?.errors?.map(err =>
                        <Typography
                         key={uniqid()}
                         sx={{
                            display:"flex",
                            justifyContent:"flex-start",
                            width:  "100%",
                            mb:1
                            
                         }}
                         >
                            <Error
                                sx={{
                                    mr: 0.5,
                                    color: "form.button"
                                }}></Error>
                            {err.msg}
                        </Typography>
                    )}

                </Box>

            </Box>
        </Container>
    )
}