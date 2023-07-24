import { Outlet, NavLink } from "react-router-dom";
import { Typography, AppBar, Box, Button, Container, useTheme, useMediaQuery } from "@mui/material";


export default function Layout({ isAuthenticated, handleLogout, userName, userId }) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <>
            <Container sx={{ mb: 10 }}>
                {isAuthenticated ? (
                    <AppBar sx={{ position: "fixed", }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: { xs: -3, sm: 4, md: 4, lg: 4 }, my: 2, alignItems: "center" }}>


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

                                {/* { xs: 1, sm: 4, md: 4, lg: 4 } */}
                                <Box sx={{
                                    mx: { xs: 1, sm: 4, md: 4, lg: 4 }
                                }}>
                                    <NavLink to={`/account/${userId} `} style={{ textDecoration: "none", color: "#078080" }}>
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
                                </Box>

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
                                    <Typography variant="p" sx={{ fontWeight: "bold", color: "primary.headline", }}>
                                        Log Out
                                    </Typography>
                                </Button>


                            </Box>
                        </Box>
                    </AppBar>
                ) : (
                    <AppBar sx={{ position: "fixed", }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mx: { xs: -3, sm: 4, md: 4, lg: 4 }, my: 2, alignItems: "center" }}>


                            <NavLink to="/" style={{ textDecoration: "none" }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.headline", mx: 4 }}>AAAA!</Typography>
                            </NavLink>


                            <NavLink to="/login" style={{ textDecoration: "none", marginRight: "32px" }}>


                                <Button
                                    sx={{

                                        '&:hover': {
                                            backgroundColor: '#D3D3D3'
                                        },
                                    }}
                                    variant="text"
                                    style={{ textTransform: 'none' }}
                                >


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
