import React  from 'react'
import { Link } from 'react-router-dom'
import { Button} from 'reactstrap';

const Join = (props) => {

    const {erId, eeId} = props

    //still need to think of how to set the chatroom url

    return (
        <>
          <Link to={`/chat?erId=${erId}&eeId=${eeId}`}>
          {/* <Link to={'/chat'}> */}
            <Button type='button'>Message</Button>
          </Link>
        </>
    )
}

export default Join
