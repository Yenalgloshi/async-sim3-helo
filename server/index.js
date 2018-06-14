//IMPORTS / REQUIRES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
// const session = require('express-session')
require('dotenv').config()

//VARIABLES
const app = express();
const ctrl = require('./controller');

//TOP LEVEL MIDDLEWARE
app.use(bodyParser.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));

massive(process.env.CONNECTION_STRING).then(dbInstance =>{
  // dbInstance.seedFile()
  // .then(res => console.log('Seed successful'))
  // .catch(err => console.log('Seed not successful', err))

  app.set('db', dbInstance);

}).catch(err => console.log(err))

//ENDPOINTS
app.get('/api/auth/login', ctrl.loginUser)
app.get('/api/auth/setUser', ctrl.setUser)
app.get('/api/auth/authenticated', ctrl.authUser)
app.post('/api/auth/logout', ctrl.logoutUser)
app.get('/api/friend/list', ctrl.friendsList)
app.post('api/friend/add', ctrl.addFriend)
app.post('api/friend/remove', ctrl.removeFriend)
app.patch('/api/patch/:id', ctrl.editUserProfile)
app.get('/api/user/list', ctrl.listUsers)
app.get('api/user/search', ctrl.searchUsers)
app.post('api/recommended', ctrl.recFriendList)
app.post('recommended/add', ctrl.addRecFriend)

//LISTEN
const port = 3333;
app.listen(port, () => {console.log(`EVP's are being transmitted on port ${port}`)});