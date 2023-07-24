# About BeGrate!
BeGrate is a simple text-blogging that allows users to record an aspect of their days that they are grateful for. Users can either make their posts public for everybody to see, or can keep posts to themselves by making their posts private.

The website authenticates users with bcryptjs and passportjs, using JWTs that are stored in the user's local storage, allwing for the signup and login of users.

Each post created by users alllows for Liking and commenting, which can only be done by users who are signed in. Unauthenticated users can only view posts. 

Users who are signed in can also edit and delete their own posts. Both routes are protected by passportjs to ensure that only the user can modify theit content.
# Technologies 
## Front-end
* react-router-dom: 6.14.1
* react: 18.2.0
* @mui/icons-material: 5.14.1
* @mui/material: 5.14.1

## Back-end
* "bcryptjs": "^2.4.3",
* "body-parse": "^0.1.0",
* "body-parser": "^1.20.2",
* "cookie-parser": "~1.4.4",
* "cors": "^2.8.5",
* "debug": "~2.6.9",
* "dotenv": "^16.3.1",
* "ejs": "~2.6.1",
* "express": "~4.16.1",
* "express-async-handler": "^1.2.0",
* "express-session": "^1.17.3",
* "express-validator": "^7.0.1",
* "http-errors": "~1.6.3",
* "jsonwebtoken": "^9.0.1",
* "mongoose": "^7.3.2",
* "morgan": "~1.9.1",
* "nodemon": "^2.0.22",
* "passport": "^0.6.0",
* "passport-local": "^1.0.0"
