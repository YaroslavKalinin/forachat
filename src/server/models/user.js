const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-z0-9_]{3,16}$/i.test(v);
            }
        }           
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-z0-9_]{3,16}$/i.test(v);
            }
        }
    }
}) 
//middleware for saving model
schema.pre('save', function(next) {
     var user = this;
     // only hash the password if it has been modified (or is new)
     if (!user.isModified('password')) return next();
     // generate a salt
     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
         if (err) return next(err);
         // hash the password using our new salt
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
             // override the cleartext password with the hashed one
             user.password = hash;
             next();
         });
     });
});  
//set additional methods for extracting passwords
schema.methods.comparePassword = function(candidatePassword) {
    const user_id = this._id;
    return new Promise((res, rej) => {
        //returns user id in pass matching case
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err || !isMatch) { 
                rej({message: 'Incorrect login or password'});
            }
            else {
                res(user_id);
            }
        });
    });
};

class User {
    //finds user by name and then check it's password
    static async check({username, password}){
        return await this.findOne({username: username})
        .then((user) => {
            //user not found
            if(!user) {
                throw {message: 'Incrrect login or password'};
            }
            //else compare passwords
            return user.comparePassword(password)
        })
    }
}


//extend schema
schema.loadClass(User);
module.exports = mongoose.model('User', schema);