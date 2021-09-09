exports.up = function(knex) {
    return knex.schema.createTable("industry", (industry) => {
        industry.increments("industry_id").primary();
        industry.string('industry').notNullable();
        industry.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("industry")
};