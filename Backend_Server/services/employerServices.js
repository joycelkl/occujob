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
                    // if (profile[0].img_data) {
                    //     let base = Buffer.from(profile[0].img_data);
                    //     let conversion = base.toString('base64');
                    //     profile[0].image = conversion;
                    // }
                return profile;
            })
            .catch((err) => {
                throw new Error(err)
            });
    }

    updateProfile(userId, industry, compDescription, phone, location, image) {
        console.log('erService update profile')
        return this.knex('employer')
            .where({
                er_id: userId
            })
            .update({
                er_industry: industry,
                comp_description: compDescription,
                er_location: location,
                er_phone: phone,
                er_img_data: image
            })
            .returning('*')
            .then((updatedProfile) => {
                return updatedProfile;
            })
            .catch((err) => {
                console.err
                throw new Error(err)
            });
    }

    // //url should be text
    // updateImg(userId, er_imgData) {
    //     return this.knex('employer')
    //         .where({
    //             er_id: userId
    //         })
    //         .update({
    //             er_img_data: imgData
    //         })
    //         .returning('*')
    //         .then((updated) => {
    //             console.log('img uploaded')
    //             return updated;
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             throw new Error(err)
    //         });
    // }

    listJobHistory(userId) {
        return this.knex('job')
            .join('employer', 'employer.er_id', '=', 'job.employer_id')
            .where('job.employer_id', userId)
            .select("job.*", 'employer.er_img_data')
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

    jobPosting(userId, jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, location, jobType, salaryType) {

        let expiry = new Date(new Date().setDate(new Date().getDate() + 14));
        let formatted_date = expiry.getFullYear() + "-" + (expiry.getMonth() + 1) + "-" + expiry.getDate();

        return this.knex('job')
            .insert({
                employer_id: userId,
                job_title: jobTitle,
                job_function: jobFunction,
                job_type: jobType,
                req_exp: reqExp,
                expect_salary: expectSalary,
                job_description: jobDescription,
                work_period: workPeriod,
                expiry_date: formatted_date,
                status: true,
                job_location: location,
                job_salary_type: salaryType
            })
            .returning('*')
            .then((postedJob) => {
                console.log(postedJob)
                return postedJob
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
                        .select({ jobCreate: 'job.created_at' }, 'job.*')
                        .where('job_id', jobId)
                        .then((jobDetail) => {
                            return jobDetail;
                        })
                        .catch((err) => {
                            throw new Error(err)
                        });
                } else {
                    return this.knex('job')
                        .select({ jobCreate: 'job.created_at' }, 'job.*', 'application.*', 'employee.*')
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

    jobUpdating(jobId, jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, status, location, jobType, salaryType) {
        console.log('job updating', jobId)

        return this.knex('job')
            .where({
                job_id: jobId
            })
            .update({
                job_title: jobTitle,
                job_function: jobFunction,
                job_type: jobType,
                req_exp: reqExp,
                expect_salary: expectSalary,
                job_description: jobDescription,
                work_period: workPeriod,
                status: status,
                job_location: location,
                job_salary_type: salaryType
            })
            .returning('*')
            .then((updatedJob) => {
                // id = encryptFunction.encryptString(id)
                console.log('upatedjob', updatedJob)
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

        console.log('search value', value)
        const { available, salaryType, expSalary, workExp, jobFunction, skills, location } = value

        console.log('data', available, salaryType, expSalary, workExp, jobFunction, skills, location)

        let availableArr = [];
        if (available == null) {
            availableArr = ['', '', '']
        } else {
            if (!Array.isArray(available)) {
                availableArr.push(available)
            } else {
                availableArr = available
            }
        }
        let avanum = availableArr.length;
        if (avanum != 3) {
            for (var i = 0; i < (3 - avanum); i++) {
                availableArr.push('')
            }
        }

        console.log('availableArr', availableArr)

        let jobFunctionArr = [];
        if (jobFunction == null) {
            jobFunctionArr = ['', '', '']
        } else {
            if (!Array.isArray(jobFunction)) {
                jobFunctionArr.push(jobFunction)
            } else {
                jobFunctionArr = jobFunction
            }
        }
        let jobfnum = jobFunctionArr.length;
        if (jobfnum != 3) {
            for (var i = 0; i < (3 - jobfnum); i++) {
                jobFunctionArr.push('')
            }
        }

        console.log('jobFunctionArr', jobFunctionArr)

        let skillsArr = [];
        if (skills == null) {
            skillsArr = ['', '', '']
        } else {
            if (!Array.isArray(skills)) {
                skillsArr.push(skills)
            } else {
                skillsArr = skills
            }
        }
        let skillsnum = skillsArr.length;
        if (skillsnum != 3) {
            for (var i = 0; i < (3 - skillsnum); i++) {
                skillsArr.push('')
            }
        }

        console.log('skillsArr', skillsArr)


        let locationArr = [];
        if (location == null) {
            locationArr = ['', '', '']
        } else {
            if (!Array.isArray(location)) {
                locationArr.push(location)
            } else {
                locationArr = location
            }
        }
        let localnum = locationArr.length;
        if (localnum != 3) {
            for (var i = 0; i < (3 - localnum); i++) {
                locationArr.push(locationArr[0])
            }
        }
        console.log('locationArr', locationArr)

        if (available == null && jobFunction == null && skills == null && location == null && salaryType == null && workExp == null) {
            return this.knex('employee')
                .orderBy('updated_at', 'desc')
                .then((candidateList) => {
                    console.log('all null', candidateList)
                    return candidateList
                }).catch(err => console.log(err))
        }

        if (salaryType == null) {
            if (workExp == null) {
                return this.knex('employee')
                    .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                    .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                    .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                    .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                    .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                    .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                    .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                    .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                    .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                    .orWhere('ee_location', locationArr[0])
                    .orWhere('ee_location', locationArr[1])
                    .orWhere('ee_location', locationArr[2])
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salaryType & workExp', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else {
                if (workExp < 6) {
                    return this.knex('employee')
                        .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                        .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                        .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                        .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                        .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                        .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                        .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                        .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                        .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                        .orWhere('ee_location', locationArr[0])
                        .orWhere('ee_location', locationArr[1])
                        .orWhere('ee_location', locationArr[2])
                        .andWhere('expected_salary', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salaryType || workExp < 6', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                        .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                        .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                        .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                        .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                        .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                        .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                        .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                        .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                        .orWhere('ee_location', locationArr[0])
                        .orWhere('ee_location', locationArr[1])
                        .orWhere('ee_location', locationArr[2])
                        .andWhere('expected_salary', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salaryType || workExp > 6', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                }
            }
        } else {
            if (salaryType == 'perJob') {
                if (expSalary < 7501) {
                    if (workExp == null) {
                        return this.knex('employee')
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                            .orWhere('ee_location', locationArr[0])
                            .orWhere('ee_location', locationArr[1])
                            .orWhere('ee_location', locationArr[2])
                            .andWhere('ee_salary_type', salaryType)
                            .andWhere('expected_salary', '<=', expSalary)
                            .orderBy('updated_at', 'desc')
                            .then((candidateList) => {
                                console.log('salaryType perJon < 7501 || no workExp', candidateList)
                                return candidateList
                            }).catch(err => console.log(err))
                    } else {
                        if (workExp < 6) {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '<=', expSalary)
                                .andWhere('ee_exp', '<=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perJon < 7501 || workExp < 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        } else {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '<=', expSalary)
                                .andWhere('ee_exp', '>=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perJon < 7501 || workExp > 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        }
                    }
                } else {
                    if (workExp == null) {
                        return this.knex('employee')
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                            .orWhere('ee_location', locationArr[0])
                            .orWhere('ee_location', locationArr[1])
                            .orWhere('ee_location', locationArr[2])
                            .andWhere('ee_salary_type', salaryType)
                            .andWhere('expected_salary', '>=', expSalary)
                            .orderBy('updated_at', 'desc')
                            .then((candidateList) => {
                                console.log('salaryType perJon > 7501 || no workExp', candidateList)
                                return candidateList
                            }).catch(err => console.log(err))
                    } else {
                        if (workExp < 6) {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '>=', expSalary)
                                .andWhere('ee_exp', '<=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perJon > 7501 || workExp < 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        } else {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '>=', expSalary)
                                .andWhere('ee_exp', '>=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perJon > 7501 || workExp > 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        }
                    }
                }
            } else {
                if (expSalary < 201) {
                    if (workExp == null) {
                        return this.knex('employee')
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                            .orWhere('ee_location', locationArr[0])
                            .orWhere('ee_location', locationArr[1])
                            .orWhere('ee_location', locationArr[2])
                            .andWhere('ee_salary_type', salaryType)
                            .andWhere('expected_salary', '<=', expSalary)
                            .orderBy('updated_at', 'desc')
                            .then((candidateList) => {
                                console.log('salaryType perHour < 201 || workExp nil', candidateList)
                                return candidateList
                            }).catch(err => console.log(err))
                    } else {
                        if (workExp < 6) {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '<=', expSalary)
                                .andWhere('ee_exp', '<=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perHour < 201 || workExp < 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        } else {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '<=', expSalary)
                                .andWhere('ee_exp', '>=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perHour < 201 || workExp > 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        }
                    }
                } else {
                    if (workExp == null) {
                        return this.knex('employee')
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                            .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                            .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                            .orWhere('ee_location', locationArr[0])
                            .orWhere('ee_location', locationArr[1])
                            .orWhere('ee_location', locationArr[2])
                            .andWhere('ee_salary_type', salaryType)
                            .andWhere('expected_salary', '>=', expSalary)
                            .orderBy('updated_at', 'desc')
                            .then((candidateList) => {
                                console.log('salaryType perHour > 201 || workExp nil', candidateList)
                                return candidateList
                            }).catch(err => console.log(err))
                    } else {
                        if (workExp < 6) {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '>=', expSalary)
                                .andWhere('ee_exp', '<=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perHour > 201 || workExp < 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        } else {
                            return this.knex('employee')
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[0])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[1])))
                                .orWhere((this.knex.raw('? = any (availability)', availableArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_industry)', jobFunctionArr[2])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[0])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[1])))
                                .orWhere((this.knex.raw('? = any (ee_skill)', skillsArr[2])))
                                .orWhere('ee_location', locationArr[0])
                                .orWhere('ee_location', locationArr[1])
                                .orWhere('ee_location', locationArr[2])
                                .andWhere('ee_salary_type', salaryType)
                                .andWhere('expected_salary', '>=', expSalary)
                                .andWhere('ee_exp', '>=', workExp)
                                .orderBy('updated_at', 'desc')
                                .then((candidateList) => {
                                    console.log('salaryType perHour > 201 || workExp > 6', candidateList)
                                    return candidateList
                                }).catch(err => console.log(err))
                        }
                    }
                }
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

    homeJobList() {

        return this.knex('job')
            .join('employer', 'employer.er_id', '=', 'job.employer_id')
            .where('job.expiry_date', '>', new Date())
            .select('job.job_title', 'employer.er_name', 'job.created_at', 'employer.er_img_data', 'job.job_id', 'job.job_type')
            .then((jobDetail) => {
                console.log('public', jobDetail)
                return jobDetail
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            });
    }
}

module.exports = EmployerServices;