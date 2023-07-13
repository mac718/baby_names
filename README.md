# Baby Name Ranker

This app presents users with cards containing possible baby names. Users can rank the names on a scale of
1-10, view the breakdown of their ratings and view name details on a ratings page, and link their account
with other users who can all see each others ratings.

## Built With

- Express
- React
- MongoDB/Mongoose
- Multer
- SendGrid

live on Heroku: https://nominfans.herokuapp.com/

## Features

### Rate names on a scale of 1-10

![](https://github.com/mac718/baby_names/blob/main/client/src/pics/card.png)

### Use filters to limit scope of names

![](https://github.com/mac718/baby_names/blob/main/client/src/pics/filter.png)

### Edit, or delete your ratings and filter them by gender and/or origin.

![](https://github.com/mac718/baby_names/blob/main/client/src/pics/ratings.png)

### Link your account with friends and family to share each others' ratings

![](https://github.com/mac718/baby_names/blob/main/client/src/pics/linked.png)

## To Install Locally

1. Clone the repo
2. `cd` into the project folder in your terminal
3. Enter `npm install`
4. In one terminal window, enter `node server` to start the back end
5. In another terminal window, enter `npm start` to start the front end.

**N.B. You will have to provide your own jwt secret and email credentials to run locally**
