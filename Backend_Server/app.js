//set up express services
const express = require('express');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//set up cors
const cors = require('cors');
app.use(cors());

//fileupload setup
const fileupload = require('express-fileupload');
app.use(fileupload());

//knex setup
// require('dotenv').config();
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

//node schedule for check expiry
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule()
rule.hour = 0;
rule.tz = 'Etc/GMT-8';
const job = schedule.scheduleJob(rule, function() {
    jobServices.updateJobStatus();
})
const rate = schedule.scheduleJob(rule, function() {
    ratingServices.updateRatingStatus();
})

const RegLoginRouter = require('./routers/regLoginRouter')
const regLoginRouter = new RegLoginRouter().router();
app.use('/', regLoginRouter)

const RatingServices = require('./services/ratingServices');
const ratingServices = new RatingServices(knex);
const JobServices = require('./services/jobServices');
const jobServices = new JobServices(knex);
const PublicRouter = require('./routers/publicRouter');
const publicRouter = new PublicRouter(jobServices).router();
app.use('/public', publicRouter)

const EmployerService = require('./services/employerServices');
const employerService = new EmployerService(knex);
const EmployerRouter = require('./routers/employerRouter');
const employerRouter = new EmployerRouter(employerService, jobServices).router();

const EmployeeService = require('./services/employeeServices');
const employeeService = new EmployeeService(knex);
const EmployeeRouter = require('./routers/employeeRouter')
const employeeRouter = new EmployeeRouter(employeeService, jobServices).router();



const auth = require('./Auth/auth')(knex);
app.use(auth.initialize());

app.use('/employer', auth.authenticate(), employerRouter)
app.use('/employee', auth.authenticate(), employeeRouter)

app.listen(8080, () => {
    console.log('port is listening to 8080')
})