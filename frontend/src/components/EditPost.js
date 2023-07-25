import axios from "axios"
import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import uniqid from "uniqid"
import { Container, TextField, Checkbox, Typography, Button, FormControlLabel, Box, } from "@mui/material";

export default function EditPost({backendUrl}) {
    const params = useParams();
    const navigate = useNavigate();
    //fetch backend for post details and whether a user can edit or not (boolean)
    React.useEffect(() => {
        try {
            axios({
                method: "GET",
                withCredentials: true,
                url: `${backendUrl}/posts/${params.id}/update`,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            }).then(res => {
                //saving the post info to state
                const edit = res.data?.edit || false
                const title = res.data?.post?.title || ""
                const content = res.data?.post?.content || ""
                const isPrivate = res.data?.post?.isPrivate || false
                const u = res.data?.post?.user?.username || ""

                setCanEditPost(edit);
                setPostTitle(title)
                setPostContent(content)
                setPostIsPrivate(isPrivate)
                setUsername(u)
            })

        } catch (e) {
            console.error(e)
        }

    }, [])
    //state
    const [canEditPost, setCanEditPost] = React.useState(false)
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");
    const [postIsPrivate, setPostIsPrivate] = React.useState(false)
    const [errors, setErrors] = React.useState([]);
    const [username, setUsername] = React.useState("false")

    //when a user submits an update
    const handleEditPost = (e) => {
        //POST request to /posts/:postid/update
        // pass in state stuff via data

        try {
            axios({
                method: "POST",
                url: `${backendUrl}/posts/${params.id}/update`,
                data: {
                    title: postTitle,
                    content: postContent,
                    isPrivate: postIsPrivate
                }
            }).then(res => {
                // console.log(res.data)
                const successOrFail = res.data.msg;

                //if post is successfully posted...
                if (successOrFail === "success") {
                    navigate(`/posts/${params.id}`)
                } else {
                    // update error messages state so the errors can be displayed 
                    setErrors(res.data.errors.errors);
                }

            })
        } catch (e) {

            console.error(e)
        }

    }

    const ErrorPage = () => {
        return (
            <>
            </>
        )
    }


    return (
        /*
        TODO: VERIFY USER in /POSTS!!!! HAS TO BE SIGNED IN BEFORE CREATING A POST
        */
        <>
            {
                canEditPost
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
                                width:  "100%",
                                mb: 1
                            }}>
                            <Typography sx={{fontWeight:"bold"}}>
                                @{username} is editing a post...
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
                                width:  "100%",
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
                                width: "100%",
                                mb: 1
                            }}

                        />

                        <FormControlLabel
                            control={<Checkbox
                                sx={{
                                    color: "#2b2c34",

                                  
                                    '&.Mui-checked': {
                                        color: "form.button",
                                    },
                                    p: 0
                                }}
                                name="postIsPrivate"
                                className="postIsPrivateInput"
                                onChange={(e) => { setPostIsPrivate(e.target.checked) }}
                                checked={postIsPrivate}
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
                                textTransform:"none",
                                bgcolor: "form.button",
                                m: 0,
                                color: "primary.buttonText"
                            }} onClick={handleEditPost}>
                            <Typography>Update Post</Typography>
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