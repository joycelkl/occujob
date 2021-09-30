exports.up = function(knex) {
    return knex.schema.createTable("chatroom", (chatroom) => {
        chatroom.increments("chatroom_id").primary();
        chatroom.integer("chat_employee_id").unsigned();
        chatroom.foreign("chat_employee_id").references("employee.ee_id");
        chatroom.integer("chat_employer_id").unsigned();
        chatroom.foreign("chat_employer_id").references("employer.er_id");
        chatroom.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("chatroom")
};