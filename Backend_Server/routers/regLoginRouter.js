const express = require("express");

const hashFunction = require("../Auth/hashFunction");

require('dotenv').config();
const development = require("../knexfile").development;
const knex = require("knex")(development);

const JWT = require('jsonwebtoken')
const config = process.env.JWT_CONFIG


class RegLoginRouter {
    constructor() {
        this.router = () => {
            const router = express.Router();

            router.post("/register/employer", async(req, res) => {
                const { name, email, password } = req.body

                console.log('employer register')

                try {
                    // get the user
                    let users = await knex('employer').where({
                        er_email: email
                    });

                    // if there is a user
                    if (users.length > 0) {
                        // return false - user already exists
                        return res.status(422).json({
                            errors: [{
                                msg: "User already exists"
                            }]
                        })
                    }

                    // otherwise, hash their password
                    let hashedPassword = await hashFunction.hashPassword(password);

                    // get the new user
                    const newUser = {
                        er_name: name,
                        er_email: email,
                        er_password: hashedPassword,
                        er_type: "er"
                    };

                    //insert the new user, get the user info
                    let user = await knex('employer').insert(newUser).returning("*");
                    console.log("New ER user in database: ", user);

                    // generate that token to the user
                    const { er_id, er_name, er_type } = user;
                    const payload = {
                        id: er_id,
                        name: er_name,
                        type: er_type,
                    }
                    let token = await JWT.sign(payload, config, { expiresIn: '1d' })

                    // pass back the user token
                    return res.json({ token });

                } catch (error) {
                    console.error(error.message)
                    throw new Error(error);
                }
            });


            router.post("/register/employee", async(req, res) => {
                const { name, email, password } = req.body;

                try {
                    // get the user
                    let users = await knex('employee').where({
                        ee_email: email
                    });
                    // if there is a user
                    if (users.length > 0) {
                        // return false - user already exists
                        return res.status(422).json({
                            errors: [{
                                msg: "User already exists"
                            }]
                        })
                    }
                    // otherwise, hash their password
                    let hashedPassword = await hashFunction.hashPassword(password);
                    // get the new user
                    const newUser = {
                        ee_name: name,
                        ee_email: email,
                        ee_password: hashedPassword,
                        ee_type: "ee"
                    };
                    //insert the new user, get the user info
                    let user = await knex('employee').insert(newUser).returning("*");
                    console.log("New EE user in database: ", user);

                    // generate that token to the user
                    const { ee_id, ee_name, ee_type } = user;
                    const payload = {
                        id: ee_id,
                        name: ee_name,
                        type: ee_type
                    }
                    let token = await JWT.sign(payload, config, { expiresIn: '1d' })

                    // pass back the user token
                    return res.json({ token });
                } catch (error) {
                    console.error(error.message)
                    throw new Error(error);
                }

            });


            router.post("/login/employer", async(req, res) => {
                const { email, password } = req.body

                try {
                    //use knex to query the table where username = input UN
                    let users = await knex('employer').where({
                        er_email: email
                    })

                    // if user doesn't exist, then return false - it doesn't exist
                    if (users.length == 0) {
                        console.log('user not exist')
                        return res.status(401).json("Invalid Credential");
                    }

                    // otherwise, get the user
                    let user = users[0];

                    console.log("User", user);

                    // check their password
                    // this is a verify function
                    let result = await hashFunction.checkPassword(password, user.er_password);
                    console.log("Does the check password function work here?", result);

                    // if you get something back, return the user
                    if (result) {

                        // generate that token to the user
                        const { er_id, er_name, er_type } = user;
                        const payload = {
                            id: er_id,
                            name: er_name,
                            type: er_type,
                        }
                        let token = await JWT.sign(payload, config, { expiresIn: '1d' })

                        return res.json({ token });
                    } else {
                        // otherwise return status as 401 = Unauthorized Error
                        return res.status(401).json("Invalid Credential");
                    }
                } catch (err) {
                    console.error(err.message)
                    throw new Error(err);
                }

            });

            router.post("/login/employee", async(req, res) => {
                const { email, password } = req.body

                try {
                    //use knex to query the table where username = input UN
                    let users = await knex('employee').where({
                        ee_email: email
                    })

                    // if user doesn't exist, then return false - it doesn't exist
                    if (users.length == 0) {
                        console.log('user not exist')
                        return res.status(401).json("Invalid Credential");
                    }

                    // otherwise, get the user
                    let user = users[0];

                    console.log("User", user);

                    // check their password
                    // this is a verify function
                    let result = await hashFunction.checkPassword(password, user.ee_password);
                    console.log("Does the check password function work here?", result);

                    // if you get something back, return the user
                    if (result) {

                        // generate that token to the user
                        const { ee_id, ee_name, ee_type } = user;
                        const payload = {
                            id: ee_id,
                            name: ee_name,
                            type: ee_type
                        }
                        let token = await JWT.sign(payload, config, { expiresIn: '1d' })

                        return res.json({ token });
                    } else {
                        // otherwise return status as 401 = Unauthorized Error
                        return res.status(401).json("Invalid Credential");
                    }
                } catch (err) {
                    console.error(err.message)
                    throw new Error(err);
                }
            });

            router.post("/register/admin", async(req, res) => {
                const { name, password } = req.body;

                console.log('registering admin')

                try {
                    // get the user
                    let users = await knex('admin').where({
                        admin_name: name
                    });
                    // if there is a user
                    if (users.length > 0) {
                        // return false - user already exists
                        return res.status(422).json({
                            errors: [{
                                msg: "User already exists"
                            }]
                        })
                    }
                    // otherwise, hash their password
                    let hashedPassword = await hashFunction.hashPassword(password);
                    // get the new user
                    const newUser = {
                        admin_name: name,
                        admin_password: hashedPassword,
                        type: "admin"
                    };
                    //insert the new user, get the user info
                    let user = await knex('admin').insert(newUser).returning("*");
                    console.log("New EE user in database: ", user);

                    // generate that token to the user
                    const { admin_id, admin_name, type } = user;
                    const payload = {
                        id: admin_id,
                        name: admin_name,
                        type: type
                    }
                    let token = await JWT.sign(payload, config, { expiresIn: '1d' })

                    // pass back the user token
                    return res.json({ token });
                } catch (error) {
                    console.error(error.message)
                    throw new Error(error);
                }

            });

            router.post("/login/admin", async(req, res) => {
                const { name, password } = req.body

                console.log('admin login')

                try {
                    //use knex to query the table where username = input UN
                    let users = await knex('admin').where({
                        admin_name: name
                    })

                    // if user doesn't exist, then return false - it doesn't exist
                    if (users.length == 0) {
                        console.log('user not exist')
                        return res.status(401).json("Invalid Credential");
                    }

                    // otherwise, get the user
                    let user = users[0];

                    console.log("User", user);

                    // check their password
                    // this is a verify function
                    let result = await hashFunction.checkPassword(password, user.admin_password);


                    // if you get something back, return the user
                    if (result) {

                        // generate that token to the user
                        const { admin_id, admin_name, type } = user;
                        const payload = {
                            id: admin_id,
                            name: admin_name,
                            type: type
                        }
                        let token = await JWT.sign(payload, config, { expiresIn: '1d' })

                        return res.json({ token });
                    } else {
                        // otherwise, give them a message - incorrect credentials
                        return res.status(401).json("Invalid Credential");
                    }
                } catch (err) {
                    console.error(err.message)
                    throw new Error(err);
                }
            });


            return router;
        };
    }
}

module.exports = RegLoginRouter;