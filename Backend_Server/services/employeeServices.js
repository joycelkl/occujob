class EmployeeService {
    constructor(knex) {
        this.knex = knex;
    }

    listUserInfo(userId) {
        console.log('list ee info')
        return this.knex('employee')
            .where("ee_id", userId)
            .then((data) => {
                console.log('listuserdata', data)
                return data
            })
    }


    updateProfile(
        userId,
        userName,
        userIntro,
        userPhone,
        userExpectedSalary,
        userIndustry,
        userAvailability,
        userLocation,
        userImage,
        userExp,
        userSkill,
        userSalaryType
    ) {

        let ind = [];
        if (userIndustry == null) {
            ind = null
        } else {
            if (Array.isArray(userIndustry)) {
                ind = userIndustry;
            } else {
                ind.push(userIndustry);
            }
        }

        let sky = [];
        if (userSkill == null) {
            sky = null
        } else {
            if (Array.isArray(userSkill)) {
                sky = userSkill;
            } else {
                sky.push(userSkill);
            }
        }

        let ava = [];
        if (userAvailability == null) {
            ava = null
        } else {
            if (Array.isArray(userAvailability)) {
                ava = userAvailability;
            } else {
                ava.push(userAvailability);
            }
        }

        return this.knex("employee")
            .where({
                ee_id: userId
            })
            .update({
                ee_name: userName,
                self_intro: userIntro,
                ee_phone: userPhone,
                expected_salary: userExpectedSalary,
                ee_industry: ind,
                availability: ava,
                ee_location: userLocation,
                ee_img_data: userImage,
                ee_exp: userExp,
                ee_skill: sky,
                ee_salary_type: userSalaryType,
            })
            .returning('*')
            .then((updatedUser) => {
                return updatedUser
            })

    }

    //rewrote already
    searchJob(value) {

        console.log('value', value)

        const { jobTitle, company, jobType, salaryType, salary, jobFunction, location } = value

        let jobTitleArr = []
        if (jobTitle.length == 0) {
            jobTitleArr = ['', '', '']
        } else {
            jobTitleArr = jobTitle.map((tag) => {
                return tag.toUpperCase();
            })
        }
        let jobtnum = jobTitleArr.length;
        if (jobtnum != 3) {
            for (var i = 0; i < (3 - jobtnum); i++) {
                jobTitleArr.push(jobTitleArr[0])
            }
        }
        console.log('jobTitleArr', jobTitleArr)

        let companyArr = []
        if (company == null) {
            companyArr = ['', '', '']
        } else {
            if (!Array.isArray(company)) {
                companyArr.push(company)
            } else {
                companyArr = company
            }
        }
        let compnum = companyArr.length;
        if (compnum != 3) {
            for (var i = 0; i < (3 - compnum); i++) {
                companyArr.push(companyArr[0])
            }
        }
        console.log('companyArr', companyArr)

        let jobFunctionArr = []
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

        let locationArr = []
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

        if (jobTitle.length === 0 && company === null && jobType === '' && salaryType === '' && salary === '' && jobFunction === null && location === null) {
            return this.knex('job')
                .join('employer', 'job.employer_id', '=', 'employer.er_id')
                .where('job.status', true)
                .select('job.*', 'employer.er_name', 'employer.er_img_data')
                .orderBy('job.updated_at', 'desc')
                .then((jobList) => {
                    console.log('all null', jobList)
                    return jobList
                }).catch(err => console.log(err))
        }

        if (salaryType == '') {
            return this.knex('job')
                .join('employer', 'job.employer_id', '=', 'employer.er_id')
                .select('job.*', 'employer.er_name', 'employer.er_img_data')
                .andWhere('job.status', true)
                .orWhere('job.job_title', 'like', `%${jobTitleArr[0]}%`)
                .orWhere('job.job_title', 'like', `%${jobTitleArr[1]}%`)
                .orWhere('job.job_title', 'like', `%${jobTitleArr[2]}%`)
                .andWhere('employer.er_name', companyArr[0])
                .andWhere('employer.er_name', companyArr[1])
                .andWhere('employer.er_name', companyArr[2])
                .orWhere('job.job_function', jobFunctionArr[0])
                .orWhere('job.job_function', jobFunctionArr[1])
                .orWhere('job.job_function', jobFunctionArr[2])
                .orWhere('job.job_location', locationArr[0])
                .orWhere('job.job_location', locationArr[1])
                .orWhere('job.job_location', locationArr[2])
                .andWhere('job.job_type', jobType)
                .orderBy('job.updated_at', 'desc')
                .then((jobList) => {
                    console.log('no salaryType', jobList)
                    return jobList
                }).catch(err => console.log(err))
        } else {
            return this.knex('job')
                .join('employer', 'job.employer_id', '=', 'employer.er_id')
                .select('job.*', 'employer.er_name', 'employer.er_img_data')
                .andWhere('job.status', true)
                .orWhere('job.job_title', 'like', `%${jobTitleArr[0]}%`)
                .orWhere('job.job_title', 'like', `%${jobTitleArr[1]}%`)
                .orWhere('job.job_title', 'like', `%${jobTitleArr[2]}%`)
                .orWhere('employer.er_name', companyArr[0])
                .orWhere('employer.er_name', companyArr[1])
                .orWhere('employer.er_name', companyArr[2])
                .orWhere('job.job_function', jobFunctionArr[0])
                .orWhere('job.job_function', jobFunctionArr[1])
                .orWhere('job.job_function', jobFunctionArr[2])
                .orWhere('job.job_location', locationArr[0])
                .orWhere('job.job_location', locationArr[1])
                .orWhere('job.job_location', locationArr[2])
                .andWhere('job.job_type', jobType)
                .andWhere('job.job_salary_type', salaryType)
                .andWhere('job.expect_salary', '>=', salary)
                .orderBy('job.updated_at', 'desc')
                .then((jobList) => {
                    console.log('with SalaryType', jobList)
                    return jobList
                }).catch(err => console.log(err))
        }

    }


    listJob(userId) {
        // another datbase call to check for the company name
        console.log("user", userId)
        return this.knex('employee')
            .join('application', 'employee.ee_id', '=', 'application.employee_id')
            .join('job', 'application.job_id', '=', 'job.job_id')
            .join('employer', 'job.employer_id', '=', 'employer.er_id')
            .where('employee.ee_id', userId)
            .orderBy('application.created_at', 'desc')
            .then((job) => {
                return job;
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err);
            });
    }

    apply(jobId, userId) {
        // checking whether the candidate had applied same jobId
        let rday = new Date(new Date().setDate(new Date().getDate() + 7));
        let formatted_date = rday.getFullYear() + "-" + (rday.getMonth() + 1) + "-" + rday.getDate();

        return this.knex('application')
            .where({
                job_id: jobId,
                employee_id: userId
            })
            .then((application) => {
                console.log('applying job id:', jobId)
                if (application.length === 0) {
                    return this.knex("application")
                        .insert({
                            job_id: jobId,
                            employee_id: userId,
                            enable_rating: formatted_date,
                            rating: false
                        })
                        .returning('*')
                        .then((apply) => {
                            return apply;
                        })
                        .catch((err) => {
                            console.error(err)
                            throw new Error(err);
                        });
                } else {
                    return "Cannot apply the same job twice"
                }
            })

    }

    jobDetailOffer(applicationId, userId) {
        return this.knex('application')
            .join('job', "application.job_id", "=", "job.job_id")
            .join("employer", "job.employer_id", "=", "employer.er_id")
            .where('application.application_id', applicationId)
            .where('application.employee_id', userId)
            .then((jobDetail) => {
                console.log("jobDetail in service", jobDetail)
                    // let checkreply = false;
                    // if (jobDetail[0].reply !== null) {
                    //     checkreply = true;
                    // }
                    // jobDetail[0].checkreply = checkreply;
                return jobDetail;
            })
            .catch((err) => {
                console.log(err)
                throw new Error(err);
            })
    }

    acceptOffer(id) {
        console.log('accept offer', id)
        return this.knex("application")
            .where({
                application_id: id,
            })
            .update({
                reply: true,
            })
            .returning('*')
            .then((accept) => {
                return accept;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    declineOffer(id) {
        return this.knex("application")
            .where({
                application_id: id,
            })
            .update({
                reply: false,
            })
            .returning('*')
            .then((decline) => {
                return decline;
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err);
            });
    }

    homeJobList() {

        return this.knex('job')
            .join('employer', 'employer.er_id', '=', 'job.employer_id')
            .where('job.status', true)
            .orderBy('job.updated_at', 'desc')
            .select('job.job_title', 'employer.er_name', 'job.job_location', 'job.created_at', 'employer.er_img_data', 'job.job_id', 'job.job_type')
            .then((jobDetail) => {
                console.log('public', jobDetail)
                return jobDetail
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            });
    }

    addPortfolio(ee_id, pName, pDes, purl) {
        console.log('adding portfolio', ee_id, pName, pDes, purl)
        return this.knex('portfolio')
            .insert({
                employee_id: ee_id,
                portfolio_url: purl,
                portfolio_name: pName,
                portfolio_description: pDes
            })
            .returning('*')
            .then((portfolio) => {
                console.log('saved portfolio', portfolio)
                return portfolio
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            })
    }

    getPortfolio(ee_id) {
        console.log('ee_id', ee_id)
        return this.knex('portfolio')
            .where('employee_id', ee_id)
            .returning('*')
            .then((portfolio) => {
                console.log('getting port in service', portfolio)
                return portfolio
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            })
    }

    udpatePortfolio(p_id, pName, pDes, purl) {
        return this.knex('portfolio')
            .where('portfolio_id', p_id)
            .update({
                portfolio_url: purl,
                portfolio_name: pName,
                protfolio_description: pDes
            })
            .returning('*')
            .then((updatedP) => {
                return updatedP
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            })
    }

    delPortfolio(p_id) {
        return this.knex('portfolio')
            .where('portfolio_id', p_id)
            .del()
            .returning('*')
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            })
    }

    loadErProfile(erId) {
        console.log('erId', erId)
        return this.knex('employer')
            .where({
                er_id: erId
            })
            .then((profile) => {
                console.log("employer", profile)
                return profile;
            })
            .catch((err) => {
                throw new Error(err)
            });
    }
}

module.exports = EmployeeService;