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
//applicantsGiveRating to company
    applicantsGiveRating(er_id, application_id,rate,comment) {

        return this.knex('rating')
            .insert({
                rating_employer_id: er_id,
                rating_application_id:application_id,
                rate:rate,
                comment:comment,
            })
            .returning('*')
            .then((ratedCompany) => {
                console.log(ratedCompany)
                return ratedCompany
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