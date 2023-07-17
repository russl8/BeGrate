import React from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const navigate = useNavigate();
    //make a form for title, content, and isPrivate
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");
    const [postIsPrivate, setPostIsPrivate] = React.useState(false)
    const [canCreatePost, setCanCreatePost] = React.useState(false)


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
            console.log(res.data)
            // if the post is posted, redirect user to the post page.
            if (res.data.postStatus === "Success") {
                navigate(`/posts/${res.data.postID}`)
            }
        })
    }

    return (
        <>
            {
                canCreatePost
                    ?

                    <div className="createPost">
                        <label htmlFor="postTitle">Title</label>
                        <input type="postTitle"
                            className="postTitleInput"
                            name="postTitle"
                            value={postTitle}
                            onChange={(e) => {
                                setPostTitle(e.target.value)
                            }} />

                        <label htmlFor="postContent">Content</label>
                        <input type="postContent"
                            className="postContentInput"
                            name="postContent"
                            value={postContent}
                            onChange={(e) => {
                                setPostContent(e.target.value)
                            }} />
                        <label htmlFor="postIsPrivate">Private</label>
                        <input type="checkbox"
                            name="postIsPrivate"
                            className="postIsPrivateInput"
                            onChange={(e) => setPostIsPrivate(e.target.checked)}
                        />
                        <button onClick={handleCreatePost}>Create</button>

                    </div>
                    :
                    <h1 className="postDNE">Page does not exist :&#40;</h1>
            }
        </>



    )
}