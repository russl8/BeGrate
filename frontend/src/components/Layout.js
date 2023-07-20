import { Outlet, NavLink } from "react-router-dom";
import { Typography, AppBar, Box, Button, Container } from "@mui/material";


export default function Layout({ isAuthenticated, handleLogout, userName, userId }) {
    return (
        <>
            <Container sx={{ mb: 8 }}>
                {isAuthenticated ? (
                    <AppBar sx={{ position: "fixed", }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: 4, my: 1, alignItems: "center" }}>


                            <NavLink to="/" style={{ textDecoration: "none" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.headline", mx: 4 }}>AAAAAAAA</Typography>
                            </NavLink>

                            <Box sx={{ display: "flex", alignItems: "center" }}>

                                <NavLink to="/posts" style={{ textDecoration: "none" }}>
                                    <Button variant="text" sx={{ bgcolor: "primary.button", textTransform: "none" }}>

                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.headline", mx: 4 }}>
                                            Create
                                        </Typography>
                                    </Button>

                                </NavLink>



                                <NavLink to={`/account/${userId} `} style={{ textDecoration: "none", color: "#078080", marginRight: "32px", marginLeft: "32px" }}>
                                    <Button variant="text" sx={{ bgcolor: "primary.button", textTransform: "none" }}>

                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.headline", mx: 4 }}>
                                            {userName()}
                                        </Typography>
                                    </Button>
                                </NavLink>




                                <Button sx={{  bgcolor: "primary.button" }} variant="text" onClick={handleLogout} style={{ textTransform: 'none' }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.buttonText", mx: 4 }}>
                                        Log out
                                    </Typography>
                                </Button>


                            </Box>
                        </Box>
                    </AppBar>
                ) : (
                    <AppBar sx={{ position: "fixed" }}>

                        <Box sx={{ display: "flex", alignItems: "center", mx: 8, my: 1, justifyContent: 'space-between' }}>

                            <div className="layoutLeft">

                                <NavLink to="/" style={{ textDecoration: "none" }}>

                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.headline" }}>
                                        AAAAAAAA
                                    </Typography>
                                </NavLink>
                            </div>
                            <div className="layoutRight">

                                <NavLink to="/login" style={{ textDecoration: "none" }}>
                                    <Button variant="text" sx={{ bgcolor: "primary.button", textTransform: "none" }}>

                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.headline" }}>
                                            Login
                                        </Typography>
                                    </Button>
                                </NavLink>
                            </div>
                        </Box>
                    </AppBar>
                )}
            </Container >

            <Outlet />
        </>
    );
}
