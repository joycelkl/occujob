import React, {useEffect} from 'react';
// import queryString from 'query-string';
import io from 'socket.io-client';
import axios from 'axios'

let socket;

const Chat = ({location}) => {
    
    // const [employer, setEmployer] = useState('')
    // const [applicant, setApplicant] = useState('')
    const ENDPOINT = 'localhost:8080'


    useEffect(()=>{
        // const {erName, eeName} = queryString.parse(location.search)
        // setEmployer(erName)
        // setApplicant(eeName)
        socket = io(ENDPOINT,  { transports : ['websocket'] })

        axios.get('http://localhost:8080/chat/testingChat').then((data)=>console.log('data', data))

        return ()=>{
            socket.emit('disconnect')
            socket.off();
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ENDPOINT, location.search])

    // console.log('data from link', employer, applicant)
    console.log('socket', socket)

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default Chat
