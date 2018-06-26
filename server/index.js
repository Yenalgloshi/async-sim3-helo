//IMPORTS / REQUIRES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
// Passport is a vehicle that can be used to have different kinds of sign-ins. One of the options available is Auth0. That is the reason for  requiring both passport and passport-Auth0.
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

// Session set up; passport boot up; passport to use the session that's been created
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// #2  The Auth0 strategy is set up here so passport knows what to use when authenticating. This tells passport to use a new Auth0Strategy and invoke the Auth0Strategy. The first parameter is a connection object (how we get to Auth0). The key:value pairs point to the information that was set up in the .env file.
passport.use(new Auth0Strategy(
  {
   domain: process.env.DOMAIN,
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: process.env.CALLBACK_URL,
   scope: 'openid profile email'
  },
  // The second parameter (this function), is what runs once we get back from Auth0. Having returned from Auth0, access is now available to some things we brought back with us. The "profile" parameter has all the information about the user.
  function(accessToken, refreshToken, extraParams, profile, done){
    console.log('profile', profile);
    app.get('db').authenticate_user(profile.id).then(user => {
      if(user[0]) {
        console.log(user[0])
        done(null, user[0]);

      } else {
        app.get('db').register_user(profile.id).then(user => {
          done(null, user[0]);

        })
      }
    })
  }
 ))

//  #3  Serialize (fires after authenticating with Auth0)
 passport.serializeUser((user, done) => {
  // This function accepts the user as a parameter. This will determine what information is saved on the cookie. This is what we are sending to our browser to remember.
  console.log('serialize', user);
  done(null, user);
});

// #5  Deserialize (fires when any endpoints are hit)
passport.deserializeUser((user, done) => {
  //  The serialize function accepts whatever was set on the cookie as a parameter. This takes the cookie and determines what parts of that cookie will be accessible on the back end.
  console.log('deserialize', user);
  done(null, user);
});



//ENDPOINTS
// when you are using <a> tags, your endpoint always has to use app.get.
// #1  This endpoint to handle the authentication using passport.authenticate
app.get('/api/auth/login', passport.authenticate('auth0', {
  // #4  where to redirect someone upon a successful login
  successRedirect: 'http://localhost:3000/#/dashboard',
  // where to redirect someone who fails to login correctly
  failureRedirect: 'http://localhost:3000/#/'
}))

//  #6  Once authenticated, user info is available
app.get('/api/auth/authenticated', (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.sendStatus(403);
  }
})

//  #7  Logout
app.get('/api/auth/logout', (req, res) => {
  // req.logOut();
  req.session.destroy();
  res.redirect(`https://jason-begay.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${process.env.CLIENT_ID}`)
})

app.get('/api/friend/list', ctrl.friendsList)
app.post('/api/friend/add', ctrl.addFriend)
app.post('/api/friend/remove', ctrl.removeFriend)
app.patch('/api/patch/:id', ctrl.editUserProfile)
app.get('/api/user/list', ctrl.listUsers)
app.get('/api/user/search', ctrl.searchUsers)
app.get('/api/user/total', ctrl.totNumOfUsers)
app.post('/api/recommended', ctrl.recFriendList)
app.post('/recommended/add', ctrl.addRecFriend)

//LISTEN
const port = 3333;
app.listen(port, () => {console.log(`EVP's are being transmitted on port ${port}`)});