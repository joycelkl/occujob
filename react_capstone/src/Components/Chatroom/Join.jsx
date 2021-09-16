import React  from 'react'
import { Link } from 'react-router-dom'
import { Button} from 'reactstrap';

const Join = (props) => {

    const {erName, eeName} = props

    //still need to think of how to set the chatroom url

    return (
        <>
          {/* <Link to={`/chat?erName=${erName}&eeName=${eeName}`}> */}
          <Link to={'/chat'}>
            <Button type='button'>Message</Button>
          </Link>
        </>
    )
}

export default Join
