/**
 * 
 * 
 * 
 *          TODO: EDIT BUTTON FUNCTIONALITY AND UPDATE ROUTE
 * 
 * 
 * 
 */



import { useParams } from "react-router-dom"
import axios from "axios";
import React from "react"
export default function Post() {
    const params = useParams();
    /* fetch user data from databse
     user can exist or not exist.
         if posts exists
             if post private
                 is post user === user?
                     allow access WITH edit button
                 else 
                     403 
             else if post not private
                 is post user === user?
                     allow access WITH edit button
                 else
                     allow access WITHOUT edit button.
         else
             render error page


     remarks:
        - have one base function for the general page. can choose to render edit button.
          for the postUpdate route, verify that user is the author
        - the error page can be the same error page used throughout the whole site
        - the 403 error should redirect the user to the error page too
    */

    //state that stores the post data
    const [postData, setPostData] = React.useState(null);
    //passing params.id to backend
    React.useEffect(() => {
        //fetch the post data from backend. 
        axios({
            method: "GET",
            data: {
                postid: params.id
            },
            withCredentials: true,
            url: `http://localhost:3001/posts/${params.id}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => {
            setPostData(res.data)
        })
    }, [])

    //only shows when post exists, or user has edit permissions.
    const EditButton = () => {
        if (postData.isVisible && (postData.edit === true)) {
            return (
                <button>Edit</button>
            )
        }
    }


    const PageRender = () => {
        if (postData === null || !postData.isVisible) {
            return (
                <>
                    <h1>Post does not exist :&#40;</h1>
                </>
            )
        } else {
            const username = postData.post?.user?.username || "";
            const title = postData.post?.title || "";
            const content = postData.post?.content || "";
            const likes = postData.post?.likes || 0;
            const isPrivate = postData.post?.isPrivate || false;
            const dateCreated = postData.post?.dateCreated || "";
            return (
                <div className="post">
                    <h1>{username}</h1>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <p>{likes} Likes</p>
                    <p>{isPrivate ? "Private" : "Public"} </p>
                    <p>{dateCreated}</p>
                    <EditButton />
                </div>)
        }
    }

    return (
        <>
            <PageRender />
        </>

    )
}