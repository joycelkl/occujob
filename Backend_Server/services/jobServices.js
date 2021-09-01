const schedule = require('node-schedule');

class JobServices {
    constructor(knex) {
        this.knex = knex;

        //items in job tabel
        this.id
        this.er_id
        this.ee_id
        this.jobtitle
        this.jobcat
        this.reqSkill
        this.reqExp
        this.expectSalary
        this.taskPeriod //I think here is memtioning how much time required / allowed for this job
        this.status
    }


    viewindividualjob(jobId) {
        return this.knex('employer')
            .select('*')
            .join("job", "employer.id", "=", "job.employer_id")
            .where("job.id", jobId)
            .then((jobDetail) => {
                console.log('job svc', jobDetail)

                return jobDetail
            })
            .catch((err) => {
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