const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


class UsersModel {
    constructor(){
        //create schema
        this.schema = new Schema({
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
        });
        //setup password hashing for schema
        this.schema.pre('save', function(next) {
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
        this.schema.methods.comparePassword = function(candidatePassword) {
            return new Promise((res, rej) => {
                bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                    if (err || !isMatch) { 
                        rej({message: 'Incorrect login or password'});
                    }
                    else {
                        res();
                    }
                });
            });
        };
        //User model
        this.model = mongoose.model('User', this.schema);
    }

    //returns promise
    add({username, password}){
        return this.model.create({username, password})
    }
    
    findOne(username){
        return this.model.findOne({username: username});
    }
    //finds user by id and then check it's password
    async checkUser({username, password}){
        return await this.findOne(username)
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


const usersModel = new UsersModel();
module.exports = usersModel;