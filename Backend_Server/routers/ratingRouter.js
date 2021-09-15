const express = require('express');

class RatingRouter {
    constructor(ratingServices) {
        this.ratingServices = ratingServices;
    }
    router = () => {
        const router = express.Router();



        return router;
    }

}

module.exports = RatingRouter;