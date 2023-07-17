import { useParams, NavLink } from "react-router-dom"
import React from "react"
import axios from "axios"
import uniqid from "uniqid"
export default function Account() {
    const params = useParams();
    // fetch account using useEffect and params.id -> save account details in state
    const [accountDetails, setAccountDetails] = React.useState({});
    React.useEffect(() => {

        axios({
            method: "GET",
            url: `http://localhost:3001/account/${params.id}`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => {
            console.log(res)

            setAccountDetails(res.data)
        })

    }, params)
    return (
        <>
            {
                accountDetails.status === "success"
                    ?
                    <div className="accountPage">
                        <h1>{accountDetails.user.username}</h1>
                        <h4>{accountDetails.user.email}</h4>


                        <div className="accountPostContainer">
                            {accountDetails.posts.map(post => {
                                    return (
                                        <NavLink to={`/posts/${post._id}`} key={uniqid()}>
                                            <div className="accountPost">
                                                <h2> {post.title}</h2>
                                                <p>{post.content}</p>
                                                <p>{post.dateCreated}</p>
                                            </div>
                                        </NavLink>

                                    )
                                

                            })}
                        </div>
                    </div>

                    :
                    <>
                        {/* <h1 className="postDNE">Page does not exist :&#40;</h1> */}

                    </>

            }

        </>
    )
}