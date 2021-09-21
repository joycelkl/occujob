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
            const { name, intro, phone, expectedSalary, industry, availability, location, image, exp, skill, salaryType } = req.body

            return this.employeeService
                .updateProfile(
                    req.user.id,
                    name, intro, phone, expectedSalary, industry, availability, location, image, exp, skill, salaryType)
                .then((updatedUser) => {
                    res.json(updatedUser)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        //to be rewrite the logic
        router.post('/search/result', (req, res) => {
            //list all job match search param
            console.log('posting to searchresult', req.body)
            return this.employeeService
                .searchJob(req.body)
                .then((job) => {
                    res.json(job)
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

        //tested ok
        router.post('/search/result/:job_id', (req, res) => {
            //apply btn
            return this.employeeService
                .apply(req.params.job_id, req.user.id)
                .then((apply) => {
                    res.json(apply)
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

            console.log('home run', req.user)

            if (req.user.type == "ee")
            //list job details via application id 

                return this.employeeService
                .homeJobList()
                .then((jobDetail) => {
                    return res.json(jobDetail)
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
        })

        //tested
        router.get('/search/results/:job_id', (req, res) => {
            console.log('checking individual job', req.params.job_id)
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

        //getting portfolio by eeid
        router.get('/portfolio', (req, res) => {
            console.log('getting port', req.user.id)
            return this.employeeService
                .getPortfolio(req.user.id)
                .then((portfolio) => {
                    return res.json(portfolio)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.post('/portfolio/add', (req, res) => {
            const { pName, pDes, purl } = req.body
            console.log('adding p in router', pName, pDes, purl)

            return this.employeeService
                .addPortfolio(req.user.id, pName, pDes, purl)
                .then((portfolio) => {
                    return res.json(portfolio)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.post('/portfolio/update', (req, res) => {
            const { p_id, pName, pDes, purl } = req.body

            return this.employeeService
                .updatePortfolio(p_id, pName, pDes, purl)
                .then((updatedP) => {
                    return res.json(updatedP)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.post('/portfolio/delete', (req, res) => {
            const { p_id } = req.body

            return this.employeeService
                .delPortfolio(p_id)
                .then((data) => {
                    return res.json(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.get('/employerDetail/:er_id', (req, res) => {

            return this.employeeService
                .loadErProfile(req.params.er_id)
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

module.exports = EmployeeRouter;