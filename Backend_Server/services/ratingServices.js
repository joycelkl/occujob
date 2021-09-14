const schedule = require('node-schedule');

class RatingServices {
    constructor(knex) {
        this.knex = knex;
    }

    updateRatingStatus() {
        console.log('schedule running')
        return this.knex('application')
            .where('enable_rating', '<', new Date())
            .update('rating', true)
            .then(console.log('status changed'))

    }

}



module.exports = RatingServices