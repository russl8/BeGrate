import React, { useState, useEffect } from "react";
import uniqid from "uniqid"
import { NavLink } from "react-router-dom"
export default function Home() {
  const [currentText, setCurrentText] = useState("");
  const [allPosts, setAllPosts] = useState([])
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse the response body as JSON
        } else {
          throw new Error("Error fetching data.");
        }
      })
      .then((jsonResponse) => {
        setAllPosts(jsonResponse.allPosts);
        setCurrentText(jsonResponse.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div>
      <h1>{currentText}</h1>
      {allPosts.map(post => {

        return (
          <div className="homepagePost" key={uniqid()}>

            <NavLink key={uniqid()} to={`/posts/${post._id}`}>
              <h1>{post.title}</h1>

              <NavLink to={`/account/${post.user._id}`}>
                <h3>{post.user.username}</h3>
              </NavLink>

              <p>{post.content}</p>
              <p>{post.likes.length} {post.likes.length === 1 ? "like" : "likes"}</p>

            </NavLink>
          </div>

        )


      })}
    </div>
  );
}
