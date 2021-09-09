exports.up = function(knex) {
    return knex.schema.createTable("industry", (industry) => {
        admin.increments("industry_id").primary();
        admin.string('industry').notNullable();
        admin.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("industry")
};