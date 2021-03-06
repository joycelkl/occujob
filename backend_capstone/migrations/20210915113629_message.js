exports.up = function(knex) {
    return knex.schema.createTable("message", (message) => {
        message.increments("message_id").primary();
        message.integer("chatroom_id").unsigned();
        message.foreign("chatroom_id").references("chatroom.chatroom_id");
        message.string('sender_type');
        message.integer("sender_employee_id").unsigned();
        message.foreign("sender_employee_id").references("employee.ee_id");
        message.integer("sender_employer_id").unsigned();
        message.foreign("sender_employer_id").references("employer.er_id");
        message.text("content");
        message.integer('msgread').defaultTo(1);
        message.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("message")
};