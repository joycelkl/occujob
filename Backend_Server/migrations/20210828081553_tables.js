exports.up = function(knex) {
    return knex.schema.createTable("admin", (admin) => {
            admin.increments("admin_id").primary();
            admin.string('admin_name').notNullable();
            admin.string("admin_password").notNullable();
            admin.string("type").notNullable();
            admin.timestamps(false, true);
        }).then(() => {
            return knex.schema.createTable("employer", (er) => {
                er.increments("er_id").primary();
                er.string("er_name").notNullable();
                er.string("er_email").notNullable();
                er.string("er_password").notNullable();
                er.string("er_type").notNullable();
                er.text("er_img_data"); //will change to text later for url
                er.string("er_phone");
                er.text("er_industry");
                er.text("er_location");
                er.text("comp_description");
                er.timestamps(false, true);
            });
        })
        .then(() => {
            return knex.schema.createTable("employee", (table) => {
                table.increments("ee_id").primary();
                table.string("ee_name").notNullable();
                table.string("ee_email").unique();
                table.string("ee_password").notNullable();
                table.string("ee_type").notNullable();
                table.text("ee_img_data"); //will change to text later for url
                table.specificType("ee_industry", 'text ARRAY');
                table.text("self_intro");
                table.integer("ee_phone");
                table.decimal("expected_salary", 14, 2);
                table.text("availability");
                table.text('ee_location'); //to be confirmed
                table.text('ee_exp'); //check query for search
                table.specificType('ee_skill', 'text ARRAY'); //e.g. javascript
                table.timestamps(false, true);
            });
        })
        .then(() => {
            return knex.schema.createTable("portfolio", (product) => {
                product.increments('portfolio_id').primary();
                product.integer('employee_id').unsigned().notNullable();
                product.foreign('employee_id').references('employee.ee_id');
                product.binary('data').notNullable(); //need to change to url
                product.date('completed_date'); //no need??
                product.text('portfolio_description');
                product.timestamps(false, true);
            });
        })
        .then(() => {
            return knex.schema.createTable("job", (job) => {
                job.increments("job_id").primary();
                job.integer("employer_id").unsigned().notNullable();
                job.foreign("employer_id").references("employer.er_id");
                job.string("job_title").notNullable();
                job.string("job_function").notNullable();
                job.string('job_type').notNullable(); //PT or Freelance
                job.string("req_exp").notNullable();
                job.decimal("expect_salary", 14, 2).notNullable();
                job.text("job_description").notNullable();
                job.string("work_period").notNullable(); //I think here is memtioning how much time required / allowed for this job
                job.date('expiry_date'); //for filter out the post over 2 weeks
                job.boolean("status").notNullable();
                job.text('job_location').notNullable();
                job.timestamps(false, true);
            });
        })
        .then(() => {
            return knex.schema.createTable("application", (table) => {
                table.increments("application_id").primary();
                table.integer("job_id").unsigned();
                table.foreign("job_id").references("job.job_id");
                table.integer("employee_id").unsigned();
                table.foreign("employee_id").references("employee.ee_id");
                table.boolean("offer");
                table.boolean("reply");
                table.timestamps(false, true);
            });
        });
};

exports.down = function(knex) {
    return knex.schema.dropTable("application").then(() => {
        return knex.schema.dropTable("job").then(() => {
            return knex.schema.dropTable("portfolio").then(() => {
                return knex.schema.dropTable("employee").then(() => {
                    return knex.schema.dropTable("employer").then(() => {
                        return knex.schema.dropTable("admin")
                    })
                })
            });
        });
    });
};