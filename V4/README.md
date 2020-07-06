# Version-03 Features:

## Setup 01:
- To understand and implement the concept of nested routes.
- To add the comment new and create routes.
- To add the new comment form.

### RESTful routes so far:
- /campgrounds (GET- displays all the campgrounds)
- /campgrounds/new (GET- provides the form for adding a new campground)
- /campgrounds (POST- creates a new campground)
- /campgrounds/:id (GET- shows information about a particular campground)

### New RESTful routes to be added (NESTED ROUTES):
- /campgrounds/:id/comments/new (GET- provides the form for adding a new comment to the selected campground)
- /campgrounds/:id/comments/ (POST- creates a new comment to the selected campground)


# Steps to run:
- Install dependencies using `npm install dependecies`
- Run the server using `node app.js`
- Go to `localhost:3000` and you're all set.
