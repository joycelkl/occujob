exports.up = function(knex) {
    return knex.schema.createTable("rating", (rating) => {
        rating.increments("rating_id").primary();
        rating.integer("rating_employee_id").unsigned();
        rating.foreign("rating_employee_id").references("employee.ee_id");
        rating.integer("rating_employer_id").unsigned();
        rating.foreign("rating_employer_id").references("employer.er_id");
        rating.integer("rating_application_id").unsigned();
        rating.foreign("rating_application_id").references("application.application_id");
        rating.integer('rate').notNullable();
        rating.text('comment');
        rating.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("rating")
};