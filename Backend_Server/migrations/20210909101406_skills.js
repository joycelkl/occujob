exports.up = function(knex) {
    return knex.schema.createTable("skills", (skills) => {
        skills.increments("skills_id").primary();
        skills.string('skills').notNullable();
        skills.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("skills")
};