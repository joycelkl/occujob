const express = require('express')

class EmployerRouter {
    constructor(employerServices, jobSerivces) {
        this.employerServices = employerServices;
        this.jobSerivces = jobSerivces;
    }
    router = () => {
        const router = express.Router();

        //tested with postman, work but hardcode userId
        router.get('/profile', (req, res) => {
            console.log("GETTING EE PROFILE")
                //load main page as company profile after logged in

            return this.employerServices.loadProfile(req.user.id)
                .then((profile) => {
                    return res.json(profile)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        });

        //tested with postman, work but hardcode userId
        router.post('/profile', (req, res) => {
            //update profile itmes except img
            console.log('update profile in router', req.user.id)
            return this.employerServices.updateProfile(req.user.id, req.body.industry, req.body.compDescription, req.body.phone, req.body.location)
                .then((updateProfile) => {
                    return res.json(updateProfile)
                })
                .catch((err) => {
                    res.status(500).json(err)
                });

        });

        //tested with postman, work but hardcode userId
        router.post('/profile/img/:id', (req, res) => {
            console.log("uploading img")
            return this.employerServices.updateImg(req.params.id, req.files.img.data)
                .then((id) => {
                    return;
                })
                .then(res.redirect('/employer/profile'))
                .catch((err) => {
                    res.status(500).json(err)
                });

        });

        //tested with postman, work but hardcode userId
        router.get('/job/list', (req, res) => {
            //load all posted jobs
            return this.employerServices.listJobHistory(req.user.id)
                .then((job) => {
                    res.render('erListJobHistory', { job: job, layout: 'Employer' })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        });

        //route tested okay
        router.get('/job/posting', (req, res) => {
            //load job posting page
            return res.render('jobPostFrom', { layout: 'Employer' })
        })

        //tested posting okay
        router.post('/job/posting', (req, res) => {
            //posting job with jobServices 
            console.log("expiry date", req.body)
            return this.employerServices.jobPosting(req.user.id,
                    req.body.jobTitle, req.body.jobCat,
                    req.body.reqExp, req.body.expectSalary,
                    req.body.jobDescription, req.body.workPeriod)
                .then(res.redirect('/employer/job/list'))
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        //tested no problem
        router.get('/job/:id', (req, res) => {
            //load individual job detail
            //load applied candidate table
            return this.employerServices.jobDetail(req.params.id)
                .then((jobInfo_applydetail) => {
                    // return res.json(jobInfo_applydetail)
                    let eeid = jobInfo_applydetail[0].employee_id;
                    let eeExist = true;
                    if (eeid == undefined) {
                        eeExist = false;
                    }
                    console.log('erJobDetails', jobInfo_applydetail)

                    return res.render('erJobDetails', {
                        job_id: jobInfo_applydetail[0].job_id,
                        jobTitle: jobInfo_applydetail[0].jobTitle,
                        jobDescription: jobInfo_applydetail[0].jobDescription,
                        jobCat: jobInfo_applydetail[0].jobCat,
                        workPeriod: jobInfo_applydetail[0].workPeriod,
                        reqExp: jobInfo_applydetail[0].reqExp,
                        expectSalary: jobInfo_applydetail[0].expectSalary,
                        expiry_date: jobInfo_applydetail[0].expiry_date,
                        candidate: jobInfo_applydetail,
                        employer_id: jobInfo_applydetail[0].employer_id,
                        status: jobInfo_applydetail[0].status,
                        exist: eeExist,
                        layout: 'Employer',
                    })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        //route and service ok
        router.post('/job/:id', (req, res) => {
            //update individual job detail
            console.log('job updating no.', req.params.id)
            return this.employerServices.jobUpdating(req.params.id,
                    req.body.jobTitle, req.body.jobCat,
                    req.body.reqExp, req.body.expectSalary,
                    req.body.jobDescription, req.body.workPeriod, req.body.status)
                .then((id) => {
                    return res.redirect('/employer/job/' + id)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                });
        })

        // to be tested out
        router.post('/job/repost/:id', (req, res) => {
            return this.employerServices.jobPosting(req.params.id,
                    req.body.jobTitle, req.body.jobCat,
                    req.body.reqExp, req.body.expectSalary,
                    req.body.jobDescription, req.body.workPeriod,
                )
                .then(res.redirect('/employer/job/list'))
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        //tested no problem
        router.get('/job/candidate/:application_id', (req, res) => {
            //load applied candidate detail + application id for offer button
            return this.employerServices.candidateDetail(req.params.application_id)
                .then((candidateDetail) => {
                    return res.render('candidateProfile', {
                        candidate: candidateDetail,
                        layout: 'Employer',
                    })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        //tested no problem
        router.post('/job/candidate/offer/:application_id/:job_id', (req, res) => {
            //place offer to candidate by offer button
            console.log("req id", req.params.application_id)
            return this.employerServices.offering(req.params.application_id)
                .then(res.redirect('/employer/job/' + req.params.job_id))
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        //Optional function *** Candidate search
        router.get('/candidateSearch', (req, res) => {
            return res.render('erCandidateSearch', { layout: 'Employer' })
        })

        router.post('/candidateSearch', (req, res) => {
            return this.employerServices.candidateFilter(req.body)
                .then((candidateList) => {
                    return res.render('erCandidateSearchResult', {
                        candidate: candidateList,
                        layout: 'Employer',
                    })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        router.get('/candidateSearch/:ee_id', (req, res) => {
            return this.employerServices.searchCandidateDetail(req.params.ee_id)
                .then((canDetail) => {
                    return res.render('erSearchCanProfile', {
                        candidate: canDetail,
                        layout: 'Employer'
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })
        return router;
    }


}

module.exports = EmployerRouter;