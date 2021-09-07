import React from 'react'
import { Card, Badge } from 'react-bootstrap';

const EmployerJobRecordCard = (props) => {

    const {job_title, created_at, expiry_date, status , job_id } = props.job


    function handleOnclick () {
        console.log('clicked', job_id)
    }

    return (
        <div>
                <Card className='my-4' onClick={handleOnclick}>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Card.Title>
                                    {job_title} 
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">
                                    {created_at} (DOP)
                                </Card.Subtitle>
                                <Card.Subtitle className="text-muted mb-2">
                                    {expiry_date} (EXP)
                                </Card.Subtitle>

                                <Badge className="job-list-badge" variant="secondary">{status? 'Active' : 'Inactive'}</Badge>

                            </div>
                            <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test" />
                        </div>
                    </Card.Body>
                </Card>
        </div>
    )
}

export default EmployerJobRecordCard
