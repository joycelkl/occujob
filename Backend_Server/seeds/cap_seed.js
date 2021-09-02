
exports.seed = function(knex) {
  // Deletes ALL existing entries

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
              { er_name: 'ER_user1', er_email: 'eruser1@mail.com', er_password: '1234', er_type: "er", er_phone:'12345678'},
              { er_name: 'ER_user2', er_email: 'eruser2@mail.com', er_password: '1234', er_type: "er" },
              { er_name: 'ER_user3', er_email: 'eruser3@mail.com', er_password: '1234', er_type: "er" }
          ]).then(() => {
              return knex('employee').insert([
                  { ee_name: 'ee1', ee_email: 'ee1@ee.com', ee_password: '1234', ee_type: 'ee', ee_industry: '{IT, Marketing, Media, Sourcing}', expected_salary: 17000 },
                  { ee_name: 'ee2', ee_email: 'ee2@ee.com', ee_password: '1234', ee_type: 'ee', ee_industry: '{Media, Sourcing}', expected_salary: 10000 },
                  { ee_name: 'ee3', ee_email: 'ee3@ee.com', ee_password: '1234', ee_type: 'ee', ee_industry: '{HR & Admin}', expected_salary: 15000 }
              ])
          }).then(() => {
              return knex('job').insert([
                  { employer_id:1, job_title: 'Designer', job_function: 'Media & Advertising', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', status: true, job_location:'tst' },
                   { employer_id:2, job_title: 'Freelance HR & Administrative Officer', job_function: 'HR & Admin', req_exp: 1, expect_salary: 15000, job_description: 'handling mainly HR and Admin duties of our HK, SH and TW offices', work_period: 'work no more than 17 hours a week (on weekdays and office hours) ', status: true, job_location:'tst'},
                   { employer_id:3, job_title: 'Freelance Photographer', job_function: 'Photography / Video', req_exp: 2, expect_salary: 15000, job_description: 'ensure the regular production output', work_period: 'one week', status: true, job_location:'tst'},
              ])
          })
          .then(() => {
              return knex('application').insert([
                  { job_id: 1, employee_id: 1, offer: true },
                  { job_id: 2, employee_id: 2, offer: true },
                  { job_id: 3, employee_id: 3 },
                  { job_id: 2, employee_id: 1, offer: true,reply: true },
              ])
          });
      });
};

