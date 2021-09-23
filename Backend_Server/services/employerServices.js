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

    listJobHistory(userId) {
        return this.knex('job')
            .join('employer', 'employer.er_id', '=', 'job.employer_id')
            .where('job.employer_id', userId)
            .select("job.*", 'employer.er_img_data')
            .orderBy('job.created_at', 'dsec')
            .then((jobList) => {
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
                        .orderBy('application.created_at', 'asc')
                        .where('job.job_id', jobId)
                        .then((jobList_applyDetail) => {
                            console.log('jobList_applyDetail', jobList_applyDetail)

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

        return this.knex('application')
            // .select({ appId: 'application.id' }, 'application.*', 'employee.*')
            .join('employee', 'employee.ee_id', '=', 'application.employee_id')
            .where('application.application_id', applicationId)
            .then((canDetail_appId) => {
                console.log('canDetail_appId', canDetail_appId)
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

        // console.log('search value', value)
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
                availableArr.push(availableArr[0])
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
                jobFunctionArr.push(jobFunctionArr[0])
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
                skillsArr.push(skillsArr[0])
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

        const test = this.knex

        if (jobFunction == null && location == null && workExp == '' && available == null && skills == null && expSalary == '') {
            return this.knex('employee')
                .orderBy('updated_at', 'desc')
                .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                .then((candidateList) => {
                    console.log('all null', candidateList)
                    return candidateList
                }).catch(err => console.log(err))
        }


        if (expSalary == '' && workExp == '') {
            if (jobFunction == null && available !== null && location !== null && skills !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only availability, skills, location', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only availability & skills & jobFunction', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only availability & location & jobFunction', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only skills, location, jobfunction', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only skills & availability', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only availability & location', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only skill & location', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only availability & jobFunction', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only skills & jobFunction', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only location & jobFunction', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (jobFunction == null && location == null && skills == null && available !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only availability', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (jobFunction == null && location == null && available == null && skills !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only skills', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (jobFunction == null && skills == null && available == null && location !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only location', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else if (location == null && skills == null && available == null && jobFunction !== null) {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && only jobFunction', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            } else {
                return this.knex('employee')
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                    .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                    .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                    .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                    .orderBy('updated_at', 'desc')
                    .then((candidateList) => {
                        console.log('no salary & workexp && with all others', candidateList)
                        return candidateList
                    }).catch(err => console.log(err))
            }
        }

        if (expSalary !== '' && workExp == '') {
            if (expSalary == '7501' || expSalary == '201') {
                if (jobFunction == null && available == null && location == null && skills == null) {
                    return this.knex('employee')
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && all null', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available !== null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only availability, skills, location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only availability & skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only availability & location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only skills, location, jobfunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only skills & availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only availability & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only skill & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only availability & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills == null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && available == null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only skills', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available == null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available == null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && only jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary = 7501 /201 && with all others', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                }
            } else {
                if (jobFunction == null && available == null && location == null && skills == null) {
                    return this.knex('employee')
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && all null', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available !== null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only availability, skills, location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only availability & skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only availability & location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only skills, location, jobfunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only skills & availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only availability & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only skill & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only availability & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills == null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && available == null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only skills', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available == null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available == null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && only jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no workexp & salary < 7501 /201 && with all others', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                }
            }
        }

        if (expSalary == '' && workExp !== '') {
            if (workExp == 6) {
                if (jobFunction == null && available == null && location == null && skills == null) {
                    return this.knex('employee')
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && all null', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available !== null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only availability, skills, location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only availability & skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only availability & location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only skills, location, jobfunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only skills & availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only availability & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only skill & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only availability & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills == null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && available == null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only skills', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available == null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available == null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && only jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp = 6 && with all others', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                }
            } else {
                if (jobFunction == null && available == null && location == null && skills == null) {
                    return this.knex('employee')
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && all null', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available !== null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only availability, skills, location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only availability & skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only availability & location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only skills, location, jobfunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only skills & availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only availability & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only skill & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only availability & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills == null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && available == null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only skills', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available == null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available == null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && only jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('no salary with workExp < 6 && with all others', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                }
            }
        }

        if (expSalary !== '' && workExp !== '') {
            if ((expSalary == 7501 || expSalary == 201) && workExp == 6) {
                if (jobFunction == null && available == null && location == null && skills == null) {
                    return this.knex('employee')
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && all null', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available !== null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only availability, skills, location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only availability & skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only availability & location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only skills, location, jobfunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only skills & availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only availability & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only skill & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only availability & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills == null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && available == null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only skills', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available == null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available == null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && only jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '>=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary = 7501 /201 & workExp = 6 && with all others', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                }
            } else if ((expSalary !== 7501 || expSalary !== 201) && workExp == 6) {
                if (jobFunction == null && available == null && location == null && skills == null) {
                    return this.knex('employee')
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && all null', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available !== null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only availability, skills, location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only availability & skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only availability & location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only skills, location, jobfunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only skills & availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only availability & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only skill & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only availability & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills == null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && available == null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only skills', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available == null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available == null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && only jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '>=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp = 6 && with all others', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                }
            } else if ((expSalary !== 7501 || expSalary !== 201) && workExp !== 6) {
                if (jobFunction == null && available == null && location == null && skills == null) {
                    return this.knex('employee')
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && all null', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available !== null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only availability, skills, location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && jobFunction !== null && available !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only availability & skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && jobFunction !== null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only availability & location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (available == null && jobFunction !== null && skills !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only skills, location, jobfunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills !== null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only skills & availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only availability & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && available == null && location !== null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only skill & location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only availability & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && available == null && skills !== null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only skills & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (skills == null && available == null && jobFunction !== null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only location & jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && skills == null && available !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only availability', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && location == null && available == null && skills !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only skills', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (jobFunction == null && skills == null && available == null && location !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only location', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else if (location == null && skills == null && available == null && jobFunction !== null) {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && only jobFunction', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
                } else {
                    return this.knex('employee')
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_industry) or ? = any (ee_industry) or ? = any (ee_industry)', [jobFunctionArr[0], jobFunctionArr[1], jobFunctionArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (availability) or ? = any (availability) or ? = any (availability)', [availableArr[0], availableArr[1], availableArr[2]])) })
                        .andWhere(function() { this.andWhere(test.raw('? = any (ee_skill) or ? = any (ee_skill) or ? = any (ee_skill)', [skillsArr[0], skillsArr[1], skillsArr[2]])) })
                        .andWhere(function() { this.andWhere('ee_location', 'like', `%${locationArr[0]}%`).orWhere('ee_location', 'like', `%${locationArr[1]}%`).orWhere('ee_location', 'like', `%${locationArr[2]}%`) })
                        .andWhere('ee_salary_type', 'like', `%${salaryType}%`)
                        .andWhere('expected_salary', '<=', expSalary)
                        .andWhere('ee_exp', '<=', workExp)
                        .orderBy('updated_at', 'desc')
                        .then((candidateList) => {
                            console.log('with salary < 7501 /201 & workExp < 6 && with all others', candidateList)
                            return candidateList
                        }).catch(err => console.log(err))
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
            .where('job.status', true)
            .orderBy('job.updated_at', 'desc')
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