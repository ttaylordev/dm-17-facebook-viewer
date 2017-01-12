const passport = require('passport');
const passportFacebook = require('passport-facebook');
const passportLocal = require('passport-local');

module.exports = {
  getAuthFb: passport.authenticate('facebook'),
  getAuthFbCb: passport.authenticate('facebook'), //unfinished
  getMe: (req, res, next) => {
    console.log('get me endpoint fired');
    if(req.user){
      console.log(req.user);
      res.status(200).send(req.user);
    } else{
      console.log('No user!');
      res.status(500)
    }
    return res;
  }
}
