const express = require('express');

// const { io } = require('../app')

class ChatroomRouter {
    constructor(knex, io, ) {
        // this.chatroomServices = chatroomServices;
        this.knex = knex;
        this.io = io;
        this.io.on('connection', (socket) => {
            console.log('we have a new connection!!')

            socket.on('disconnect', () => {
                console.log('User has left!!!')
            })
        })
    }



    router = () => {
        const router = express.Router();

        router.get('/testingChat', (req, res) => {
            return this.knex('job')
                .then((data) => {
                    console.log(data)
                    res.json(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })


        return router;
    }

}

module.exports = ChatroomRouter;