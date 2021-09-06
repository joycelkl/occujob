const express = require('express');

class EmployeeRouter {
    constructor(employeeService, jobServices) {
        this.employeeService = employeeService,
            this.jobServices = jobServices
    }
    router = () => {
        const router = express.Router();

        //tested okay
        router.get('/profile', (req, res) => {
            return this.employeeService
                .listUserInfo(req.user.id)
                .then((job) => {
                    res.json(job)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        //tested ok
        router.post('/profile', (req, res) => {
            //should take the form job and 
            const { name, intro, phone, expectedSalary, industry, availability, location } = req.body
            return this.employeeService
                .updateProfile(
                    req.user.id,
                    name, intro, phone, expectedSalary, industry, availability, location)
                .then((updatedUser) => {
                    res.json(updatedUser)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        //to be rewrite to save to cloud
        router.post('/profile/img', (req, res) => {
            //should send a req to employeeService.updateImg()
            return this.employeeService
                .updateImg(req.files.img.data, req.user.id)
                .then(() => {
                    return this.employeeService
                        .listUserInfo(req.user.id)
                        .then((job) => {
                            res.render('eeprofile', {
                                job: job,
                                layout: 'JobSeeker'
                            })
                        })
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
        })

        //Frontend will handle this route
        // router.get('/search', (req, res) => {
        //     //search engine/method research 
        //     res.render('searchJob', { layout: 'JobSeeker' })
        // })

        //to be rewrite the logic
        router.post('/search/result', (req, res) => {
            //list all job match search param
            console.log('posting to searchresult')
            return this.employeeService
                .searchJob(req.body)
                .then((job) => {
                    console.log('req.body', req.body)
                    res.render('searchResults', {
                        job: job,
                        layout: "JobSeeker"
                    })
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        //tested
        router.get('/search/result/:job_id', (req, res) => {
            //list job:id details
            return this.jobServices
                .viewindividualjob(req.params.job_id)
                .then((job) => {
                    res.json(job)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        //tested ok
        router.post('/search/result/:id', (req, res) => {
            //apply btn
            return this.employeeService
                .apply(req.params.id, req.user.id)
                .then((apply) => {
                    res.json(apply)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        //tested
        router.get('/offer', (req, res) => {
            //list all offer from offer table where id = user
            return this.employeeService
                .listJob(req.user.id)
                .then((jobs) => {
                    res.json(jobs)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        //tested
        router.get('/offer/:application_id', (req, res) => {
            //list job details via application id 
            return this.employeeService
                .jobDetailOffer(req.params.application_id, req.user.id)
                .then((jobDetail) => {
                    res.json(jobDetail)
                })
                .catch((err) => {
                    res.status(500).json(err)
                })

        })

        //tested
        router.post('/offer/accept/:application_id', (req, res) => {
            console.log('running accept')
            return this.employeeService
                .acceptOffer(req.params.application_id)
                .then((accept) => {
                    return res.json(accept)
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
        })

        //tested
        router.post('/offer/decline/:application_id', (req, res) => {
            return this.employeeService
                .declineOffer(req.params.application_id)
                .then((decline) => {
                    return res.json(decline)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                })
        })

        router.get('/home', (req, res) => {
            //list job details via application id 
            return this.employeeService
                .homeJobList()
                .then((jobDetail) => {
                    res.json(jobDetail)
                })
                .catch((err) => {
                    res.status(500).json(err)
                })

        })

        return router;
    }

}

module.exports = EmployeeRouter;