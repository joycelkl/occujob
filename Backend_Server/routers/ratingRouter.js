const express = require('express');

class RatingRouter {
    constructor(ratingServices) {
        this.ratingServices = ratingServices;
    }
    
    router = () => {
        const router = express.Router();
        
        // start with /employee since it need user id from employee router
        router.get('/applicantRatingView', (req, res) => {
            return this.ratingServices
                .listApplicantsOwnRating(req.user.id)
                .then((rating) => {
                   return res.json(rating)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })
// start with /employer since it need user id from employee router
        router.get('/companyRatingView', (req, res) => {
            return this.ratingServices
                .listCompanyOwnRating(req.user.id)
                .then((rating) => {
                    res.json(rating)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })
        return router;
    }

}

module.exports = RatingRouter;