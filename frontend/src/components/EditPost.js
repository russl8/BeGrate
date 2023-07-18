import axios from "axios"
import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import uniqid from "uniqid"
export default function EditPost() {
    const params = useParams();
    const navigate = useNavigate();
    //fetch backend for post details and whether a user can edit or not (boolean)
    React.useEffect(() => {
        try {
            axios({
                method: "GET",
                withCredentials: true,
                url: `http://localhost:3001/posts/${params.id}/update`,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            }).then(res => {
                //saving the post info to state
                const edit = res.data?.edit || false
                const title = res.data?.post?.title || ""
                const content = res.data?.post?.content || ""
                const isPrivate = res.data?.post?.isPrivate || ""

                setCanEditPost(edit);
                setPostTitle(title)
                setPostContent(content)
                setPostIsPrivate(isPrivate)

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

    //when a user submits an update
    const handleEditPost = (e) => {
        //POST request to /posts/:postid/update
        // pass in state stuff via data

        try {
            axios({
                method: "POST",
                url: `http://localhost:3001/posts/${params.id}/update`,
                data: {
                    title: postTitle,
                    content: postContent,
                    isPrivate: postIsPrivate
                }
            }).then(res => {
                console.log(res)
                const successOrFail = res.data;

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
            <></>
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
                    <div className="editPost">
                        <label htmlFor="postTitle">Title</label>
                        <input type="postTitle"
                            className="postTitleInput"
                            name="postTitle"
                            value={postTitle}
                            onChange={(e) => {
                                setPostTitle(e.target.value)
                            }} />



                        <label htmlFor="postContent">Content</label>
                        <input type="text"
                            className="postContentInput"
                            name="postContent"
                            value={postContent}
                            onChange={(e) => {
                                setPostContent(e.target.value)
                            }}
                        />
                        <label htmlFor="postIsPrivate">Private</label>
                        <input type="checkbox"
                            name="postIsPrivate"
                            className="postIsPrivateInput"
                            onChange={(e) => { setPostIsPrivate(e.target.checked) }}
                            checked={postIsPrivate}
                        />
                        <button onClick={handleEditPost}>Update</button>

                        <ul>
                            {errors.map(error => <li key={uniqid()}>{error.msg}</li>)}
                        </ul>
                    </div>
                    :
                    <ErrorPage />}
        </>

    )





}