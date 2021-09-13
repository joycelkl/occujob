import React, {useState} from 'react';
import {FormGroup, Input, Label} from 'reactstrap';
import S3 from 'react-aws-s3';


const PortfolioUpload = (props) => {

    const {id, n} = props;

    const [cv, setCV] = useState('')

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
  const newFileCVName = `${id}_CV_${n}`

  //***************************************************** */

  //upload cv setup ***DONT MODIFY THIS PART***
  function uploadCV(e) {
    console.log("cv data", e.target.files[0])
    ReactCV
      .uploadFile(e.target.files[0], newFileCVName)
      .then((data) => {
        console.log(data)
        setCV("")
        setCV(data.location)
      })
      .catch(err => console.error(err))
  }
  console.log("success cv:", cv)



    return (
        <>           
                
                   
        <Input type="file" name="uploadCV" onChange={(e)=>uploadCV(e)} />
               
            
        </>
    )
}

export default PortfolioUpload
