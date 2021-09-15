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



exports.seed = async function (knex) {
    // Deletes ALL existing entries
    const erPW1 = await hashedpassword('1234');

    return knex('rating').del().then(() => {
        return knex('skills').del().then(() => {
            return knex('industry').del().then(() => {
                return knex('location').del().then(() => {
                    return knex('application').del().then(() => {
                        return knex('job').del().then(() => {
                            return knex('employee').del().then(() => {
                                return knex('employer').del()
                            })
                        })
                    })
                })
            })
        })
    })


        .then(function () {
            // Inserts seed entries
            return knex('employer').insert([
                { er_name: 'ER_user1', er_email: 'eruser1@mail.com', er_password: erPW1, er_type: "er" },
                { er_name: 'ER_user2', er_email: 'eruser2@mail.com', er_password: erPW1, er_type: "er" },
                { er_name: 'ER_user3', er_email: 'eruser3@mail.com', er_password: erPW1, er_type: "er" },
                { er_name: 'Google', er_email: 'Google@mail.com', er_password: erPW1, er_type: "er" },
                { er_name: 'KMB', er_email: 'KMB@mail.com', er_password: erPW1, er_type: "er" },
                { er_name: 'KFC', er_email: 'KFC@mail.com', er_password: erPW1, er_type: "er" },



            ]).then(() => {
                return knex('employee').insert([
                    { ee_name: 'ee1', ee_email: 'ee1@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{IT, Marketing, Media, Sourcing}', expected_salary: 17000, ee_salary_type: 'Per Job', availability: '{monday,sunday}' },
                    { ee_name: 'ee2', ee_email: 'ee2@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{Media, Sourcing}', expected_salary: 10000, ee_salary_type: 'Per Job', availability: '{tuesday,friday}' },
                    { ee_name: 'ee3', ee_email: 'ee3@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{HR & Admin}', expected_salary: 15000, ee_salary_type: 'Per Job', availability: '{tuesday,friday}' },
                    { ee_name: 'ee4', ee_email: 'ee4@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{IT, Marketing, Media, Sourcing}', expected_salary: 17000, ee_salary_type: 'Per Job', availability: '{monday,sunday}' },
                    { ee_name: 'ee5', ee_email: 'ee5@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{Media, Sourcing}', expected_salary: 70, ee_salary_type: 'Per Hour', availability: '{tuesday,friday}' },
                    { ee_name: 'ee6', ee_email: 'ee6@ee.com', ee_password: erPW1, ee_type: 'ee', ee_industry: '{HR & Admin}', expected_salary: 150, ee_salary_type: 'Per Hour', availability: '{tuesday,friday}' }

                ])
            }).then(() => {
                return knex('job').insert([
                    { employer_id: 1, job_title: 'Designer', job_function: 'Media & Advertising', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 2, job_title: 'Freelance HR & Administrative Officer', job_function: 'Media & Advertising', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Freelance', job_salary_type: 'perJob' },
                    { employer_id: 3, job_title: 'Freelance Photographer', job_function: 'Photography / Video', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Islands', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 1, job_title: 'Designer2', job_function: 'Media & Advertising', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 1, job_title: 'Marketing Executive', job_function: 'Media & Advertising', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Freelance', job_salary_type: 'perJob' },
                    { employer_id: 1, job_title: 'Project Manager', job_function: 'Photography / Video', req_exp: 20, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Islands', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 1, job_title: 'Photographer', job_function: 'Media & Advertising', req_exp: 12, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 1, job_title: 'Project Intern', job_function: 'Media & Advertising', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Freelance', job_salary_type: 'perJob' },
                    { employer_id: 1, job_title: 'Shop Keeper', job_function: 'Photography / Video', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Islands', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 2, job_title: 'Hairdresser', job_function: 'Insurance', req_exp: 9, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 2, job_title: 'Doctor', job_function: 'Retail', req_exp: 4, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Freelance', job_salary_type: 'perJob' },
                    { employer_id: 2, job_title: 'Front Desk', job_function: 'Healthcare', req_exp: 13, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Islands', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 2, job_title: 'Watchman', job_function: 'Healthcare', req_exp: 2, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 2, job_title: 'Doorman', job_function: 'Food Services', req_exp: 11, expect_salary: 17000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Freelance', job_salary_type: 'perJob' },
                    { employer_id: 3, job_title: 'Cashier', job_function: 'Transportation', req_exp: 10, expect_salary: 1000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 3, job_title: 'Software Engineer', job_function: 'Advisory', req_exp: 4, expect_salary: 1000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Freelance', job_salary_type: 'perJob' },
                    { employer_id: 3, job_title: 'Driver', job_function: 'Transportation', req_exp: 23, expect_salary: 1000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Islands', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 3, job_title: 'Cleaner', job_function: 'Arts', req_exp: 2, expect_salary: 1000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'perJob' },
                    { employer_id: 3, job_title: 'Janitor', job_function: 'Transportation', req_exp: 15, expect_salary: 1000, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Freelance', job_salary_type: 'perJob' },
                    { employer_id: 4, job_title: 'Researcher', job_function: 'Technology', req_exp: 15, expect_salary: 200, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'Per Hour' },
                    { employer_id: 4, job_title: 'Engineer', job_function: 'IT', req_exp: 4, expect_salary: 200, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Part Time', job_salary_type: 'Per Hour' },
                    { employer_id: 4, job_title: 'Truck Driver', job_function: 'Publishing', req_exp: 32, expect_salary: 200, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Islands', job_type: 'Part Time', job_salary_type: 'Per Hour' },
                    { employer_id: 4, job_title: 'Developer4', job_function: 'Technology', req_exp: 28, expect_salary: 200, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'North', job_type: 'Part Time', job_salary_type: 'Per Hour' },
                    { employer_id: 4, job_title: 'Developer5', job_function: 'Technology', req_exp: 15, expect_salary: 200, job_description: 'Design and create attractive flyers and leaflets for education business promotion', work_period: 'Flexible', expiry_date: '2022-09-13T02:44:47.173Z', status: true, job_location: 'Tai Po', job_type: 'Part Time', job_salary_type: 'Per Hour' },



                ])
            })
                .then(() => {
                    return knex('application').insert([
                        { job_id: 1, employee_id: 1, offer: true },
                        { job_id: 2, employee_id: 1, offer: true },
                        { job_id: 3, employee_id: 1 },
                        { job_id: 4, employee_id: 1, offer: true, reply: true },
                        { job_id: 5, employee_id: 1 },
                    ])
                })
                .then(() => {
                    return knex('location').insert([
                        { location: 'Islands' },
                        { location: 'Kwai Tsing' },
                        { location: 'North' },
                        { location: 'Sai Kung' },
                        { location: 'Sha Tin' },
                        { location: 'Tai Po' },
                        { location: 'Tsuen Wan' },
                        { location: 'Tuen Mun' },
                        { location: 'Yuen Long' },
                        { location: 'Kowloon City' },
                        { location: 'Kwun Tong' },
                        { location: 'Sham Shui Po' },
                        { location: 'Wong Tai Sin' },
                        { location: 'Yau Tsim Mong' },
                        { location: 'Central and Western' },
                        { location: 'Eastern' },
                        { location: 'Southern' },
                        { location: 'Wan Chai' },
                    ])
                })
                .then(() => {
                    return knex('industry').insert([
                        { industry: 'Educational Services' },
                        { industry: 'Real Estate' },
                        { industry: 'Administration' },
                        { industry: 'Management Services' },
                        { industry: 'Scientific Services' },
                        { industry: 'Construction' },
                        { industry: 'Healthcare' },
                        { industry: 'Arts' },
                        { industry: 'Entertainment' },
                        { industry: 'Wholesale Trade' },
                        { industry: 'Transportation' },
                        { industry: 'Finance' },
                        { industry: 'Insurance' },
                        { industry: 'Agriculture' },
                        { industry: 'Food Services' },
                        { industry: 'Hospitality' },
                        { industry: 'Retail' },
                        { industry: 'Manufacturing' },
                        { industry: 'Technology' },
                        { industry: 'IT' },
                        { industry: 'Engineering' },
                        { industry: 'Business' },
                        { industry: 'Advisory' },
                        { industry: 'Photography' },
                        { industry: 'Media' },
                        { industry: 'Recreation' },
                        { industry: 'Publishing' },
                        { industry: 'Consumer Goods' },

                    ])
                })
                .then(() => {
                    return knex('skills').insert([
                        { skills: 'Budget Planning' },
                        { skills: 'Engineering' },
                        { skills: 'Operations' },
                        { skills: 'Project Planning' },
                        { skills: 'Quality Control' },
                        { skills: 'Scheduling' },
                        { skills: 'Task Management' },
                        { skills: 'Coding' },
                        { skills: 'Javascript' },
                        { skills: 'React' },
                        { skills: 'Node JS' },
                        { skills: 'HTML' },
                        { skills: 'CSS' },
                        { skills: 'Customer Support' },
                        { skills: 'Debugging' },
                        { skills: 'Design' },
                        { skills: 'Development' },
                        { skills: 'Implementation' },
                        { skills: 'Languages' },
                        { skills: 'Security' },
                        { skills: 'Photography' },
                        { skills: 'Marketing' },
                        { skills: 'Technology' },
                        { skills: 'Troubleshooting' },
                        { skills: 'Blogging' },
                        { skills: 'Digital Media' },
                        { skills: 'Networking' },
                        { skills: 'Web Analytics' },
                        { skills: 'Social Media' },
                        { skills: 'Client Relations' },
                        { skills: 'AI' },
                        { skills: 'Video Creation' },
                        { skills: 'Presenting' },
                        { skills: 'Spreadsheets' },
                        { skills: 'Writing' },
                        { skills: 'Math' },
                        { skills: 'Science' },
                        { skills: 'Productivity' },



                    ])
                })

                .then(() => {
                    return knex('rating').insert([
                        { rating_employee_id: 1, rating_application_id: 1, rate: 5, comment: 'testing' },
                        { rating_employee_id: 1, rating_application_id: 2, rate: 2, comment: 'testing' },
                        { rating_employee_id: 1, rating_application_id: 3, rate: 1, comment: 'testing' },
                        { rating_employee_id: 1, rating_application_id: 4, rate: 1, comment: 'testing' },
                        { rating_employee_id: 1, rating_application_id: 5, rate: 1, comment: 'testing' },
                        { rating_employer_id: 1, rating_application_id: 1, rate: 3, comment: 'new test' },
                        { rating_employer_id: 1, rating_application_id: 2, rate: 2, comment: 'new test' },
                        { rating_employer_id: 1, rating_application_id: 3, rate: 5, comment: 'new test' },
                        { rating_employer_id: 1, rating_application_id: 4, rate: 4, comment: 'new test' },
                        { rating_employer_id: 1, rating_application_id: 5, rate: 3, comment: 'new test' },
                    ])
                })
        });
};