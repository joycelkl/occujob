import React, { useEffect, useState }  from 'react'
import {Table, Input } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import S3 from 'react-aws-s3';

const PortfolioTable = props => {

    const {eeId} = props 

    const userType = localStorage.getItem('type')

    const dispatch = useDispatch();

    const { loadAppPortfolioThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { addAppPortfolioThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { deleteAppPortfolioThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { loadAppPortfolioForEmployerThunkAction } = bindActionCreators(actionCreators, dispatch)

    const portfolioState = useSelector((state) => state.appPortfolio);
  
    useEffect(() => {
      if (userType === 'er') {
        
        loadAppPortfolioForEmployerThunkAction(eeId)
      } else {

        loadAppPortfolioThunkAction()
      }
        setFileName(portfolioState.length+1)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[eeId])

    useEffect(() => {
      setFileName(portfolioState.length+1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[portfolioState])



    const [portName, setPortName] = useState(null);
    const [portDes, setPortDes] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [fileName, setFileName] = useState(null)
    
     //****************DONOT CHANGE THE SETTING HERE*****************************/
  // S3 setup
  const cvConfig = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: 'eeCVFolder', /* further setting required at here */
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  }

  const ReactCV = new S3(cvConfig);

  //the file name should be the user ID and will change later
  const newFileCVName = `${eeId}_protfolio_${fileName}`

  //***************************************************** */
    function uploadCV(e) {
        if (e.target.files[0].size > 1024*1024*5) {
          alert('Upload File should be 5MB or below')
          return
        }
        setFileData(e.target.files[0])
       
      }

      function handleOnSave() {
        if(!portName || !portDes || !fileData){
          alert('please fill in data for upload')
          return;
        }

        ReactCV
        .uploadFile(fileData, newFileCVName)
        .then((data) => {
        addAppPortfolioThunkAction(portName, portDes, data.location) 
        })
        reset()
    }

    function reset() {
      setPortName(null);
      setPortDes(null);
     setFileData(null);
     setFileName(null)
    }

    function handleDelete(id){
        deleteAppPortfolioThunkAction(id)
    }



    return (
        <>
        {userType === 'er' ? 
        null : [(userType === 'ee' && portfolioState.length === 3 ? <p>Maximum Portfolio File is 3</p> : 
        (
            <Table striped>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td><Input type="text" value={portName} onChange={(e)=>setPortName(e.target.value)} /></td>
                <td><Input type="text" value={portDes} onChange={(e)=>setPortDes(e.target.value)} /></td>
                <td>
                <Input type="file" name="uploadCV" onChange={(e)=>uploadCV(e)} />
                </td> 
                <td><p style={{ cursor: "pointer" }} onClick={()=>handleOnSave()}>SAVE</p></td>
            </tr>
            </tbody>
            </Table>
        ))]}
        
        
        <h3>Uploaded Portfolio</h3>
         <Table striped>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {portfolioState.length>0 ? portfolioState.map((portfolio, index) => {
                return (<tr key={portfolio.portfolio_id}>
                <th scope="row">{index + 1}</th>
                <td><Input type="text" value={portfolio.portfolio_name} disabled /></td>
                <td><Input type="text" value={portfolio.portfolio_description} disabled/></td>
                <td><a href={portfolio.portfolio_url}>Download</a></td>
                <td><p style={{ cursor: "pointer" }} onClick={()=>handleDelete(portfolio.portfolio_id)}>Delete</p></td>
                </tr>)
            })  
             : <p>Waiting for upload</p>}
            </tbody>
        </Table>   
        </>
    )
}

export default PortfolioTable
