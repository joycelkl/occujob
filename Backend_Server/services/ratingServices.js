const schedule = require('node-schedule');

class RatingServices {
    constructor(knex) {
        this.knex = knex;
    }

    listAplicantsOwnRating(userId) {
        console.log('list user Rating')
        return this.knex('rating')
            .where("rating_employee_id", userId)
            .then((data) => {
                console.log('listUserRating', data)
                return data
            })
    }

    listCompanyOwnRating(userId) {
        console.log('list user Rating')
        return this.knex('rating')
            .where("rating_employer_id", userId)
            .then((data) => {
                console.log('listUserRating', data)
                return data
            })
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