exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('message').del().then(() => {
            return knex('chatroom').del()
        })
        .then(function() {
            // Inserts seed entries
            return knex('chatroom').insert([
                { chat_employee_id: 2, chat_employer_id: 2 },
                { chat_employee_id: 3, chat_employer_id: 3 },
                { chat_employee_id: 4, chat_employer_id: 4 },
            ]).then(() => {
                return knex('message').insert([
                    { chatroom_id: 2, sender_type: 'er', sender_employer_id: 2, content: 'this is room 2, employer 2' },
                    { chatroom_id: 2, sender_type: 'ee', sender_employee_id: 2, content: 'this is room 2, employee 2' },
                    { chatroom_id: 3, sender_type: 'er', sender_employer_id: 3, content: 'this is room 3, employer 3' },
                    { chatroom_id: 3, sender_type: 'ee', sender_employee_id: 3, content: 'this is room 3, employee 3' },
                    { chatroom_id: 4, sender_type: 'er', sender_employer_id: 4, content: 'this is room 4, employer 4' },
                    { chatroom_id: 4, sender_type: 'ee', sender_employer_id: 4, content: 'this is room 4, employee 4' }
                ])
            })
        });
};