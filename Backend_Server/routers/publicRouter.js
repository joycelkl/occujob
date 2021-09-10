const express = require('express')

class PublicRouter {
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

        router.get('/skill', (req, res) => {
            console.log('getting skill')

            return this.jobSerivces.skill()
                .then((skill) => {
                    return res.json(skill)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        router.get('/location', (req, res) => {
            console.log('getting skill')

            return this.jobSerivces.location()
                .then((location) => {
                    return res.json(location)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        router.get('/industry', (req, res) => {
            console.log('getting industry')

            return this.jobSerivces.industry()
                .then((industry) => {
                    return res.json(industry)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        router.get('/company', (req, res) => {
            return this.jobSerivces.company()
                .then((companyName) => {
                    return res.json(companyName)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        return router;
    }
}

module.exports = PublicRouter;