import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import authAxios from '../../Redux/authAxios'
import { useHistory } from 'react-router';


const EmployerCreateJobPage = () => {

    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [exp, setExp] = useState('')
    const [salary, setSalary] = useState('')
    const [empType, setEmpType] = useState('')
    const [jobFunction, setJobFunction] = useState('')
    const [location, setLocation] = useState('')
    const [workPeriod, setWorkPeriod] = useState('');

    const history = useHistory();
    

    console.log('data',jobTitle ,jobDescription ,exp ,salary ,empType ,jobFunction ,location ,workPeriod)

    function handleOnSubmit (e) {
        e.preventDefault();
        if (!jobTitle || !jobDescription || !exp || !salary || !empType || !jobFunction || !location || !workPeriod) {
            alert('Please fill in all information')
            console.log('submitting')
            return;
        }
        erJobCreate(jobTitle, jobFunction, exp, salary,
            jobDescription, workPeriod, location, empType).then(()=>{
                history.push('/employerJobRecordsList')
            })
        
    }

    function handleReset () {
        setJobTitle('');
        setJobDescription('');
        setExp('');
        setSalary('');
        setEmpType('');
        setJobFunction('');
       setLocation('');
       setWorkPeriod('');
    }
    
    async function erJobCreate (jobTitle, jobFunction, reqExp, expectSalary,
        jobDescription, workPeriod, location, jobType) {
            const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post('/employer/job/posting', {
            jobTitle: jobTitle,
            jobFunction: jobFunction,
            reqExp: reqExp,
            expectSalary: expectSalary,
            jobDescription: jobDescription,
            workPeriod: workPeriod,
            location: location,
            jobType: jobType
        }).then(res => {
           return alert("updated")
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
        })
    }


    return (

        <div>
            <EmployerNavbar />
            <div className="container mt-2">
                <h2>Job Create Form</h2>
                <div className="col-6">
                    <Form className="form-group" onSubmit={(e)=>handleOnSubmit(e)}>
                    <FormGroup>
                        <Label for="Job Title">Job Title</Label>
                        <Input type="text" name="text" id="jobTitle" placeholder="" value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)}/>
                        <FormGroup>
                            <Label for="Text">Job Description</Label>
                            <Input type="textarea" name="text" id="intro" placeholder="" value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Years of Experience">Years of Experience</Label>
                        <Input type="number" name="number" id="yearsOfExperience" placeholder="" value={exp} onChange={(e)=>setExp(e.target.value)}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Expected Salary">Salary</Label>
                        <Input type="number" name="number" id="Salary" placeholder="Salary" value={salary} onChange={(e)=>setSalary(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="employmentType">Employment Type</Label>
                        <Input type="select" name="employmentType" id="employmentType" value={empType} onChange={(e)=>setEmpType(e.target.value)}>
                            <option>Freelance</option>
                            <option>Part-Time</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="JobFunction">Job Function</Label>
                        <Input type="textarea" name="text" id="JobFunction" placeholder="" value={jobFunction} onChange={(e)=>setJobFunction(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="workPeriod">Work Period</Label>
                        <Input type="text" name="workPeriod" id="workPeriod" placeholder="" value={workPeriod} onChange={(e)=>setWorkPeriod(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="preferworklocation">Work Location</Label>
                        <Input type="select" name="select" id="preferworklocation" value={location} onChange={(e)=>setLocation(e.target.value)}>
                            <option>Islands</option>
                            <option>Kwai Tsing</option>
                            <option>North</option>
                            <option>Sai Kung</option>
                            <option>Sha Tin</option>
                        </Input>
                    </FormGroup>
                    <Button className="m-2" type="submit">Post</Button>
                    <Button className="m-2" onClick={()=>handleReset()}>Reset</Button>
                    </Form>
                </div>

            </div>
            
        </div>

    )
};

export default EmployerCreateJobPage;