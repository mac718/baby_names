const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/createUser', (req, res, next) => {
  let user = req.body.email;
  
  res.cookie('user', user, {httpOnly:true});
  res.send();
})

app.listen(3001);