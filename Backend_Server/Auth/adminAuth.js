const passport = require("passport");
const passportJWT = require("passport-jwt");

require('dotenv').config();
const adminConfig = process.env.ADMIN_JWT_CONFIG

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = (knex) => {
    const strategy = new passportJWT.Strategy({
            secretOrKey: eeConfig,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // passReqToCallback: true
        },
        async(payload, done) => {
            let query = await knex('employee').where({ ee_id: payload.id });
            let user = { id: query[0].ee_id }
            if (user) {
                return done(null, { id: user.id })
            } else {
                return done(new Error("User Not Found", null));
            }
        }
    );

    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", { session: false });
        }
    };
};