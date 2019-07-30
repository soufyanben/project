

exports.user_login = (req, res) => {

    // find user with req email
    User.find({email: req.body.email}, function(err, user) {
        if (user === null) {
            return res.status(400).send({
                message : "User not found"
            })
        }
        else {
            if (user.validPassword(req.body.passwrord)) {
                return res.status(201).send({
                    message: "User Logged In",
                })
            }
            else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
   

    })
};
exports.user_register =  (req, res) => {

    const {username, email, password, password2 } = req.body;
    //Simple validaton 
    if (!username || !email || !password || !password2) {
       return res.send({ success:false, message: 'Please enter all fields'});
    }
    if (password !== password2) {
       return res.status(400).json({ message: 'Password do not match'});
    }
 
    //Check fro existing user
    User.findOne({ email : email })
       .then( user => {
            if(user) return res.send({ success: false, msg: 'User already exists'})
          
            const newUser = new User({ username, email, password });
 
            // call setPassword to hash password
            newUser.setPassword(req.body.password);
            // save newUser object to database
            newUser.save((err, User) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message : "Failed to add user."
                    });
                }
                return  res.send({ 
                           success: true,
                           msg: 'Signed up'
                        })
                });
            })
          }
          exports.user_social_auth = (data, callback){
            //Let's check if an a user with the email given in the data is already exisiting
            //since the email is what tells users appart from eachother
            User.findOne({'email': data.email, function(err, user){
                    if(err) { return callback(err);}
                    if(user){
                        //The user with the same email exists => we update the socialId field 
                        user.socialId = data.id;
                        let newUser = user.save();
                        return callback(null, newUser); //err here is null, so you can specify that it is null. 
                    }else {
                        //There is no new user, making a new one. 
                        //it would be very usefull if you validate the data somewhere 
                        //if(validate(data)) create new user ;
                        //else return cb(null);
                        const userData = {
                            username : data.displayName,
                            socialId: data.id,
                            email:data.email
                        };
                        const newUser = new User(userData);
                        newUser.save(callback(err, user));                     
                    }
                }
            })
        }