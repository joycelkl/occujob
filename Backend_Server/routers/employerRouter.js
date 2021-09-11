const express = require('express')

class EmployerRouter {
    constructor(employerServices, jobSerivces) {
        this.employerServices = employerServices;
        this.jobSerivces = jobSerivces;
    }
    router = () => {
        const router = express.Router();

        //tested ok
        router.get('/profile', (req, res) => {
            console.log("GETTING EE PROFILE")
                //load main page as company profile after logged in
            console.log('req.user', req.user)
            return this.employerServices.loadProfile(req.user.id)
                .then((profile) => {
                    return res.json(profile)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        });

        //tested ok
        router.post('/profile', (req, res) => {
            //update profile itmes except img
            console.log('update profile in router', req.user.id)
            const { industry, compDescription, phone, location, image } = req.body
            return this.employerServices.updateProfile(req.user.id, industry, compDescription, phone, location, image)
                .then((updatedProfile) => {
                    return res.json(updatedProfile)
                })
                .catch((err) => {
                    res.status(500).json(err)
                });

        });

        //no tested yet will need to change the img save to cloud
        //url should be text
        // router.post('/profile/img', (req, res) => {
        //     console.log("uploading img")
        //     return this.employerServices.updateImg(req.user.id, req.files.img.data)
        //         .then((updated) => {
        //             return res.json(updated)
        //         })
        //         .catch((err) => {
        //             res.status(500).json(err)
        //         });
        // });

        //tested ok
        router.get('/job/list', (req, res) => {
            //load all posted jobs
            return this.employerServices.listJobHistory(req.user.id)
                .then((jobList) => {
                    res.json(jobList)
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        });

        // Provided by React
        // router.get('/job/posting', (req, res) => {
        //     //load job posting page
        //     return res.render('jobPostFrom', { layout: 'Employer' })
        // })

        //tested ok
        router.post('/job/posting', (req, res) => {
            //posting job with jobServices 
            const {
                jobTitle,
                jobDescription,
                reqExp,
                expectSalary,
                jobType,
                jobFunction,
                workPeriod,
                location,
                salaryType
            } = req.body

            return this.employerServices.jobPosting(req.user.id, jobTitle, jobFunction, reqExp, expectSalary,
                    jobDescription, workPeriod, location, jobType, salaryType)
                .then(() => {
                    return res.json('Job Created')
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        //tested ok
        router.get('/job/:job_id', (req, res) => {
            //load individual job detail
            //load applied candidate table
            return this.employerServices.jobDetail(req.params.job_id)
                .then((jobInfo_applydetail) => {
                    // return res.json(jobInfo_applydetail)

                    // let eeid = jobInfo_applydetail[0].employee_id;
                    // let eeExist = true;
                    // if (eeid == undefined) {
                    //     eeExist = false;
                    // }

                    return res.json(jobInfo_applydetail)
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        //tested ok
        router.post('/job/:job_id', (req, res) => {
            //update individual job detail
            console.log('job updating no.', req.params.job_id)
            const { jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, status, location, empType, salaryType } = req.body
            console.log('req.body', req.body)
            return this.employerServices.jobUpdating(req.params.job_id,
                    jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, status, location, empType, salaryType)
                .then((updatedJob) => {
                    return res.json(updatedJob)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                });
        })

        //tested ok
        router.post('/job/posting/repost', (req, res) => {
            console.log('repost')
            const {
                jobTitle,
                jobDescription,
                reqExp,
                expectSalary,
                jobType,
                jobFunction,
                workPeriod,
                location,
                salaryType
            } = req.body

            return this.employerServices.jobPosting(req.user.id,
                    jobTitle, jobFunction, reqExp, expectSalary,
                    jobDescription, workPeriod, location, jobType, salaryType
                )
                .then((postedJob) => {
                    return res.json(postedJob)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        //tested ok
        router.get('/job/candidate/:application_id', (req, res) => {
            //load applied candidate detail + application id for offer button
            return this.employerServices.candidateDetail(req.params.application_id)
                .then((candidateDetail) => {
                    return res.json(candidateDetail)
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
        })

        //tested ok
        router.post('/job/candidate/offer/:application_id', (req, res) => {
            //place offer to candidate by offer button
            console.log("req id", req.params.application_id)
            return this.employerServices.offering(req.params.application_id)
                .then((offer) => {
                    return res.json(offer)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        //Optional function *** Candidate search
        //Frontend will handle this page
        // router.get('/candidateSearch', (req, res) => {
        //     return res.render('erCandidateSearch', { layout: 'Employer' })
        // })

        //to be rewrited?????
        router.post('/candidateSearch', (req, res) => {
            //req.body = expectedSalary, jobFunction
            return this.employerServices.candidateFilter(req.body)
                .then((candidateList) => {
                    console.log('candidateList in post', candidateList)
                    return res.json(candidateList)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json(err)
                });
        })

        //tested
        router.get('/candidateSearch/:ee_id', (req, res) => {

            return this.employerServices.searchCandidateDetail(req.params.ee_id)
                .then((canDetail) => {
                    return res.json(canDetail)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.get('/home', (req, res) => {

            return this.employerServices.homeJobList()
                .then((jobDetail) => {
                    return res.json(jobDetail)
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