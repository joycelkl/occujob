import React, {useState} from 'react';
import { Input} from 'reactstrap';
import S3 from 'react-aws-s3';


const PortfolioUpload = (props) => {

    const {id, n, save, resetSave} = props; 

    const [fileData, setFileData] = useState(null);
    const [url, setUrl] = useState(null);

    console.log('url',url)
    

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
  const newFileCVName = `${id}_protfolio_${n}`

  //***************************************************** */

  //upload cv setup ***DONT MODIFY THIS PART***
  function uploadCV(e) {
    console.log("cv data", e.target.files[0])
    if (e.target.files[0].size > 1024*1024*5) {
      alert('Upload File should be 5MB or below')
      return
    }

    setFileData( e.target.files[0])
        
  }
  
  if (save) {
    console.log('saved')
    console.log('fileData', fileData)

    setUrl('Im a link')

    // ReactCV
    //   .uploadFile(fileData, newFileCVName)
    //   .then((data) => {
    //     console.log(data)
    //     setUrl(data.location)
    //   })
    //   .catch(err => console.error(err))

    resetSave()
  }



    return (
        <>                        
        <Input type="file" name="uploadCV" onChange={(e)=>uploadCV(e)} />
        </>
    )
}

export default PortfolioUpload
