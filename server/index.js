//IMPORTS / REQUIRES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config()

//VARIABLES
const app = express();
const ctrl = require('./controller');
const { SESSION_SECRET } = process.env;

//TOP LEVEL MIDDLEWARE
massive(process.env.CONNECTION_STRING).then(dbInstance =>{
  app.set('db', dbInstance);
}).catch(err => console.log(err))

app.use(bodyParser.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy(
  {
   domain: process.env.DOMAIN,
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: process.env.CALLBACK_URL,
   scope: 'open email'
  },
  function(accessToken, refreshToken, extraParams, profile, done){
    console.log('profile', profile);
    done(null, profile);
  }
 ))

passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserialize', user);
  done(null, user);
});



//ENDPOINTS
app.get('/api/auth/login', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/dashboard',
  failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/api/auth/setUser', (req, res) => {
  console.log('session', req.user);
  res.status(200).send(req.user);
})

app.get('/api/auth/authenticated', ctrl.authUser)

app.get('/api/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(`https://jason-begay.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${process.env.CLIENT_ID}`)
})

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