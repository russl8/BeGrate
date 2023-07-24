import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { Container, Box, Typography, Grid, Paper, TextField, MenuItem } from "@mui/material";
const sortCategories = ["Newest First", "Oldest First", "Most Liked"]

export default function Home({ userAuth, userName }) {

  const [currentText, setCurrentText] = useState("");
  const [allPosts, setAllPosts] = useState([])
  const [sortMethod, setSortMethod] = useState("Newest First")
  useEffect(() => {
    axios
      .get(`http://localhost:3001/?sortMethod=${sortMethod}`)
      .then((res) => {
        setAllPosts(res.data)
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(userAuth)
  }, [sortMethod]);


  return (
    <Container disableGutters>
      {!userAuth
        ?
        <>
          <Typography variant="h1" textAlign="center">AAAA!</Typography>
          <Typography variant="h6" textAlign="center">The best blogging site for all your blogging needs. Use the power of words to provide snippets of your daily lives.</Typography>

          <Typography variant="body1" textAlign="center" sx={{ my: 1 }}>
            <NavLink to="/sign-up" style={{ textDecoration: "none", color: "#f45d48" }} > Create an account here! </NavLink>
            If you have an account already, <NavLink to="/login" style={{ textDecoration: "none", color: "#f45d48" }}>Login</NavLink>
          </Typography>

        </>
        :
        <>
          <Typography variant="h3" textAlign="center" sx={{ py: 1 }}>Welcome back, {userName}!</Typography>
        </>
      }

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

      }}>


        <TextField
          select
          label="Sort by"
          sx={{
            width: 400,
            mt: 1,
            color: "#232323",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "form.button"
              }
            },
            "& label.Mui-focused": {
              color: "form.button"
            },

          }}
          value={sortMethod}
          onChange={(e) => { setSortMethod(e.target.value); }}
        >
          {sortCategories.map(cat => (
            <MenuItem key={uniqid()} value={cat} sx={{ color: "#232323" }}>
              {cat}
            </MenuItem>
          ))}
        </TextField>


        <Grid sx={{ width: "100%", p: 3 }} container spacing={{ md: 2 }} columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 16 }}>
          {allPosts.map(post => {
            return (


              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                columns={4}
                sx={{

                  width: 20,
                  height: 300,
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="wadadawd"
                zeroMinWidth
                key={uniqid()}
              >

                <NavLink to={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
                  <Paper sx={{
                    height: { xs: 250, md: 250, sm: 250, lg: 250, xl: 250 },
                    width: { xs: 250, md: 350, sm: 400, lg: 325, xl: 260 },
                    overflow: 'clip',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    mx: 1,
                    bgColor: "form.background",
                    color: "card.headline"
                  }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ color: "form.button" }}>@{post.user.username}</Typography>

                      <Typography variant="h6" sx={{ fontWeight: "bold" }}> {post.title}</Typography   >

                    </Box>

                    <Typography variant="body1" >{post.content}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="body2">{post.dateCreated}</Typography>
                      <Typography variant="body2">{post.likes.length} {post.likes.length === 1 ? "like" : "likes"} </Typography>

                    </Box>
                  </Paper>

                </NavLink>
              </Grid>



            )


          })}
        </Grid>
      </Box>
    </Container>
  );
}