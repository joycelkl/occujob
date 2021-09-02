//for url encrypt
const encryptFunction = require('./urlEncrypt');

class EmployerServices {
    constructor(knex) {
        this.knex = knex
    }

    loadProfile(userId) {
        return this.knex('employer')
            .where({
                er_id: userId
            })
            .then((profile) => {
                console.log("employer", profile)
                if (profile[0].img_data) {
                    let base = Buffer.from(profile[0].img_data);
                    let conversion = base.toString('base64');
                    profile[0].image = conversion;
                }
                return profile;
            })
            .catch((err) => {
                throw new Error(err)
            });
    }

    updateProfile(userId, industry, compDescription, phone, location) {
        console.log('erService update profile')
        return this.knex('employer')
            .where({
                er_id: userId
            })
            .update({
                er_industry: industry,
                comp_description: compDescription,
                er_location: location,
                er_phone: phone
            })
            .returning('*')
            .then((updateProfile) => {
                return updateProfile;
            })
            .catch((err) => {
                console.err
                throw new Error(err)
            });

    }

    //url should be text
    updateImg(userId, er_imgData) {
        return this.knex('employer')
            .where({
                er_id: userId
            })
            .update({
                er_img_data: imgData
            })
            .returning('*')
            .then((updated) => {
                console.log('img uploaded')
                return updated;
            })
            .catch((err) => {
                console.log(err)
                throw new Error(err)
            });


    }

    listJobHistory(userId) {
        return this.knex('job')
            .where({
                employer_id: userId
            })
            .orderBy('created_at', 'dsec')
            .then((jobList) => {
                // jobList.map(jobObj => {
                //     console.log("id in obj", jobObj.id)
                //     jobObj.id = encryptFunction.encryptString(jobObj.id)
                // })
                return jobList;
            })
            .catch((err) => {
                throw new Error(err)
            });
    }

    jobPosting(userId, jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, location) {

        let expiry = new Date(new Date().setDate(new Date().getDate() + 14));
        let formatted_date = expiry.getFullYear() + "-" + (expiry.getMonth() + 1) + "-" + expiry.getDate();

        return this.knex('job')
            .insert({
                employer_id: userId,
                job_title: jobTitle,
                job_function: jobFunction,
                req_exp: reqExp,
                expect_salary: expectSalary,
                job_description: jobDescription,
                work_period: workPeriod,
                expiry_date: formatted_date,
                status: true,
                job_location: location,
            })
            .returning('*')
            .then((job) => {
                return job
            })
            .catch((err) => {
                throw new Error(err)
            });
    }

    jobDetail(jobId) {
        console.log('jobId', jobId)
            //calling individual job detail and application list of the job
            // jobId = encryptFunction.decryptString(jobId);
        return this.knex('application')
            .where('job_id', jobId)
            .then((result) => {
                if (result.length == 0) {
                    return this.knex('job')
                        .where('job_id', jobId)
                        .then((jobDetail) => {
                            return jobDetail;
                        })
                        .catch((err) => {
                            throw new Error(err)
                        });
                } else {
                    return this.knex('job')
                        .join('application', 'application.job_id', '=', 'job.job_id')
                        .join('employee', 'employee.ee_id', '=', 'application.employee_id')
                        .where('job.job_id', jobId)
                        .then((jobList_applyDetail) => {
                            console.log('jobList_applyDetail', jobList_applyDetail)

                            // jobList_applyDetail.map(jobAppObj => {
                            //     console.log("id in obj", jobAppObj.appId)
                            //     jobAppObj.appId = encryptFunction.encryptString(jobAppObj.appId)
                            // })

                            return jobList_applyDetail;
                        })
                        .catch((err) => {
                            throw new Error(err)
                        });
                }
            })
    }

    jobUpdating(jobId, jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, status, location) {
        console.log('job updating', jobId)

        return this.knex('job')
            .where({
                job_id: jobId
            })
            .update({
                job_title: jobTitle,
                job_function: jobFunction,
                req_exp: reqExp,
                expect_salary: expectSalary,
                job_description: jobDescription,
                work_period: workPeriod,
                status: status,
                job_location: location
            })
            .returning('*')
            .then((updatedJob) => {
                // id = encryptFunction.encryptString(id)
                return updatedJob;
            })
            .catch((err) => {
                throw new Error(err)
            });
    }

    candidateDetail(applicationId) {
        // applicationId = encryptFunction.decryptString(applicationId)
        // console.log('application id', applicationId)
        return this.knex('application')
            // .select({ appId: 'application.id' }, 'application.*', 'employee.*')
            .join('employee', 'employee.ee_id', '=', 'application.employee_id')
            .where('application.application_id', applicationId)
            .then((canDetail_appId) => {
                console.log('canDetail_appId', canDetail_appId)
                    // if (canDetail_appId[0].img_data) {
                    //     let base = Buffer.from(canDetail_appId[0].img_data);
                    //     let conversion = base.toString('base64');
                    //     canDetail_appId[0].image = conversion;
                    // }
                    // canDetail_appId[0].job_id = encryptFunction.encryptString(canDetail_appId[0].job_id)

                return canDetail_appId;
            })
            .catch((err) => {
                throw new Error(err)
            });
    }

    offering(applicationId) {
        return this.knex('application')
            .where({
                application_id: applicationId
            })
            .update({
                offer: true
            })
            .returning('*')
            .then((offer) => {
                return offer;
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            });
    }

    //to be rewrited
    candidateFilter(value) {
        //value = expectedSalary, jobFunction(industry)
        console.log('industry', value.industry);
        console.log('salary', value.csExpectedSalary)
        if ((value.csExpectedSalary == 'default' && value.industry == 'default') || (value.csExpectedSalary == 'default' && value.industry == undefined)) {
            console.log("view all")
            return this.knex('employee')
                .orderBy('updated_at', 'desc')
                .then((candidateList) => {
                    return candidateList
                })
                .catch(err => console.log(err))

        } else if (value.csExpectedSalary == "default") {
            let checkingArr = value.industry;
            let searchArr = [];
            if (!Array.isArray(checkingArr)) {
                searchArr.push(value.industry)
            } else {
                searchArr = value.industry
            }
            let num = searchArr.length;
            if (num != 5) {
                for (var i = 0; i < (5 - num); i++) {
                    searchArr.push('')
                }
            }

            return this.knex('employee')
                .orWhere((this.knex.raw('? = any (industry)', searchArr[0])))
                .orWhere((this.knex.raw('? = any (industry)', searchArr[1])))
                .orWhere((this.knex.raw('? = any (industry)', searchArr[2])))
                .orWhere((this.knex.raw('? = any (industry)', searchArr[3])))
                .orWhere((this.knex.raw('? = any (industry)', searchArr[4])))
                .orderBy('updated_at', 'desc')
                .then((candidateList) => {
                    return candidateList
                }).catch(err => console.log(err))
        } else if (value.industry == 'default' || value.industry == undefined) {
            console.log("no job function set")
            if (value.csExpectedSalary < 20000) {
                return this.knex('employee')
                    .andWhere('expectedSalary', '<', value.csExpectedSalary)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        return candidateList
                    }).catch(err => console.log(err))
            } else {
                return this.knex('employee')
                    .andWhere('expectedSalary', '>=', value.csExpectedSalary)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        return candidateList
                    }).catch(err => console.log(err))
            }
        } else {
            let checkingArr = value.industry;
            let searchArr = [];
            if (!Array.isArray(checkingArr)) {
                searchArr.push(value.industry)
            } else {
                searchArr = value.industry
            }
            let num = searchArr.length;
            if (num != 5) {
                for (var i = 0; i < (5 - num); i++) {
                    searchArr.push('')
                }
            }
            if (value.csExpectedSalary < 20000) {
                return this.knex('employee')
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[0])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[1])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[2])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[3])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[4])))
                    .andWhere('expectedSalary', '<', value.csExpectedSalary)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        return candidateList
                    }).catch(err => console.log(err))
            } else {
                return this.knex('employee')
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[0])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[1])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[2])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[3])))
                    .orWhere((this.knex.raw('? = any (industry)', searchArr[4])))
                    .andWhere('expectedSalary', '>=', value.csExpectedSalary)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        return candidateList
                    }).catch(err => console.log(err))
            }

        }

    }

    searchCandidateDetail(eeId) {
        // applicationId = encryptFunction.decryptString(applicationId)
        return this.knex('employee')
            .where('ee_id', eeId)
            .then((canDetail) => {
                console.log('canDetail', canDetail)
                return canDetail;
            })
            .catch((err) => {
                throw new Error(err)
            });
    }
}

module.exports = EmployerServices;