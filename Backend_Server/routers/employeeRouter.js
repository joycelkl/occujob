const express = require('express');

class EmployeeRouter {
    constructor(employeeService, jobServices) {
        this.employeeService = employeeService,
            this.jobServices = jobServices
    }
    router = () => {
        const router = express.Router();

        //tested no problem
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

        //tested work
        router.post('/profile', (req, res) => {
            console.log('req.body', req.body)
                //should take the form job and 
            return this.employeeService
                .updateProfile(
                    req.user.id,
                    req.body.name,
                    req.body.intro,
                    req.body.phone,
                    req.body.expectedSalary,
                    req.body.industry)
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
                .then(console.log(req.user))
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        //tested no problem
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

        //tested no problem
        router.get('/search', (req, res) => {
            //search engine/method research 
            res.render('searchJob', { layout: 'JobSeeker' })
        })

        //tested work
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
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        //tested work
        router.get('/search/result/:id', (req, res) => {
            //list job:id details
            return this.jobServices
                .viewindividualjob(req.params.id)
                .then((job) => {
                    res.render('jobDetails', {
                        job: job,
                        layout: 'JobSeeker'
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        //tested work 
        router.post('/search/result/:id', (req, res) => {
            //apply btn
            return this.employeeService
                .apply(req.params.id, req.user.id)
                .then(res.redirect('/employee/search'))
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        //tested okay
        router.get('/offer', (req, res) => {
            //list all offer from offer table where id = user
            return this.employeeService
                .listJob(req.user.id)
                .then((job) => {
                    console.log(job)
                    res.render('offer', {
                        job: job,
                        layout: 'JobSeeker'
                    })
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
        })

        //tested okay
        router.get('/offer/:id', (req, res) => {
            //list job:id details via application id 
            return this.employeeService
                .jobDetailOffer(req.params.id, req.user.id)
                .then((jobDetail) => {
                    console.log('job dets in route', jobDetail)
                    res.render('offerDetail', {
                        jobDetail: jobDetail,
                        layout: 'JobSeeker'
                    })
                })
                .catch((err) => {
                    res.status(500).json(err)
                })

        })

        //tested okay
        router.post('/offer/accept/:id', (req, res) => {
            console.log('running accept')
            return this.employeeService
                .acceptOffer(req.params.id)
                .then(res.redirect('/employee/offer'))
                .catch((err) => {
                    res.status(500).json(err)
                })
        })

        //tested okay
        router.post('/offer/decline/:id', (req, res) => {
            return this.employeeService
                .declineOffer(req.params.id)
                .then(res.redirect('/employee/offer'))
                .catch((err) => {
                    res.status(500).json(err)
                })
        })
        return router;
    }

}

module.exports = EmployeeRouter;