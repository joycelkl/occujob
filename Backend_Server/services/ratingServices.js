const schedule = require('node-schedule');

class RatingServices {
    constructor(knex) {
        this.knex = knex;
    }

    listApplicantsOwnRating(userId) {
        console.log('list ee Rating',userId)
        return this.knex('rating')
            .where("rating_employee_id", userId)
            .then((data) => {
                console.log('listUserRating', data)
                return data
            })
    }

    listCompanyOwnRating(userId) {
        console.log('list er Rating')
        return this.knex('rating')
            .where("rating_employer_id", userId)
            .then((data) => {
                console.log('listUserRating', data)
                return data
            })
    }
//list Applicant rating in Serach Applicant Profile

    listApplicantsRating(ee_id) {
        console.log('list ee Rating',ee_id)
        return this.knex('rating')
            .where("rating_employee_id", ee_id)
            .then((data) => {
                console.log('listUserRating', data)
                return data
            })
    }
//list company rating in Applicant Employer Detail
    listCompanyRating(er_id) {
        console.log('list er Rating')
        return this.knex('rating')
            .where("rating_employer_id", er_id)
            .then((data) => {
                console.log('listCompanyRating', data)
                return data
            })
    }


//applicantsGiveRating to company will auto del previous rating as a update method n prevent double rate
    applicantsGiveRating(er_id, application_id,rate,comment) {

        return this.knex('rating')
        .where({rating_employer_id: er_id,
            rating_application_id:application_id,})
            .del()
            .then(() => this.knex('rating').insert({
                rating_employer_id: er_id,
                rating_application_id:application_id,
                rate:rate,
                comment:comment,
            }).returning('*'))
            .then((ratedCompany) => {
                console.log(ratedCompany)
                return ratedCompany
            })
            .catch((err) => {
                throw new Error(err)
            });
    }

// company GiveRating to applicants will auto del previous rating as a update method n prevent double rate employerService
companyGiveRating(ee_id, application_id,rate,comment) {

    return this.knex('rating')
        .where({rating_employee_id: ee_id,
            rating_application_id:application_id,})
            .del()
            .then(() => this.knex('rating').insert({
                rating_employee_id: ee_id,
                rating_application_id:application_id,
                rate:rate,
                comment:comment,
            }).returning('*'))
        .then((ratedApplicant) => {
            console.log(ratedApplicant)
            return ratedApplicant
        })
        .catch((err) => {
            throw new Error(err)
        });
}

jobUpdating(rating_id,comment) {
    console.log('Rating updating', rating_id)

    return this.knex('rating')
        .where({
            rating_id: rating_id
        })
        .update({
            rating :rating,
            comment:comment,
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




    //please do not amend this
    updateRatingStatus() {
        console.log('schedule running')
        return this.knex('application')
            .where('enable_rating', '<', new Date())
            .update('rating', true)
            .then(console.log('status changed'))

    }



}



module.exports = RatingServices