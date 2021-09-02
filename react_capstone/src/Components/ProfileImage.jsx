import React from 'react'
import S3 from 'react-aws-s3';
import {useState} from 'react'

export const ProfileImage = () => {

    //****************DONOT CHANGE THE SETTING HERE*****************************/
    // S3 setup
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        dirName: 'erUsersImg', /* further setting required at here */
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }

    const ReactSaveImg = new S3(config);

    //the file name should be the user ID and will change later
    const newFileName = 'userID.jpg'

    //***************************************************** */
        
    const [url, setUrl] = useState(null);
    
    
    //upload image setup ***DONT MODIFY THIS PART***
    function upload (e) {
        console.log("data",e.target.files[0])
        ReactSaveImg
        .uploadFile(e.target.files[0], newFileName)
        .then((data) => {
            console.log(data)
            setUrl(data.location)})
        .catch(err => console.error(err))
    }

    return (
        <div>
        <h1>Profile Image</h1>
        <input type="file" onChange={(e)=>upload(e)} /> {/* input position can change but DON'T CHANGE the content */}
        {url ? <img src={url} alt="userPic" style={{width: 200, height: 200}} /> : <input placeholder="please upload a picture" style={{width: 200, height: 200}}/>}
         </div>
    )
}
