exports.up = function(knex) {
    return knex.schema.createTable("location", (location) => {
        location.increments("location_id").primary();
        location.string('location').notNullable();
        location.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("location")
};