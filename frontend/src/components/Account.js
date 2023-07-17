import { useParams } from "react-router-dom"
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
        }).then(res => {
            setAccountDetails(res.data)
            console.log(res.data)
        })

    }, [])
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
                                    <div className="accountPost" key={uniqid()}>
                                        <h2> {post.title}</h2>
                                        <p>{post.content}</p>
                                        <p>{post.dateCreated}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    :
                    <h1 className="postDNE">Page does not exist :&#40;</h1>

            }

        </>
    )
}