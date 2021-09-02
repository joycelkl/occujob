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
                if (data[0].img_data) {
                    let base = Buffer.from(data[0].img_data);
                    let conversion = base.toString('base64');
                    data[0].image = conversion;
                }
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
        userLocation
    ) {

        // need to review the tags function here
        // if (Array.isArray(userIndustry)) {
        //     ind = userIndustry;
        // } else if (userIndustry !== 'default' && userIndustry !== undefined) {
        //     ind.push(userIndustry);
        // }

        let ind = [];

        if (Array.isArray(userIndustry)) {
            ind = userIndustry;
        } else {
            ind.push(userIndustry);
        }

        if (ind.length == 0) {
            return this.knex("employee")
                .where({
                    ee_id: userId
                })
                .update({
                    ee_name: userName,
                    self_intro: userIntro,
                    ee_phone: userPhone,
                    expected_salary: userExpectedSalary,
                    availability: userAvailability,
                    ee_location: userLocation
                })
                .returning('*')
                .then((updatedUser) => {
                    return updatedUser
                })
        } else {
            console.log('ind', ind)
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
                    ee_location: userLocation
                })
                .returning('*')
                .then((updatedUser) => {
                    return updatedUser
                })
        }
    }


    //to be rewrite to save to cloud
    updateImg(file, userId) {
        return this.knex("employee")
            .where({
                id: userId
            })
            .update({
                img_data: file
            })
            .then(() => {
                return 'Update saved';
            })
            .catch((err) => {
                throw new Error(err)
            })
    }

    //to be rewrite the logic
    searchJob(value) {
        let searchList = {}
        for (let elements in value) {
            if (value[elements] === "Choose") {
                value[elements] = ''
            }
            if (value[elements] !== '') {
                searchList[elements] = value[elements]
            }
        }
        console.log(searchList)
        return this.knex("employer")
            .select("*")
            .join("job", "employer.id", "=", "job.employer_id")
            .where(searchList)
            .then((job) => {
                console.log('search resuly job', job)
                return job
            })
            .catch((err) => {
                throw new Error(err)
            })
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
}

module.exports = EmployeeService;