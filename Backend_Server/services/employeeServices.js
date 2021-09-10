class EmployeeService {
    constructor(knex) {
        this.knex = knex;
    }

    listUserInfo(userId) {
        console.log('list ee info')
        return this.knex
            .select("*")
            .from("employee")
            .where("ee_id", userId)
            .then((data) => {
                console.log('listuserdata', data)
                    // if (data[0].img_data) {
                    //     let base = Buffer.from(data[0].img_data);
                    //     let conversion = base.toString('base64');
                    //     data[0].image = conversion;
                    // }
                return data;
            });
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

        // need to review the tags function here
        // if (Array.isArray(userIndustry)) {
        //     ind = userIndustry;
        // } else if (userIndustry !== 'default' && userIndustry !== undefined) {
        //     ind.push(userIndustry);
        // }

        let ind = [];
        if (userIndustry = null) {
            ind = [' ']
        } else {

            if (Array.isArray(userIndustry)) {
                ind = userIndustry;
            } else {
                ind.push(userIndustry);
            }
        }

        let sky = [];
        if (userSkill = null) {
            sky = [' ']
        } else {
            if (Array.isArray(userSkill)) {
                sky = userSkill;
            } else {
                sky.push(userSkill);
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
                availability: userAvailability,
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

        // if (ind.length == 0) {
        //     return this.knex("employee")
        //         .where({
        //             ee_id: userId
        //         })
        //         .update({
        //             ee_name: userName,
        //             self_intro: userIntro,
        //             ee_phone: userPhone,
        //             expected_salary: userExpectedSalary,
        //             availability: userAvailability,
        //             ee_location: userLocation,
        //             ee_img_data: userImage,
        //             ee_industry: ind,
        //             ee_exp: userExp,
        //             ee_skill: sky
        //         })
        //         .returning('*')
        //         .then((updatedUser) => {
        //             return updatedUser
        //         })
        // } else {
        //     console.log('ind', ind)
        //     return this.knex("employee")
        //         .where({
        //             ee_id: userId
        //         })
        //         .update({
        //             ee_name: userName,
        //             self_intro: userIntro,
        //             ee_phone: userPhone,
        //             expected_salary: userExpectedSalary,
        //             ee_industry: ind,
        //             availability: userAvailability,
        //             ee_location: userLocation,
        //             ee_img_data: userImage,
        //             ee_exp: userExp,
        //             ee_skill: sky,
        //             ee_salary_type: userSalaryType,
        //         })
        //         .returning('*')
        //         .then((updatedUser) => {
        //             return updatedUser
        //         })
        // }
    }


    // //to be rewrite to save to cloud
    // updateImg(file, userId) {
    //     return this.knex("employee")
    //         .where({
    //             id: userId
    //         })
    //         .update({
    //             img_data: file
    //         })
    //         .then(() => {
    //             return 'Update saved';
    //         })
    //         .catch((err) => {
    //             throw new Error(err)
    //         })
    // }

    //to be rewrite the logic
    searchJob(value) {

        console.log('value', value)

        const { jobTitle, company, jobType, salaryType, salary, jobFunction, location } = value

        let jobTitleArr = []
        if (jobTitle == null) {
            jobTitleArr = ['', '', '']
        } else {
            if (!Array.isArray(jobTitle)) {
                jobTitleArr.push(jobTitle)
            } else {
                jobTitleArr = jobTitle
            }
        }
        let jobtnum = jobTitleArr.length;
        if (jobtnum != 3) {
            for (var i = 0; i < (3 - jobtnum); i++) {
                jobTitleArr.push('')
            }
        }

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
                companyArr.push('')
            }
        }

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
                jobFunctionArr.push('')
            }
        }

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
                locationArr.push('')
            }
        }

        if (salaryType == null) {
            return this.knex('job')
                .join('employer', 'job.employer_id', '=', 'employer.er_id')
                .select('job.*', 'employer.er_name')
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
                .andWhere('job.expiry_date', '>', new Date())
                .orderBy('updated_at', 'desc')
                .then((jobList) => {
                    return jobList
                }).catch(err => console.log(err))
        } else {
            return this.knex('job')
                .join('employer', 'job.employer_id', '=', 'employer.er_id')
                .select('job.*', 'employer.er_name')
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
                .andWhere('job.expiry_date', '>', new Date())
                .orderBy('updated_at', 'desc')
                .then((jobList) => {
                    return jobList
                }).catch(err => console.log(err))
        }


        // let searchList = {}
        // for (let elements in value) {
        //     if (value[elements] === "Choose") {
        //         value[elements] = ''
        //     }
        //     if (value[elements] !== '') {
        //         searchList[elements] = value[elements]
        //     }
        // }
        // console.log(searchList)
        // return this.knex("employer")
        //     .select("*")
        //     .join("job", "employer.id", "=", "job.employer_id")
        //     .where(searchList)
        //     .then((job) => {
        //         console.log('search resuly job', job)
        //         return job
        //     })
        //     .catch((err) => {
        //         throw new Error(err)
        //     })
    }


    listJob(userId) {
        // another datbase call to check for the company name
        console.log("user", userId)
        return this.knex('employee')
            .join('application', 'employee.ee_id', '=', 'application.employee_id')
            .join('job', 'application.job_id', '=', 'job.job_id')
            .join('employer', 'job.employer_id', '=', 'employer.er_id')
            .where('employee.ee_id', userId)
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
            .where('job.expiry_date', '>', new Date())
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
}

module.exports = EmployeeService;