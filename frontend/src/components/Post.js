/**
 * 
 * 
 * 
 *          TODO: EDIT BUTTON FUNCTIONALITY AND UPDATE ROUTE
 * 
 * 
 * 
 */



import { useParams,useNavigate } from "react-router-dom"
import axios from "axios";
import React from "react"
import EditPost from "./EditPost"
export default function Post() {
    const params = useParams();
    const navigate = useNavigate();
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
            setPostData(res.data);
        })
    }, [])

    const handleEdit = async (e) => {
        /*  fetch to /posts/:postid/update GET route
                only return <EditPost/> if user is author. (same as the post page)
        */
        navigate(`/posts/${params.id}/update`);
        
    }

    //only shows when post exists, or user has edit permissions.
    const EditButton = () => {
        if (postData.isVisible && (postData.edit === true)) {
            return (
                <button className="editButton" onClick={handleEdit}>Edit</button>
            )
        }
    }


    const PageRender = () => {
        if (postData === null || !postData.isVisible) {
            return (
                <>
                    <h1 className="postDNE">Page does not exist :&#40;</h1>
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
                <div className="postContainer">
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