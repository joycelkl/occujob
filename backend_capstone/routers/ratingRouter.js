const express = require('express');

class RatingRouter {
    constructor(ratingServices) {
        this.ratingServices = ratingServices;
    }

    router = () => {
        const router = express.Router();

        // start with /employee check what himself wrote
        router.get('/applicantCreatedRating', (req, res) => {
            return this.ratingServices
                .listWhatAplicantWrote(req.user.id)
                .then((rating) => {
                    return res.json(rating)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        // start with /employer check what company wrote
        router.get('/companyCreatedRating', (req, res) => {
            return this.ratingServices
                .listWhatCompanyWrote(req.user.id)
                .then((rating) => {
                    return res.json(rating)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

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

        // start with /employer since it need user id from employer router
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

        // start with /employee since it need user id from employee router
        router.get('/checkCompanyRating', (req, res) => {
            return this.ratingServices
                .listCompanyRating(req.er_id)
                .then((rating) => {
                    return res.json(rating)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        // start with /employer to view
        router.get('/checkApplicantRating', (req, res) => {
            return this.ratingServices
                .listApplicantsRating(req.ee_id)
                .then((rating) => {
                    res.json(rating)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        //post Rating testing out in employee router
        router.post('/applicantsGiveRating', (req, res) => {
            //posting job with jobServices 
            const {
                er_id,
                application_id,
                rate,
                comment,
            } = req.body

            return this.ratingServices.applicantsGiveRating(er_id, application_id, rate, comment)
                .then(() => {
                    return this.ratingServices
                        .listWhatAplicantWrote(req.user.id)
                        .then((rating) => {
                            return res.json(rating)
                        })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        //post Rating testing out in employer router
        router.post('/companyGiveRating', (req, res) => {
            //posting job with jobServices 
            const {
                ee_id,
                application_id,
                rate,
                comment,
            } = req.body

            return this.ratingServices.companyGiveRating(ee_id, application_id, rate, comment)
                .then(() => {
                    return this.ratingServices.listWhatCompanyWrote(req.user.id)
                        .then((rating) => {
                            return res.json(rating)
                        })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        // start with /employee since it need user id from employee router
        router.get('/applicantViewCompany/:er_id', (req, res) => {
            return this.ratingServices
                .listCompanyRating(req.params.er_id)
                .then((rating) => {
                    return res.json(rating)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        // start with /employer since it need user id from employer router
        router.get('/companyViewApplicant/:ee_id', (req, res) => {
            return this.ratingServices
                .listApplicantsRating(req.params.ee_id)
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