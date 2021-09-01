
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const erPW1 = await hashedpassword('1234');
  const erPW2 = await hashedpassword('2345');
  const erPW3 = await hashedpassword('3456');

  const eePW1 = await hashedpassword('1234');
  const eePW2 = await hashedpassword('2345');
  const eePW3 = await hashedpassword('3456');


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
              { name: 'ER_user1', email: 'eruser1@mail.com', password: erPW1, type: "er" },
              { name: 'ER_user2', email: 'eruser2@mail.com', password: erPW1, type: "er" },
              { name: 'ER_user3', email: 'eruser3@mail.com', password: erPW1, type: "er" }
          ]).then(() => {
              return knex('employee').insert([
                  { name: 'ee1', email: 'ee1@ee.com', password: eePW1, type: 'ee', ee_industry: '{IT, Marketing, Media, Sourcing}', expected_salary: 17000 },
                  { name: 'ee2', email: 'ee2@ee.com', password: eePW2, type: 'ee', ee_industry: '{Media, Sourcing}', expected_salary: 10000 },
                  { name: 'ee3', email: 'ee3@ee.com', password: eePW3, type: 'ee', ee_industry: '{HR & Admin}', expected_salary: 15000 }
              ])
          }).then(() => {
              return knex('job').insert([
                  { employer_id: 1, job_title: 'Designer', job_function: 'Media & Advertising', req_Exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', status: true },
                  { employer_id: 2, job_title: 'Freelance HR & Administrative Officer', job_function: 'HR & Admin', req_Exp: 1, expect_salary: 15000, job_description: 'handling mainly HR and Admin duties of our HK, SH and TW offices', work_period: 'work no more than 17 hours a week (on weekdays and office hours) ', status: true },
                  { employer_id: 3, job_title: 'Freelance Photographer', job_function: 'Photography / Video', req_Exp: 2, expect_salary: 15000, job_description: 'ensure the regular production output', work_period: 'one week', status: true },
              ])
          }).then(() => {
              return knex('application').insert([
                  { job_id: 1, employee_id: 1, offer: true },
                  { job_id: 2, employee_id: 2, offer: true },
                  { job_id: 3, employee_id: 3 },
                  { job_id: 2, employee_id: 1, offer: true,reply: true },
              ])
          });
      });
};

