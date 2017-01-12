const bp = require('body-parser');
const bcrypt = require('bcrypt');
const config = require('./config.json');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const fbCtrl = require('./Controller.js');
const jwt = require('jsonwebtoken');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const passportLocal = require('passport-local');
let users = {};

// const port = config.port;
const app = express();

app.use(bp.json());
app.use(cors());
app.use(cookieParser());

// order is important for passport.
app.use(session({
  secret: config.secret,
  saveUninitialized: false,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static('./dist'));

const massiveInstance = massive.connectSync({connectionString: config.connectionString});
app.set('db', massiveInstance);
const db = app.get('db');

passport.use(new passportFacebook({
  clientID: config.appID,
  clientSecret: config.fbSecret,
  callbackURL: config.callbackURL,
  profileFields: ['id', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  // db.getUserByFacebookId([profile.id], function(err, user) {
  //   user = user[0];
  //   if (!user) {
  //     console.log('creating user');
  //     db.createUserFacebook([
  //       profile.displayName, profile.id
  //     ], function(err, user) {
  //       return done(err, user, {scope: 'all'});
  //     })
  //   } else {
  //     return done(err, user);
  //   }
  // })
  done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use('local', new passportLocal((username, password, done) => {
  if (err) {return done(err);}
  if (!user) {
    return done(null, false);
  }
  if (user.password != password) {
    return done(null, false);
  }
  return done(null, user); 
  }
));

app.get('/auth/facebook', fbCtrl.getAuthFb);
app.get('/auth/facebook/callback', fbCtrl.getAuthFbCb, fbCtrl.getAuthFbCb2);
app.get('/auth/me', fbCtrl.getMe);

app.post('auth/local', passport.authenticate('local'), (req, res) =>{
  res.status(200).redirect('/#/');
});


app.listen(config.port, () =>{
  console.log(`listening on port ${config.port}`);
});
