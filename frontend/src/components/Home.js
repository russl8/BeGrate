import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { Container, Box, Typography, Grid, Paper, TextField, MenuItem } from "@mui/material";
import dateFormat from "dateformat";
const sortCategories = ["Newest First", "Oldest First", "Most Liked"]

export default function Home({ userAuth, userName,backendUrl }) {

  const [currentText, setCurrentText] = useState("");
  const [allPosts, setAllPosts] = useState([])
  const [sortMethod, setSortMethod] = useState("Newest First")
  useEffect(() => {
    axios
      .get(`${backendUrl}/?sortMethod=${sortMethod}`)
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
          <Typography variant="h1" textAlign="center">BeGrate!</Typography>
          <Typography variant="h6" textAlign="center">
Welcome to BeGrate! - a place where gratitude shines bright. Share your daily moments of thankfulness, big or small, and inspire others to find joy in the little things too. Connect with a community of positivity as you spread appreciation for life's blessings, one heartfelt post at a time.</Typography>

          <Typography variant="body1" textAlign="center" sx={{ my: 1 }}>
            <NavLink to="/sign-up" style={{ textDecoration: "none", color: "#6246ea" }} > Create an account here! </NavLink>
            If you have an account already, <NavLink to="/login" style={{ textDecoration: "none", color: "#6246ea" }}>Login</NavLink>
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
            width: "100%",
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
                  <Paper
                    sx={{
                      height: { xs: 250, md: 250, sm: 250, lg: 250, xl: 250 },
                      width: { xs: 275, md: 350, sm: 400, lg: 325, xl: 260 },
                      overflow: 'clip',
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      mx: 1,
                      bgColor: "form.background",
                      color: "card.headline",
                    }}
                    >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ color: "form.button" }}>@{post.user.username}</Typography>

                      <Typography variant="h6" sx={{ fontWeight: "bold" }}> {post.title}</Typography   >

                    </Box>

                    <Typography variant="body1" >{post.content}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="body2">{dateFormat(post.dateCreated, "mmmm dS, yyyy")}</Typography>
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