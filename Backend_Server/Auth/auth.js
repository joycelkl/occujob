const passport = require("passport");
const passportJWT = require("passport-jwt");

require('dotenv').config();
const config = process.env.JWT_CONFIG

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = (knex) => {
    const strategy = new passportJWT.Strategy({
            secretOrKey: config,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // passReqToCallback: true
        },
        async(payload, done) => {

            console.log('payload', payload)
            let query;
            let user;

            switch (payload.type) {
                case 'er':
                    query = await knex('employer').where({ er_id: payload.id });
                    user = { id: query[0].er_id, type: query[0].er_type };
                    break;
                case 'ee':
                    query = await knex('employee').where({ ee_id: payload.id });
                    user = { id: query[0].ee_id, type: query[0].ee_type };
                    break;
                case 'admin':
                    query = await knex('admin').where({ admin_id: payload.id });
                    user = { id: query[0].admin_id, type: query[0].type };
                    break;
                default:
                    return;
            }

            if (user) {
                console.log('user in auth', user)

                return done(null, { id: user.id, type: user.type })
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
