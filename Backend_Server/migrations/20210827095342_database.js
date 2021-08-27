exports.up = function(knex) {
    return knex.schema
        .createTable("employer", (er) => {
            er.increments("id").primary();
            er.string("name").notNullable();
            er.string("email").notNullable();
            er.string("password").notNullable();
            er.string("type").notNullable();
            er.binary("img_data");
            er.string("industry");
            er.text("compDescription");
            er.timestamps(false, true);
        })
        .then(() => {
            return knex.schema.createTable("employee", (table) => {
                table.increments("id").primary();
                table.string("name").notNullable();
                table.string("email").unique();
                table.string("password").notNullable();
                table.string("type").notNullable();
                table.binary("img_data");
                table.specificType("industry", 'text ARRAY');
                table.text("self_intro");
                table.integer("phone");
                table.decimal("expectedSalary", 14, 2);
                table.timestamps(false, true);
            });
        })
        .then(() => {
            return knex.schema.createTable("product", (product) => {
                product.increments('id').primary();
                product.integer('employee_id').unsigned().notNullable();
                product.foreign('employee_id').references('employee.id');
                product.binary('data').notNullable();
                product.date('completed_date');
                product.text('product_description');
                product.timestamps(false, true);
            });
        })
        .then(() => {
            return knex.schema.createTable("job", (job) => {
                job.increments("id").primary();
                job.integer("employer_id").unsigned().notNullable();
                job.foreign("employer_id").references("employer.id");
                job.string("jobTitle").notNullable();
                job.string("jobCat").notNullable();
                job.string("reqExp").notNullable();
                job.decimal("expectSalary", 14, 2).notNullable();
                job.text("jobDescription").notNullable();
                job.string("workPeriod").notNullable(); //I think here is memtioning how much time required / allowed for this job
                job.date('expiry_date'); //for filter out the post over 2 weeks
                job.boolean("status").notNullable();
                job.timestamps(false, true);
            });
        })
        .then(() => {
            return knex.schema.createTable("application", (table) => {
                table.increments("id").primary();
                table.integer("job_id").unsigned();
                table.foreign("job_id").references("job.id");
                table.integer("employee_id").unsigned();
                table.foreign("employee_id").references("employee.id");
                table.boolean("offer");
                table.boolean("reply");
                table.timestamps(false, true);
            });
        });
};

exports.down = function(knex) {
    return knex.schema.dropTable("application").then(() => {
        return knex.schema.dropTable("job").then(() => {
            return knex.schema.dropTable("product").then(() => {
                return knex.schema.dropTable("employee").then(() => {
                    return knex.schema.dropTable("employer")
                })
            });
        });
    });
};