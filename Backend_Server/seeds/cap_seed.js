const bcrypt = require('bcrypt');
let hashedpassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
};



exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const erPW1 = await hashedpassword('1234');

  return knex('application').del().then(() => {
          return knex('job').del().then(() => {
              return knex('employee').del().then(() => {
                  return knex('employer').del()
              })
          })
      })
      .then(function() {
          // Inserts seed entries
          return knex('employer').insert([
              { er_name: 'ER_user1', er_email: 'eruser1@mail.com', er_password: erPW1, er_type: "er", er_phone:'12345678'},
              { er_name: 'ER_user2', er_email: 'eruser2@mail.com', er_password: '$2b$10$3mLApKxROB7Jk.7VLvNMlOJXLmlkt58fxPaXpuKO9LrhpI0aOvTlS', er_type: "er" },
              { er_name: 'ER_user3', er_email: 'eruser3@mail.com', er_password: erPW1, er_type: "er" }
          ]).then(() => {
              return knex('employee').insert([
                  { ee_name: 'ee1', ee_email: 'ee1@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{IT, Marketing, Media, Sourcing}', expected_salary: 17000 },
                  { ee_name: 'ee2', ee_email: 'ee2@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{Media, Sourcing}', expected_salary: 10000 },
                  { ee_name: 'ee3', ee_email: 'ee3@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{HR & Admin}', expected_salary: 15000 }
              ])
          }).then(() => {
              return knex('job').insert([
                  { employer_id:1, job_title: 'Designer', job_function: 'Media & Advertising', job_type:'PT',req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', status: true, job_location:'tst', job_type: 'Part Time',job_salary_type:'perJob' },
                  { employer_id:2, job_title: 'Freelance HR & Administrative Officer', job_function: 'Media & Advertising', job_type:'PT',req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', status: true, job_location:'tst', job_type: 'Part Time',job_salary_type:'perJob' },
                  { employer_id:3, job_title: 'Freelance Photographer', job_function: 'Photography / Video', job_type:'PT',req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', status: true, job_location:'tst', job_type: 'Part Time',job_salary_type:'perJob' },

              ])
          })
          .then(() => {
              return knex('application').insert([
                  { job_id: 1, employee_id: 1, offer: true },
                  { job_id: 2, employee_id: 1, offer: true },
                  { job_id: 3, employee_id: 3 },
                  { job_id: 2, employee_id: 2, offer: true,reply: true },
                  { job_id: 3, employee_id: 1  },
              ])
          })
          .then(() => {
            return knex('location').insert([
                {location: 'Islands'},
                {location: 'Kwai Tsing'},
                {location: 'North'},
                {location: 'Sai Kung'},
                {location: 'Sha Tin'},
                {location: 'Tai Po'},
                {location: 'Tsuen Wan'},
                {location: 'Tuen Mun'},
                {location: 'Yuen Long'},
                {location: 'Kowloon City'},
                {location: 'Kwun Tong'},
                {location: 'Sham Shui Po'},
                {location: 'Wong Tai Sin'},
                {location: 'Yau Tsim Mong'},
                {location: 'Central and Western'},
                {location: 'Eastern'},
                {location: 'Southern'},
                {location: 'Wan Chai'},
            ])
        })
        .then(() => {
            return knex('industry').insert([
                {industry: 'Educational Services'},
                {industry: 'Real Estate'},
                {industry: 'Administration'},
                {industry: 'Management Services'},
                {industry: 'Scientific Services'},
                {industry: 'Construction'},
                {industry: 'Healthcare'},
                {industry: 'Arts'},
                {industry: 'Entertainment'},
                {industry: 'Wholesale Trade'},
                {industry: 'Transportation'},
                {industry: 'Finance'},
                {industry: 'Insurance'},
                {industry: 'Agriculture'},
                {industry: 'Food Services'},
                {industry: 'Hospitality'},
                {industry: 'Retail'},
                {industry: 'Manufacturing'},
                {industry: 'Technology'},
                {industry: 'IT'},
                {industry: 'Engineering'},
                {industry: 'Business'},
                {industry: 'Advisory'},
                {industry: 'Photography'},
                {industry: 'Media'},
                {industry: 'Recreation'},
                {industry: 'Publishing'},
                {industry: 'Consumer Goods'},
               
            ])
        })
      });
};


