const express = require('express');

class ChatroomRouter {
    constructor(chatroomServices) {
        this.chatroomServices = chatroomServices;
    }
    router = () => {
        const router = express.Router();



        return router;
    }

}

module.exports = ChatroomRouter;