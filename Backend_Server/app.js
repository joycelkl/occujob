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
require('dotenv').config();
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


app.listen(8080, () => {
    console.log('port is listening to 8080')
})