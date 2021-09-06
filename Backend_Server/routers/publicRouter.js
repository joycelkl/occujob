const express = require('express')

class JobRouter {
    constructor(jobSerivces) {
        this.jobSerivces = jobSerivces;
    }
    router = () => {
        const router = express.Router();


        router.get('/job', (req, res) => {

            console.log("GETTING PUBLIC JOB")

            return this.jobSerivces.publicJob()
                .then((jobDetail) => {
                    return res.json(jobDetail)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        });

        return router;
    }
}

module.exports = JobRouter;