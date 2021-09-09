exports.up = function(knex) {
    return knex.schema.createTable("location", (location) => {
        admin.increments("location_id").primary();
        admin.string('location').notNullable();
        admin.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("location")
};