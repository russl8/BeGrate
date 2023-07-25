import { useParams, useNavigate, NavLink } from "react-router-dom"
import axios from "axios";
import React from "react"
import uniqid from 'uniqid'
import { Container, Typography, IconButton, Divider, TextField, Button, Box } from "@mui/material";
import { Favorite, Lock, Edit, Delete } from "@mui/icons-material"
import dateFormat from "dateformat";

export default function Post({backendUrl}) {

    const params = useParams();
    const navigate = useNavigate();
    //state that stores the post data
    const [postData, setPostData] = React.useState(null);
    const [currentComment, setCurrentComment] = React.useState("")
    const [allCommentsOnPost, setAllCommentsOnPost] = React.useState([])
    const [likesOnPost, setLikesOnPost] = React.useState(postData?.post?.likes?.length || 0)
    const [likeStatus, setLikeStatus] = React.useState("")

    //fetch the post and comment data from backend. 
    React.useEffect(() => {
        //set the initial post status
        axios({
            method: "GET",
            withCredentials: true,
            url: `${backendUrl}/posts/${params.id}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => {
            // console.log(res)
            setPostData(res.data);
            setAllCommentsOnPost(res.data.allCommentsOnPost); // Update the state here
            setLikesOnPost(res.data.post?.likes?.length || 0)
        });

        //set the inital like status
        axios({
            method: "GET",
            withCredentials: true,
            url: `${backendUrl}/posts/${params.id}/like`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }

        }).then(res => {
            // set initial like status
            console.log(res.data.likeStatus)
            setLikeStatus(res.data.likeStatus)
        })
    }, []);


    //redirects user to the editPost page.
    const handleEdit = async (e) => {
        /*  fetch to /posts/:postid/update GET route
                only return <EditPost/> if user is author. (same as the post page)
        */
        navigate(`/posts/${params.id}/update`);

    }

    //only shows when post existsr AND has edit permissions.
    const EditButton = () => {



        if (postData.isVisible && (postData.edit === true)) {
            return (

                <>
                    <IconButton aria-label="delete" className="editButton" onClick={handleEdit} sx={{ m: 0, p: 0 }}>
                        <Edit sx={{ color: "primary.link" }}></Edit>
                    </IconButton>
                    {/* <button className="editButton" onClick={handleEdit}>Edit</button> */}
                </>

            )
        }
    }


    //de;etes post and its comments.
    const handleDelete = async (e) => {
        axios({
            method: "POST",
            url: `http://localhost:3001/posts/${params.id}/delete`,
        }).then(res => {
            //redirect user to account page after deleting the post.
            if (res.data.msg === "post deleted") {
                navigate(`/account/${res.data.postAuthor}`)
            }
        })
    }

    //only shows when post exists, and user has edit permissions.
    const DeleteButton = () => {
        if (postData.isVisible && (postData.edit === true)) {
            return (

                <>
                    <IconButton aria-label="delete" className="DeleteButton" onClick={handleDelete} sx={{ m: 0, p: 0 }}>
                        <Delete sx={{ color: "primary.link" }}></Delete>
                    </IconButton>
                    {/* <button className="DeleteButton" onClick={handleDelete}>Delete</button> */}

                </>
            )
        }
    }

    //when user submits comment.
    const handlePostComment = (e) => {
        // make sure user is logged in to comment in backend

        //make request to backend, send the current comment data., as well as the user data.
        axios({
            method: "POST",
            url: `http://localhost:3001/posts/${params.id}`,
            data: { comment: currentComment, dateCreated: Date() },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => {
            // console.log(res, "hi")

            //update the comment state with the new comment
            setAllCommentsOnPost([res.data, ...allCommentsOnPost])
        })


        //set state to "" 
        setCurrentComment("");
    }



    //RENDER THE CONTENT OF THE POST INCLUDING USER, POSTCONTENT, LIKE,COMMENT,EDIT BUTTONS
    const PageRender = () => {
        if (postData === null || !postData.isVisible) {
            return (
                <>
                    {/* <h1 className="postDNE">Page does not exist :&#40;</h1> */}
                </>
            )
        } else {
            const username = postData.post?.user?.username || "";
            const title = postData.post?.title || "";
            const content = postData.post?.content || "";
            const likes = postData.post?.likes || [];
            const isPrivate = postData.post?.isPrivate || false;
            const dateCreated = postData.post?.dateCreated || "";
            const userid = postData.post?.user?._id || ""
            return (
                <Container
                    disableGutters
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden    "
                    }}
                >
                    <span>
                        <NavLink to={`/account/${userid}`} style={{ textDecoration: 'none', color: "#6246ea" }}>
                            <Typography display="inline">
                                @{username}
                            </Typography>
                        </NavLink>
                        <Typography display="inline">{` · ${dateFormat(dateCreated, "mmmm dS, yyyy")}`}</Typography>
                    </span>

                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="body2" sx={{ overflow: "hidden" }}>{content}</Typography>
                    {isPrivate ? <Lock sx={{ mt: 1 }}></Lock> : <></>}

                    <Divider sx={{ my: 1 }} />

                    <Box>
                        <EditButton />
                        <DeleteButton />

                        {/* conditionally render the like button based on userAuth status */}
                        {postData?.loggedIn ?
                            <>
                                {likeStatus === "liked" ?
                                    <>
                                        <IconButton aria-label="delete" onClick={handleLike} sx={{ m: 0, p: 0 }}>
                                            <Favorite sx={{ color: "primary.like" }}></Favorite>
                                        </IconButton>
                                    </>
                                    :
                                    <>
                                        <IconButton aria-label="delete" onClick={handleLike} sx={{ m: 0, p: 0 }}>
                                            <Favorite ></Favorite>
                                        </IconButton>

                                    </>
                                }
                                <Typography display="inline"> {`${likesOnPost}`} {/* {likesOnPost === 1 ? "like" : "likes"}*/} </Typography>

                            </>

                            :
                            <>
                            </>
                        }

                    </Box>

                </Container>
            )
        }
    }

    const handleLike = (e) => {
        /*
            pass in the liker's user data to the backend.
            in the backend, create a new POST for handling added likes in /posts/:id/like
        */
        axios({
            method: "POST",
            withCredentials: true,
            url: `http://localhost:3001/posts/${params.id}/like`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }

        }).then(res => {
            // set local like status. but liking and unlikng is actually updated in backend.
            setLikeStatus(res.data.likeStatus)

            // console.log(res.data.likeStatus)
            if (res.data.likeStatus === "liked") {
                setLikesOnPost(likesOnPost + 1)
            } else if (res.data.likeStatus === "unliked") {
                setLikesOnPost(likesOnPost - 1)
            }
        })
    }
    //display all commments
    const DisplayComments = () => {
        // console.log(allCommentsOnPost)
        return (
            <Container
                disableGutters
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2
                }}
            >
                <Divider sx={{ display: "flex" }} />

                {allCommentsOnPost.map(comment => {
                    return (
                        <Container key={uniqid()} sx={{ mt: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                            <NavLink to={`/account/${comment.user._id}`} style={{ textDecoration: 'none', color: "#6246ea" }}>
                                <Typography display="inline">
                                    @{comment.user.username}
                                </Typography>
                            </NavLink>
                            <Typography variant="body2" >{comment.content}</Typography>

                            <Typography variant="caption">{dateFormat(comment.dateCreated, "mmmm dS, yyyy")}</Typography>
                        </Container>
                    )
                })}

            </Container>

        )
    }
    return (
        <Container disableGutters
            sx={{
                py: -2,
                bgcolor: "primary.background"
            }}>
            <Container
                sx={{
                    bgcolor: "card.background",
                    py: 1,
                    overflow: "hidden"
                }}
            >
                <PageRender />


            </Container>

            <Container

                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2
                }}>
                {/* comment field  only renders when user is logged in.*/}
                {postData?.loggedIn ?
                    <>

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Write a comment!"
                            multiline
                            maxRows={4}
                            className="commentInput"
                            name="commentInput"
                            value={currentComment}
                            onChange={(e) => { setCurrentComment(e.target.value) }}
                            sx={{
                                "& label.Mui-focused": {
                                    color: "primary.link"
                                },
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "primary.link"
                                    }
                                },
                                display: "flex",
                                flex: 1

                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handlePostComment}
                            sx={{
                                bgcolor: "form.button",
                                color: "form.buttonText",
                                textTransform: "none",
                                ml: 2
                            }}
                        >
                            Comment
                        </Button>
                    </>

                    :
                    <>
                        <h4>You must be logged in to like and comment!</h4>
                    </>
                }

            </Container>

            <DisplayComments />

        </Container>

    )
}