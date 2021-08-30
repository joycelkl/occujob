const development = require("../knexfile").development;
const hashFunction = require("./hashFunction");
const knex = require("knex")(development);
const TABLE_NAME = "employee";
const passport = require('passport')
const passportJWT = require('passport-jwt')
require('dotenv').config();
const config = process.env.JWT_CONFIG;


// const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    console.log('signing up');
    console.log("req.body", req.body.name);
    console.log("Email", email);
    console.log("Password", password);

    try {
        // get the user
        let users = await knex(TABLE_NAME).where({
            email: email,
        });
        // if there is a user
        if (users.length > 0) {
            // return false - user already exists
            return done(null, false, {
                message: "user already exists",
            });
        }
        // otherwise, hash their password
        let hashedPassword = await hashFunction.hashPassword(password);
        // get the new user
        const newUser = {
            name: req.body.name,
            email: email,
            password: hashedPassword,
            type: "ee"
        };
        //insert the new user, get the id
        let userId = await knex(TABLE_NAME).insert(newUser).returning("id");
        // assign that id to the user
        newUser.id = userId[0];
        console.log("New user: ", newUser);
        // done - pass back the user object
        done(null, newUser);
    } catch (error) {
        throw new Error(error);
    }
});