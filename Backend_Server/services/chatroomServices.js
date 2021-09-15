class ChatroomServices {
    constructor(knex) {
        this.knex = knex;
    }

    //please do not amend this
    // updateRatingStatus() {
    //     console.log('schedule running')
    //     return this.knex('application')
    //         .where('enable_rating', '<', new Date())
    //         .update('rating', true)
    //         .then(console.log('status changed'))

    // }

}


module.exports = ChatroomServices