import React, { useEffect, useState }  from 'react'
import {Table, Input } from 'reactstrap';
import PortfolioUpload from "../../Components/Applicants/PortfolioUpload";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const PortfolioTable = props => {

    const {eeId} = props 

    const dispatch = useDispatch();

    const { loadAppPortfolioThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { addAppPortfolioThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { updateAppPortfolioThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { deleteAppPortfolioThunkAction } = bindActionCreators(actionCreators, dispatch)

    const portfolioState = useSelector((state) => state.appPortfolio);
    console.log("portfolio", portfolioState)

    const [portName1, setPortName1] = useState(null)
    const [portDes1, setPortDes1] = useState(null)
    const [savePort1, setSavePort1] = useState(false)
    // const [portName2, setPortName2] = useState(null)
    // const [portDes2, setPortDes2] = useState(null)
    // const [portName3, setPortName3] = useState(null)
    // const [portDes3, setPortDes3] = useState(null)

    useEffect(() => {
        loadAppPortfolioThunkAction()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function handleSaveP1() {
        setSavePort1(true)
      }


    return (
        <>
         <Table striped>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            
            <tr>
                <th scope="row">1</th>
                <td><Input type="text" value={portName1} /></td>
                <td><Input type="text" value={portDes1} /></td>
                <td> <PortfolioUpload id={eeId} n={1} save={savePort1} resetSave={()=>setSavePort1(false)}/></td>
                <td><p onClick={()=>handleSaveP1()}>save</p></td>
                <td><button>Delete</button></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td><Input type="text" /></td>
                <td><Input type="text" /></td>
                <td> <PortfolioUpload /></td>
                <td><button>Delete</button></td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td><Input type="text" /></td>
                <td><Input type="text" /></td>
                <td> <PortfolioUpload /></td>
                <td><button>Delete</button></td>
            </tr>
            </tbody>
        </Table>   
        </>
    )
}

export default PortfolioTable
