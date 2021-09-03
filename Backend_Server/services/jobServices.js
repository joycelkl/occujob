const schedule = require('node-schedule');

class JobServices {
    constructor(knex) {
        this.knex = knex;
    }


    viewindividualjob(jobId) {
        return this.knex('employer')
            .select('*')
            .join("job", "employer.er_id", "=", "job.employer_id")
            .where("job.job_id", jobId)
            .then((jobDetail) => {
                return jobDetail
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            });

    }

    updateJobStatus() {
        console.log('schedule running')
        return this.knex('job')
            .where('expiry_date', '<', new Date())
            .andWhere('status', '=', true)
            .update('status', false)
            .then(console.log('status changed'))

    }
}



module.exports = JobServices