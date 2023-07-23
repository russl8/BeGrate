import { Outlet, NavLink } from "react-router-dom";
import { Typography, AppBar, Box, Button, Container } from "@mui/material";


export default function Layout({ isAuthenticated, handleLogout, userName, userId }) {
    return (
        <>
            <Container sx={{ mb: 10 }}>
                {isAuthenticated ? (
                    <AppBar sx={{ position: "fixed", }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: 4, my: 2, alignItems: "center" }}>


                            <NavLink to="/" style={{ textDecoration: "none" }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.headline", mx: 4 }}>AAAA!</Typography>
                            </NavLink>

                            <Box sx={{ display: "flex", alignItems: "center" }}>

                                <NavLink to="/posts" style={{ textDecoration: "none" }}>
                                    <Button variant="text" sx={{
                                        textTransform: "none",
                                        '&:hover': {
                                            backgroundColor: '#D3D3D3'
                                        },
                                    }}>

                                        <Typography variant="p" sx={{ color: "primary.headline", fontWeight: "bold", }}>
                                            Create
                                        </Typography>
                                    </Button>

                                </NavLink>



                                <NavLink to={`/account/${userId} `} style={{ textDecoration: "none", color: "#078080", marginRight: "32px", marginLeft: "32px" }}>
                                    <Button variant="text" sx={{
                                        textTransform: "none", '&:hover': {
                                            backgroundColor: '#D3D3D3'
                                        },
                                    }}>

                                        <Typography variant="p" sx={{ fontWeight: "bold", color: "primary.headline", }}>
                                            @{userName()}
                                        </Typography>
                                    </Button>
                                </NavLink>





                                <Button
                                    sx={{
                                        mr: 4,
                                        '&:hover': {
                                            backgroundColor: '#D3D3D3'
                                        },
                                    }}
                                    variant="text"
                                    onClick={handleLogout}
                                    style={{ textTransform: 'none' }}
                                >
                                    <Typography variant="p" sx={{ fontWeight: "bold", color: "primary.buttonText", }}>
                                        Log Out
                                    </Typography>
                                </Button>


                            </Box>
                        </Box>
                    </AppBar>
                ) : (
                    <AppBar sx={{ position: "fixed", }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: 4, my: 2, alignItems: "center" }}>


                            <NavLink to="/" style={{ textDecoration: "none" }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.headline", mx: 4 }}>AAAA!</Typography>
                            </NavLink>


                            <NavLink to="/login" style={{ textDecoration: "none", marginRight: "32px" }}>
                                <Button variant="text" sx={{
                                    bgcolor: "primary.button", textTransform: "none", '&:hover': {
                                        backgroundColor: '#D3D3D3'
                                    },
                                }}>

                                    <Typography variant="p" sx={{ fontWeight: "bold", color: "primary.headline" }}>
                                        Login
                                    </Typography>
                                </Button>
                            </NavLink>

                        </Box>
                    </AppBar>
                )}
            </Container >
            <Outlet />
        </>
    );
}
