//passport setup
const passport = require("passport");

//strategy setup
const employeeLoginStrategy = require("./employeeLoginStrategy");
const employerLoginStrategy = require("./employerLoginStrategy");
const employeeSignupStrategy = require("./employeeSignUpStrategy");
const employerSignupStrategy = require("./employerSignupStrategy");


//assign strategy to string tags
passport.use("employee-local-login", employeeLoginStrategy);
passport.use("employee-local-signup", employeeSignupStrategy);
passport.use("employer-local-login", employerLoginStrategy);
passport.use("employer-local-signup", employerSignupStrategy);


module.exports = passport;