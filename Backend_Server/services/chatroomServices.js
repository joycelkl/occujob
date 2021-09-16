class ChatroomServices {
    constructor(knex) {
        this.knex = knex;
    }

    testing() {
        console.log('testing running')
        return this.knex('employer')
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            });

    }

}


module.exports = ChatroomServices