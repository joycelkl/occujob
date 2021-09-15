const express = require('express');

class ChatroomRouter {
    constructor(chatroomServices) {
        this.chatroomServices = chatroomServices;
    }
    router = () => {
        const router = express.Router();

        router.get('/chatroom', (req, res) => {
            res.send('chatroom server is running')
        })


        return router;
    }

}

module.exports = ChatroomRouter;