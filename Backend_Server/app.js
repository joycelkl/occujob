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
// const job = schedule.scheduleJob(rule, function() {
//     jobServices.updateJobStatus();
// })

const RegLoginRouter = require('./routers/regLoginRouter')
const regLoginRouter = new RegLoginRouter().router();
app.use('/', regLoginRouter)

const JobServices = require('./services/jobServices');
const jobServices = new JobServices(knex);

const EmployerService = require('./services/employerServices');
const employerService = new EmployerService(knex);
const EmployerRouter = require('./routers/employerRouter');
const employerRouter = new EmployerRouter(employerService, jobServices).router();
const erAuth = require('./Auth/erAuth')(knex);
app.use(erAuth.initialize());
app.use('/employer', erAuth.authenticate(), employerRouter)

app.listen(8080, () => {
    console.log('port is listening to 8080')
})