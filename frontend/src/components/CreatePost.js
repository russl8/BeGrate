import React from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid"
import { Container, TextField, Checkbox, Typography, Button, FormControlLabel, Box } from "@mui/material";
import "../styles/CreatePost.css"

export default function CreatePost() {
    const navigate = useNavigate();
    //make a form for title, content, and isPrivate
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");
    const [postIsPrivate, setPostIsPrivate] = React.useState(false)
    const [canCreatePost, setCanCreatePost] = React.useState(false)
    const [errors, setErrors] = React.useState([])
    const [username, setUsername] = React.useState("");

    React.useEffect(() => {
        //make sure that the user actually exists
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/posts",
            //needed to verify token in backend. remember to json.parse the token :D
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => {
            setCanCreatePost(res.data.canPost)
            setUsername(res.data.username)

        })
        // then they can access the page
    }, [])
    const handleCreatePost = () => {
        // make a request to /posts POST with post info
        axios({
            method: "POST",
            data: {
                title: postTitle,
                content: postContent,
                isPrivate: postIsPrivate
            },
            withCredentials: true,
            url: "http://localhost:3001/posts",
            //needed to verify token in backend. remember to json.parse the token :D
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => {
            // console.log(res.data)
            // if the post is posted, redirect user to the post page.
            if (res.data.postStatus === "Success") {
                navigate(`/posts/${res.data.postID}`)
            } else {
                //getting the error messages from server then storing it in state
                setErrors(res.data.errors.errors);
                // console.log(errors)
            }
        })
    }

    return (
        <>
            {
                canCreatePost
                    ?
                    <Container sx={{
                        pt: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>


                        <Container
                            disableGutters
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                width: 400,
                                mb: 1
                            }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                @{username} is creating a post...
                            </Typography>
                        </Container>

                        <TextField
                            id="outlined-basic"
                            label="Your day in one word..."
                            variant="outlined"
                            type="postTitle"
                            className="postTitleInput"
                            name="postTitle"
                            value={postTitle}
                            onChange={(e) => {
                                // setPostTitle(e.target.value)
                                setPostTitle(e.target.value.replace(/\s/g, ''));

                            }}
                            sx={{
                                bgcolor: "form.input",
                                color: "form.label",
                                width: 400,
                                mb: 1
                            }}

                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Describe your day!"
                            multiline
                            rows={8}
                            variant="outlined"
                            type="postContent"
                            className="postContentInput"
                            name="postContent"
                            value={postContent}
                            onChange={(e) => {
                                setPostContent(e.target.value)
                            }}
                            sx={{
                                bgcolor: "form.input",
                                width: 400,
                                mb: 1
                            }}

                        />

                        <FormControlLabel
                            control={<Checkbox
                                sx={{
                                    color: "form.buttonText",
                                    '&.Mui-checked': {
                                        color: "form.button",
                                    },
                                    p: 0
                                }}
                                name="postIsPrivate"
                                className="postIsPrivateInput"
                                checked={postIsPrivate}
                                onChange={(e) => setPostIsPrivate(e.target.checked)}
                            />}
                            label="Keep Private?"
                            labelPlacement="start"
                            sx={{
                                p: 0,
                                m: 0,
                                mb: 1,
                            }}
                        />


                        <Button variant="contained"
                            sx={{
                                bgcolor: "form.button",
                                m: 0
                            }} onClick={handleCreatePost}>
                            <Typography>Create</Typography>
                        </Button>
                        {/* errors list */}
                        <ul>
                            {
                                errors.map(error => <li key={uniqid()}>{error.msg}</li>)
                            }

                        </ul>
                    </Container>
                    :
                    <></>
            }
        </>



    )
}