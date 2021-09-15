//set up express services
const express = require('express');
const app = express();

//set up socketio
const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log('we have a new connection!!')

    socket.on('disconnect', () => {
        console.log('User has left!!!')
    })
})


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

const RatingServices = require('./services/ratingServices');
const ratingServices = new RatingServices(knex);
const RatingRouter = require('./routers/ratingRouter')
const ratingRouter = new RatingRouter(ratingServices).router();

const ChatroomServices = require('./services/chatroomServices');
const chatroomServices = new ChatroomServices(knex);
const ChatroomRouter = require('./routers/chatroomRouter')
const chatroomRouter = new ChatroomRouter(chatroomServices).router();

const auth = require('./Auth/auth')(knex);
app.use(auth.initialize());

app.use('/employer', auth.authenticate(), employerRouter, ratingRouter, chatroomRouter)
app.use('/employee', auth.authenticate(), employeeRouter, ratingRouter, chatroomRouter)

server.listen(8080, () => {
    console.log('port is listening to 8080')
})