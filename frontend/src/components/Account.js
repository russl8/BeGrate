import { useParams, NavLink } from "react-router-dom"
import React from "react"
import axios from "axios"
import uniqid from "uniqid"
import { Container, Box, Typography, Grid, Paper, TextField, MenuItem } from "@mui/material"

const sortCategories = ["Newest First", "Oldest First", "Most Liked"]
export default function Account() {
    const params = useParams();
    // fetch account using useEffect and params.id -> save account details in state
    const [accountDetails, setAccountDetails] = React.useState({});
    const [allPosts, setAllPosts] = React.useState([]);
    const [sortMethod, setSortMethod] = React.useState("Newest First")

    React.useEffect(() => {

        axios({
            method: "GET",
            url: `http://localhost:3001/account/${params.id}`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => {
            setAccountDetails(res.data)
            setAllPosts(res.data.posts)
        })

    }, [params.id])

    React.useEffect(() => {

        // console.log(sortMethod)
        //fetch to backend, pass sort method
        axios({
            method: "POST",
            url: `http://localhost:3001/account/${params.id}`,
            withCredentials: true,
            data: { sortMethod: sortMethod },
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }


        }).then(res => {
            console.log(res.data)
            setAllPosts(res.data)
        })


        //in baclkend... use switch statement
        //fetch from database based on the sort method
        //res.json back to server
        //in server, update the allPosts state

    }, [sortMethod])
    return (
        <Container >
            {
                accountDetails.status === "success"
                    ?
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"

                    }}>
                        <Typography variant="h3">{accountDetails.user.username}</Typography>
                        <Typography variant="h6">{accountDetails.user.email}</Typography>


                        <TextField
                            select
                            label="Sort by"
                            sx={{
                                width: 400,
                                color: "#232323",
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "form.label"
                                    }
                                },
                                "& label.Mui-focused": {
                                    color: "form.label"
                                },

                            }}
                            value={sortMethod}
                            onChange={(e) => { setSortMethod(e.target.value); }}
                        >
                            {sortCategories.map(cat => (
                                <MenuItem key={uniqid()} value={cat} sx={{ color: "#232323" }}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>


                        <Grid sx={{ width: "100%", p: 3 }} container spacing={{ md: 2 }} columns={{ xs: 4,sm: 4, md: 8, lg: 12 }}>
                            {allPosts.map(post => {
                                return (


                                    <Grid
                                        item
                                        xs={4}
                                        sm={4}
                                        md={4}
                                        lg={4}
                                        columns={4}
                                        sx={{

                                            width: 20,
                                            height: 300,
                                            overflow:"hidden",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                        className="wadadawd"
                                        zeroMinWidth
                                        key={uniqid()}
                                    >

                                        <NavLink to={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
                                            <Paper sx={{
                                                height: 250,
                                                width: { xs: 350,md: 350, sm: 400, lg: 325 },
                                                overflow: 'clip',                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                p: 1
                                            }}>
                                                <Typography variant="h6" sx={{ fontWeight: "bold" }}> {post.title}</Typography   >
                                                <Typography variant="body1" >{post.content}</Typography>
                                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                    <Typography variant="body2">{post.dateCreated}</Typography>
                                                    <Typography variant="body2">{post.likes.length} {post.likes.length === 1 ? "like" : "likes"} </Typography>

                                                </Box>
                                            </Paper>

                                        </NavLink>
                                    </Grid>



                                )


                            })}
                        </Grid>
                    </Box>


                    :
                    <>
                        {/* <h1 className="postDNE">Page does not exist :&#40;</h1> */}

                    </>

            }

        </Container>
    )
}