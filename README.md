# About BeGrate!
BeGrate is a simple text-blogging site that allows users to record an aspect of their days that they are grateful for. Users can either make their posts public for everybody to see, or can keep posts to themselves by making their posts private.

The website authenticates users with bcryptjs and passportjs, using JWTs that are stored in the user's local storage, allwing for the signup and login of users.

Each post created by users alllows for Liking and commenting, which can only be done by users who are signed in. Unauthenticated users can only view posts. 

Users who are signed in can also edit and delete their own posts. Both routes are protected by passportjs to ensure that only the user can modify theit content.

This website is also responsive, so it will work on mobile devices.
