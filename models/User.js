const mongoose = require('mongoose');
const crypto = require('crypto');

// Every user has a username, password, socialId.
//  If the user registered via username and password(i.e. Manual), 
//        then socialId should be null.
//  If the user registered via social authenticaton, 
//        then password should be null, and socialId should be assigned to a value.

const UserSchema  = new mongoose.Schema({
    username:   { type: String, required: true },
    email:      { type: String, required: true },
    passwordH:   { type: String, required: true },//hashed password
    salt:       { type: String, required: true }, //set a unique salt for a every user  
    Facebook_id:{ type: String, default: null },
    Google_id:  { type: String, default: null},
    login_by:   { enum: ["Fb", "Google", "Manual"] },
    posts:      [ {body: String, date: Date} ]

})

// /Before save a user document,we make sure Hash user's password
UserSchema.methods.setPassword = password => {
  
    //Create a unique salt for a user 
    this.salt = crypto.randomBytes(16).toString('hex');
    //hashing user's salt and password
    this.passwordH = crypto.createHash('md5').update(password + salt).digest('hex') + salt
}

// check the user password is correct or not
UserSchema.methods.validPassword = password => {
    let passwordH = crypto.createHash('md5').update(password + this.salt).digest('hex') + this.salt;
    return this.passwordH === passwordH;
}


const User = mongoose.model('User', UserSchema);
module.exports = User;