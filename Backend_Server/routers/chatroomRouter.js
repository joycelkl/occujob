const express = require('express');


class ChatroomRouter {
    constructor(chatroomServices, io) {
        this.chatroomServices = chatroomServices;
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
            console.log('route is okay')
            return this.chatroomServices.testing()
                .then((data) => {

                    return res.json(data)
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